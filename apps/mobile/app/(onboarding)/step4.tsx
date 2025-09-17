import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Step4() {
  const { theme } = useTheme();

  const handleNext = () => {
    router.push("/(onboarding)/step5");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingScreen
      title="Discover mindful resources and activities that bring you joy and peace"
      stepNumber={4}
      totalSteps={8}
      backgroundColor={theme.colors.accent}
      onNext={handleNext}
      onBack={handleBack}
      showBack={true}
      showNext={true}
    >
      <Image
        source={require("../../assets/welcome/step4.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </OnboardingScreen>
  );
}
