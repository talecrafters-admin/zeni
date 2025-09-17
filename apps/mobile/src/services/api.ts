// Simple API service for local development
// This replaces Firebase Functions with mock implementations

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Mock consent saving
  async saveConsent(data: {
    tos: boolean;
    privacy: boolean;
    analyticsOk?: boolean;
    marketingOk?: boolean;
  }): Promise<ApiResponse> {
    console.log("Mock saveConsent called with:", data);
    await delay(1000);
    return { ok: true };
  },

  // Mock assessment submission
  async submitAssessment(data: {
    mood: number;
    sleep: number;
    stress: number;
    goal: string;
  }): Promise<ApiResponse<{ baselineScore: number; id: string }>> {
    console.log("Mock submitAssessment called with:", data);
    await delay(1000);

    // Calculate baseline score
    const baselineScore = Math.round(
      (data.mood + data.sleep + (10 - data.stress)) / 3
    );

    return {
      ok: true,
      data: {
        baselineScore,
        id: `mock-assessment-${Date.now()}`,
      },
    };
  },

  // Mock profile completion
  async completeProfile(data: {
    displayName?: string;
    city?: string;
    dob?: string;
    avatarUrl?: string;
  }): Promise<ApiResponse> {
    console.log("Mock completeProfile called with:", data);
    await delay(1000);
    return { ok: true };
  },

  // Mock user profile fetch
  async getProfile(uid: string): Promise<ApiResponse<any>> {
    console.log("Mock getProfile called for uid:", uid);
    await delay(500);
    return {
      ok: true,
      data: {
        displayName: "Mock User",
        onboarding: { step: "done", completed: true },
      },
    };
  },
};
