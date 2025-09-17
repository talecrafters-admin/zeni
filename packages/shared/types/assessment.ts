export interface AssessmentData {
  id: string;
  userId: string;
  mood: number;
  sleep: number;
  stress: number;
  goal: string;
  subEmotions?: string[];
  contexts?: string[];
  baselineScore: number;
  completedAt: string;
  createdAt: string;
}

export interface AssessmentStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  order: number;
}

export interface AssessmentResult {
  baselineScore: number;
  recommendations: string[];
  nextSteps: string[];
}
