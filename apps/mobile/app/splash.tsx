import React, { useState } from "react";
import { SplashScreen } from "../src/components/SplashScreen";
import { router } from "expo-router";

export default function Splash() {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
    // Navigate to welcome screen after splash completes
    router.replace("/(public)/welcome");
  };

  if (isComplete) {
    return null;
  }

  return <SplashScreen onComplete={handleComplete} mode="splash" />;
}
