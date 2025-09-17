import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  AssessmentData,
  AssessmentStep,
  ASSESSMENT_STEPS,
} from "../types/assessment";

interface AssessmentContextType {
  currentStep: number;
  totalSteps: number;
  assessmentData: AssessmentData;
  isCompleted: boolean;
  setCurrentStep: (step: number) => void;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  canProceed: () => boolean;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = ASSESSMENT_STEPS.length;

  const updateAssessmentData = (data: Partial<AssessmentData>) => {
    setAssessmentData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeAssessment = () => {
    setIsCompleted(true);
    // Here you would typically save the assessment data to your backend
    console.log("Assessment completed:", assessmentData);
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    setAssessmentData({});
    setIsCompleted(false);
  };

  const canProceed = () => {
    const currentStepData = ASSESSMENT_STEPS[currentStep - 1];
    if (!currentStepData.required) return true;

    // Add specific validation logic for each step
    switch (currentStep) {
      case 1:
        return !!assessmentData.healthGoal;
      case 2:
        return true; // Optional
      case 3:
        return (
          !!assessmentData.age &&
          assessmentData.age >= 13 &&
          assessmentData.age <= 120
        );
      case 4:
        return !!assessmentData.mood;
      case 5:
        return assessmentData.professionalHelp !== undefined;
      case 6:
        return !!assessmentData.sleepQuality;
      case 7:
        return assessmentData.mentalHealthSymptoms !== undefined;
      case 8:
        return (
          !!assessmentData.stressLevel &&
          assessmentData.stressLevel >= 1 &&
          assessmentData.stressLevel <= 5
        );
      default:
        return false;
    }
  };

  const value = {
    currentStep,
    totalSteps,
    assessmentData,
    isCompleted,
    setCurrentStep,
    updateAssessmentData,
    nextStep,
    previousStep,
    completeAssessment,
    resetAssessment,
    canProceed,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
};
