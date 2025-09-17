import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../src/contexts/ThemeContext";
import { useAuth } from "../../src/contexts/AuthContext";
import { createUserWithEmail } from "../../src/services/auth";
import { AuthInput } from "../../src/components/auth/AuthInput";
import { AuthButton } from "../../src/components/auth/AuthButton";
import { ErrorDialog } from "../../src/components/common/ErrorDialog";
import { getAuthErrorMessage, AuthError } from "../../src/utils/authErrors";
import { router } from "expo-router";

export default function SignUp() {
  const { theme } = useTheme();
  const { refreshUserProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorDialog, setErrorDialog] = useState<{
    visible: boolean;
    error: AuthError | null;
  }>({
    visible: false,
    error: null,
  });

  const validateEmail = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: { [key: string]: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateConfirmPassword = () => {
    const newErrors: { [key: string]: string } = {};

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showError = (error: any) => {
    const authError = getAuthErrorMessage(error);
    setErrorDialog({
      visible: true,
      error: authError,
    });
  };

  const hideError = () => {
    setErrorDialog({
      visible: false,
      error: null,
    });
  };

  const handleErrorAction = () => {
    const { error } = errorDialog;
    if (!error) return;

    hideError();

    switch (error.action) {
      case "Sign In":
        router.push("/(public)/auth");
        break;
      case "Contact Support":
        // TODO: Implement contact support
        break;
      default:
        // For "Try Again", "Retry", "Try Again Later" - just close dialog
        break;
    }
  };

  const handleSignUp = async () => {
    if (!validateEmail() || !validatePassword() || !validateConfirmPassword())
      return;

    try {
      setIsLoading(true);
      await createUserWithEmail(email, password);
      await refreshUserProfile();
      router.replace("/(onboarding)/assessment");
    } catch (error: any) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: "#E8EEDF", // Light green header
      paddingTop: 60,
      paddingBottom: 40,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    logo: {
      fontSize: 24,
      marginBottom: 20,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 40,
    },
    formContainer: {
      marginBottom: 30,
    },
    linksContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    linkText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    linkButton: {
      marginTop: 4,
    },
    linkButtonText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: "500",
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      padding: 8,
      zIndex: 10,
    },
    backButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
    },
    otpDescription: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: 30,
      lineHeight: 24,
    },
    resendButton: {
      marginTop: 20,
      alignSelf: "center",
    },
    resendButtonText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Z</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Sign Up For Free</Text>

        <View style={styles.formContainer}>
          <AuthInput
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon="✉"
            error={errors.email}
          />

          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="🔒"
            error={errors.password}
          />

          <AuthInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="🔒"
            error={errors.confirmPassword}
          />

          <AuthButton
            title="Create Account"
            onPress={handleSignUp}
            loading={isLoading}
            rightIcon="→"
          />
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.push("/(public)/auth")}
          >
            <Text style={styles.linkText}>
              Already have an account? Sign In.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ErrorDialog
        visible={errorDialog.visible}
        title={errorDialog.error?.title || ""}
        message={errorDialog.error?.message || ""}
        onClose={hideError}
        primaryAction={{
          text: errorDialog.error?.action || "OK",
          onPress: handleErrorAction,
        }}
        secondaryAction={
          errorDialog.error?.action === "Sign In"
            ? {
                text: "Cancel",
                onPress: hideError,
              }
            : undefined
        }
      />
    </SafeAreaView>
  );
}
