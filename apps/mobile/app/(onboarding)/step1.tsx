import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Step1() {
  const { theme } = useTheme();

  const handleNext = () => {
    router.push("/(onboarding)/step2");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingScreen
      title="Let's create your personalized mental wellness journey together"
      stepNumber={1}
      totalSteps={8}
      onNext={handleNext}
      showNext={true}
      highlightWords={["personalized", "mental wellness"]}
    >
      <Image
        source={require("../../assets/welcome/step1.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </OnboardingScreen>
  );
}
