import React from "react";
import { Image } from "react-native";
import { OnboardingScreen } from "../../src/components/onboarding/OnboardingScreen";
import { router } from "expo-router";
import { useTheme } from "../../src/contexts/ThemeContext";

export default function Welcome() {
  const { theme } = useTheme();

  const handleGetStarted = () => {
    router.push("/(onboarding)/step1");
  };

  const handleSignIn = () => {
    router.push("/(public)/auth");
  };

  return (
    <OnboardingScreen
      title="Welcome to Zeni - Your mindful mental health companion"
      stepNumber={0}
      totalSteps={5}
      onNext={handleSignIn}
      onGetStarted={handleGetStarted}
      showGetStartedButton={true}
      highlightWords={["mindful", "mental health"]}
    >
      <Image
        source={require("../../assets/welcome/step0.png")}
        style={{ width: 280, height: 280, resizeMode: "contain" }}
      />
    </OnboardingScreen>
  );
}
