export interface AssessmentData {
  // Screen 1 - Health Goal
  healthGoal?:
    | "reduce-stress"
    | "ai-therapy"
    | "cope-trauma"
    | "better-person"
    | "trying-app";

  // Screen 2 - Gender
  gender?: "male" | "female" | "prefer-skip";

  // Screen 3 - Age
  age?: number;

  // Screen 4 - Weight
  weight?: number;
  weightUnit?: "kg" | "lbs";

  // Screen 5 - Mood
  mood?: "very-sad" | "sad" | "neutral" | "happy" | "very-happy";
  subEmotions?: string[];
  contexts?: string[];

  // Screen 6 - Professional Help
  professionalHelp?: boolean;

  // Screen 7 - Physical Distress
  physicalDistress?: boolean;
  physicalDistressDetails?: string;

  // Screen 8 - Sleep Quality
  sleepQuality?: "excellent" | "good" | "fair" | "poor" | "worst";
  sleepHours?: number;

  // Screen 9 - Medications
  medicationType?: "prescribed" | "otc" | "none" | "prefer-not-say";

  // Screen 10 - Medication Details
  medications?: string[];

  // Screen 11 - Mental Health Symptoms
  mentalHealthSymptoms?: string[];
  customSymptoms?: string;

  // Screen 12 - Stress Level
  stressLevel?: number; // 1-5 scale

  // Removed Voice and Expression steps from flow, but keep optional fields if needed
  voiceRecording?: string;
  voiceText?: string;
  freeText?: string;
  concerningPhrases?: string[];
}

export interface AssessmentStep {
  id: number;
  title: string;
  component: string;
  required: boolean;
  validation?: (data: AssessmentData) => boolean;
}

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: 1,
    title: "What's your health goal for today?",
    component: "HealthGoal",
    required: true,
  },
  {
    id: 2,
    title: "What's your official gender?",
    component: "Gender",
    required: false,
  },
  { id: 3, title: "What's your age?", component: "Age", required: true },
  {
    id: 4,
    title: "How would you describe your mood?",
    component: "Mood",
    required: true,
  },
  {
    id: 5,
    title: "Have you sought professional help before?",
    component: "ProfessionalHelp",
    required: true,
  },
  {
    id: 6,
    title: "How would you rate your sleep quality?",
    component: "SleepQuality",
    required: true,
  },
  {
    id: 7,
    title: "Do you have other mental health symptoms?",
    component: "MentalHealthSymptoms",
    required: true,
  },
  {
    id: 8,
    title: "How would you rate your stress level?",
    component: "StressLevel",
    required: true,
  },
];
