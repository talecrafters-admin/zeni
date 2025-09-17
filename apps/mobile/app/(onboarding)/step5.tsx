import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Step5() {
  const { theme } = useTheme();

  const handleNext = () => {
    router.push("/(public)/auth");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <OnboardingScreen
      title="Join a caring community where you can share your journey and support others"
      stepNumber={5}
      totalSteps={8}
      backgroundColor={theme.colors.secondary}
      onNext={handleNext}
      onBack={handleBack}
      showBack={true}
      showNext={true}
      nextText="Continue"
    >
      <Image
        source={require("../../assets/welcome/step5.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </OnboardingScreen>
  );
}
