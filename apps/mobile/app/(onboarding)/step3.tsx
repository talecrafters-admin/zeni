import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Step3() {
  const { theme } = useTheme();

  const handleNext = () => {
    router.push("/(onboarding)/step4");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingScreen
      title="Express yourself through journaling and chat with your AI therapy companion"
      stepNumber={3}
      totalSteps={8}
      onNext={handleNext}
      showNext={true}
      highlightWords={["journaling", "AI therapy companion"]}
    >
      <Image
        source={require("../../assets/welcome/step3.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </OnboardingScreen>
  );
}
