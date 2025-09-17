import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../../src/contexts/ThemeContext";
import { AuthButton } from "../../src/components/auth/AuthButton";
import { AuthInput } from "../../src/components/auth/AuthInput";
import { sendPasswordReset } from "../../src/services/auth";
import { router } from "expo-router";

interface ForgotPasswordOption {
  id: string;
  title: string;
  icon: string;
  description?: string;
}

export default function ForgotPassword() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [options] = useState<ForgotPasswordOption[]>([]);

  const handleSendPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      await sendPasswordReset(email);
      Alert.alert("Success", "Password reset instructions sent!");
      router.push({ pathname: "/(public)/forgot-password-verification", params: { email } as any });
    } catch (error) {
      Alert.alert("Error", (error as any)?.message ?? "Failed to send password reset. Please try again.");
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
      backgroundColor: theme.colors.surface,
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      padding: 8,
    },
    backButtonText: {
      fontSize: 20,
      color: theme.colors.text,
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
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      marginBottom: 40,
      lineHeight: 24,
    },
    formContainer: { marginBottom: 40 },
    optionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
    },
    selectedOptionCard: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    optionIcon: {
      fontSize: 24,
      marginRight: 16,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    optionDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your account email to reset your password.</Text>

        <View style={styles.formContainer}>
          <AuthInput
            label="Email Address"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIcon="✉"
          />
        </View>

        <AuthButton
          title="Send Password"
          onPress={handleSendPassword}
          loading={isLoading}
          rightIcon="→"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
