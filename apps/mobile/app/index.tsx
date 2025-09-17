import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "../src/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../src/contexts/ThemeContext";

export default function Index() {
  const { user, loading, isOnboardingComplete } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (loading) return;

    if (user) {
      if (isOnboardingComplete) {
        router.replace("/(app)");
      } else {
        router.replace("/(onboarding)/assessment");
      }
    } else {
      router.replace("/splash");
    }
  }, [user, loading, isOnboardingComplete]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return null;
}
