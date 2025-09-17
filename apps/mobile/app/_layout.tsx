// apps/mobile/app/_layout.tsx
import { Slot } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ThemeProvider } from "../src/contexts/ThemeContext";
import { AuthProvider } from "../src/contexts/AuthContext";
import { AssessmentProvider } from "../src/contexts/AssessmentContext";

export default function RootLayout() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <AuthProvider>
        <ThemeProvider>
          <AssessmentProvider>
            <Slot />
          </AssessmentProvider>
        </ThemeProvider>
      </AuthProvider>
    </KeyboardAvoidingView>
  );
}
