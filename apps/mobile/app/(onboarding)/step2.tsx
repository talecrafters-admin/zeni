import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Step2() {
  const { theme } = useTheme();

  const handleNext = () => {
    router.push("/(onboarding)/step3");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingScreen
      title="Track your emotions and get AI-powered insights about your mood patterns"
      stepNumber={2}
      totalSteps={8}
      onNext={handleNext}
      showNext={true}
      highlightWords={["emotions", "AI-powered", "mood patterns"]}
    >
      <Image
        source={require("../../assets/welcome/step2.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </OnboardingScreen>
  );
}
