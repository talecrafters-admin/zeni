import React from "react";
import { AssessmentScreen } from "../../src/components/assessment/AssessmentScreen";
import { useAssessment } from "../../src/contexts/AssessmentContext";
import { ASSESSMENT_STEPS } from "../../src/types/assessment";
import { router } from "expo-router";
import { submitAssessmentSvc } from "../../src/services/onboarding";

// Import all step components
import { HealthGoalStep } from "../../src/components/assessment/steps/HealthGoalStep";
import { GenderStep } from "../../src/components/assessment/steps/GenderStep";
import { AgeStep } from "../../src/components/assessment/steps/AgeStep";
import { MoodStep } from "../../src/components/assessment/steps/MoodStep";
import { ProfessionalHelpStep } from "../../src/components/assessment/steps/ProfessionalHelpStep";
import { SleepQualityStep } from "../../src/components/assessment/steps/SleepQualityStep";
import { MentalHealthSymptomsStep } from "../../src/components/assessment/steps/MentalHealthSymptomsStep";
import { StressLevelStep } from "../../src/components/assessment/steps/StressLevelStep";

const STEP_COMPONENTS = [
  HealthGoalStep,
  GenderStep,
  AgeStep,
  MoodStep,
  ProfessionalHelpStep,
  SleepQualityStep,
  MentalHealthSymptomsStep,
  StressLevelStep,
];

export default function Assessment() {
  const { currentStep, totalSteps, nextStep, assessmentData } = useAssessment();

  const deriveMoodScore = () => {
    switch (assessmentData.mood) {
      case "very-happy":
        return 5;
      case "happy":
        return 4;
      case "neutral":
        return 3;
      case "sad":
        return 2;
      case "very-sad":
        return 1;
      default:
        return 3;
    }
  };

  const deriveSleepScore = () => {
    // sleepQuality is stored as 0..4 where 0=Excellent, 4=Worst
    const q =
      typeof assessmentData.sleepQuality === "number"
        ? assessmentData.sleepQuality
        : 2;
    return 5 - q; // map to 5..1
  };

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      const mood = deriveMoodScore();
      const sleep = deriveSleepScore();
      const stress = assessmentData.stressLevel ?? 3;
      const goal = assessmentData.healthGoal || "reduce-stress";
      try {
        await submitAssessmentSvc({ mood, sleep, stress, goal });
      } catch (e) {
        // non-blocking for now
        console.warn("submitAssessment failed", e);
      }
      router.replace("/(onboarding)/profile");
    } else {
      nextStep();
    }
  };

  const CurrentStepComponent = STEP_COMPONENTS[currentStep - 1];
  const currentStepData = ASSESSMENT_STEPS[currentStep - 1];

  return (
    <AssessmentScreen
      title={currentStepData.title}
      showBack={currentStep > 1}
      showNext={true}
      onNext={handleNext}
      nextText={
        currentStep === totalSteps ? "Complete Assessment →" : "Continue →"
      }
    >
      <CurrentStepComponent />
    </AssessmentScreen>
  );
}
