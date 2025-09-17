import { supabase } from "./supabase";

async function getCurrentUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error("User not authenticated");
  return data.user.id;
}

export async function saveConsentSvc(data: {
  tos: boolean;
  privacy: boolean;
  analyticsOk?: boolean;
  marketingOk?: boolean;
}) {
  const userId = await getCurrentUserId();
  const payload = {
    user_id: userId,
    tos: data.tos,
    privacy: data.privacy,
    analytics_ok: data.analyticsOk ?? null,
    marketing_ok: data.marketingOk ?? null,
  };
  const { error } = await supabase.from("user_consents").upsert(payload, {
    onConflict: "user_id",
  });
  if (error) throw error;
}

export async function submitAssessmentSvc(data: {
  mood: number;
  sleep: number;
  stress: number;
  goal: string;
}) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("assessments").insert({
    user_id: userId,
    mood_score: data.mood,
    sleep_score: data.sleep,
    stress_score: data.stress,
    goal: data.goal,
  });
  if (error) throw error;
}

export async function completeProfileSvc(data: {
  displayName?: string;
  city?: string;
  dob?: string;
  avatarUrl?: string;
}) {
  const userId = await getCurrentUserId();
  const { error } = await supabase.from("profiles").upsert(
    {
      id: userId,
      display_name: data.displayName ?? null,
      city: data.city ?? null,
      dob: data.dob ?? null,
      avatar_url: data.avatarUrl ?? null,
      onboarding: { step: "done", completed: true },
    },
    { onConflict: "id" }
  );
  if (error) throw error;
}

export async function getProfile(uid: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, city, dob, avatar_url, onboarding")
    .eq("id", uid)
    .maybeSingle();
  if (error) throw error;
  return (
    data ?? {
      onboarding: { step: "start", completed: false },
    }
  );
}
