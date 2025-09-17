import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { useTheme } from "../../../src/contexts/ThemeContext";
import { useAuth } from "../../../src/contexts/AuthContext";
import {
  signInWithGoogle,
  signInWithApple,
  signInWithEmail,
  createUserWithEmail,
} from "../../../src/services/auth";
import { AuthInput } from "../../../src/components/auth/AuthInput";
import { AuthButton } from "../../../src/components/auth/AuthButton";
import { SocialLoginButton } from "../../../src/components/auth/SocialLoginButton";
import { ErrorDialog } from "../../../src/components/common/ErrorDialog";
import { getAuthErrorMessage, AuthError } from "../../../src/utils/authErrors";
import { router } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function Auth() {
  const { theme } = useTheme();
  const { refreshUserProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{
    visible: boolean;
    error: AuthError | null;
  }>({ visible: false, error: null });

  const validateEmail = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email))
      newErrors.email = "Please enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors: { [key: string]: string } = {};
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showError = (error: any) => {
    const authError = getAuthErrorMessage(error);
    setErrorDialog({ visible: true, error: authError });
  };
  const hideError = () => setErrorDialog({ visible: false, error: null });
  const handleErrorAction = () => {
    const { error } = errorDialog;
    if (!error) return;
    hideError();
    if (error.action === "Sign Up") setIsSignUp(true);
    else if (error.action === "Sign In") setIsSignUp(false);
  };

  const handleEmailAuth = async () => {
    if (!validateEmail() || !validatePassword()) return;
    try {
      setIsLoading(true);
      if (isSignUp) await createUserWithEmail(email, password);
      else await signInWithEmail(email, password);
      await refreshUserProfile();
      router.replace("/(onboarding)/assessment");
    } catch (error: any) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      await refreshUserProfile();
      router.replace("/(onboarding)/assessment");
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    try {
      setIsLoading(true);
      await signInWithApple();
      await refreshUserProfile();
      router.replace("/(onboarding)/assessment");
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    header: {
      backgroundColor: "#E8EEDF",
      paddingTop: 60,
      paddingBottom: 40,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    logo: { width: 40, height: 40, borderRadius: 8 },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 40 },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 40,
    },
    formContainer: { marginBottom: 30 },
    socialContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
      gap: 20,
    },
    linksContainer: { alignItems: "center", marginTop: 20 },
    linkText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    linkButton: { marginTop: 4 },
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
    backButtonText: { color: theme.colors.primary, fontSize: 16 },
    otpDescription: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: 30,
      lineHeight: 24,
    },
    resendButton: { marginTop: 20, alignSelf: "center" },
    resendButtonText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/brand/zeni.png")}
          style={styles.logo}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {isSignUp ? "Sign Up For Free" : "Sign In To Zeni"}
        </Text>

        <View style={styles.formContainer}>
          <AuthInput
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon={""}
            error={errors.email}
          />
          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={""}
            error={errors.password}
          />
          <AuthButton
            title={isSignUp ? "Create Account" : "Sign In"}
            onPress={handleEmailAuth}
            loading={isLoading}
            rightIcon="→"
          />
        </View>

        <View style={styles.socialContainer}>
          {Platform.OS === "ios" ? (
            <>
              <SocialLoginButton
                icon={
                  <Ionicons
                    name="logo-apple"
                    size={22}
                    color={theme.colors.text}
                  />
                }
                onPress={handleAppleAuth}
                disabled={isLoading}
              />
              <SocialLoginButton
                icon={
                  <AntDesign
                    name="google"
                    size={22}
                    color={theme.colors.text}
                  />
                }
                onPress={handleGoogleAuth}
                disabled={isLoading}
              />
            </>
          ) : (
            <SocialLoginButton
              icon={
                <AntDesign name="google" size={22} color={theme.colors.text} />
              }
              onPress={handleGoogleAuth}
              disabled={isLoading}
            />
          )}
        </View>

        <View className="linksContainer" style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.linkText}>
              {isSignUp
                ? "Already have an account? Sign In."
                : "Don't have an account? Sign Up."}
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
          errorDialog.error?.action === "Sign Up" ||
          errorDialog.error?.action === "Sign In"
            ? { text: "Cancel", onPress: hideError }
            : undefined
        }
      />
    </SafeAreaView>
  );
}
