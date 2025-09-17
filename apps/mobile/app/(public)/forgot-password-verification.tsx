import React, { useMemo, useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";

export default function ForgotPasswordVerification() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocalSearchParams<{ email?: string }>();
  const maskedEmail = useMemo(() => {
    const email = params.email ?? "";
    if (!email) return "your email";
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    const visible = user.slice(0, 2);
    return `${visible}${"*".repeat(Math.max(1, user.length - 2))}@${domain}`;
  }, [params.email]);

  const handleResendPassword = async () => {
    try {
      setIsLoading(true);
      Alert.alert("Success", "Password reset instructions sent again!");
    } catch (error) {
      Alert.alert("Error", "Failed to resend. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPassword = async () => {
    try {
      setIsLoading(true);
      Alert.alert("Success", "Password reset instructions sent!");
    } catch (error) {
      Alert.alert("Error", "Failed to send. Please try again.");
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
      backgroundColor: "#4A4A4A", // Dark grey header
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
      color: theme.colors.surface,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
      alignItems: "center",
    },
    illustration: {
      width: 200,
      height: 200,
      marginBottom: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    safeIcon: {
      fontSize: 120,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 20,
    },
    instruction: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 24,
    },
    buttonContainer: {
      width: "100%",
      marginBottom: 20,
    },
    secondaryButton: {
      backgroundColor: theme.colors.textSecondary,
      marginBottom: 20,
    },
    closeButton: {
      position: "absolute",
      bottom: 40,
      alignSelf: "center",
    },
    closeButtonText: {
      fontSize: 24,
      color: theme.colors.textSecondary,
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
        <View style={styles.illustration}>
          <Text style={styles.safeIcon}>🔒</Text>
        </View>

        <Text style={styles.title}>We have sent reset instructions to {maskedEmail}</Text>
        <Text style={styles.instruction}>
          Didn't receive the link? Then re-send the password below!
        </Text>

        <View style={styles.buttonContainer}>
          <AuthButton
            title="Re-Send Password"
            onPress={handleResendPassword}
            loading={isLoading}
            rightIcon="→"
          />
        </View>

        <View style={styles.buttonContainer}>
          <AuthButton
            title="Send Password"
            onPress={handleSendPassword}
            loading={isLoading}
            rightIcon="→"
            variant="secondary"
          />
        </View>

        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
