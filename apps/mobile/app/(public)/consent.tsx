import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useTheme } from "../../src/contexts/ThemeContext";
import { router } from "expo-router";

export default function Consent() {
  const { theme } = useTheme();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleContinue = () => {
    if (privacyConsent && dataConsent) {
      router.push("/(onboarding)/assessment");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.typography.h1.fontSize,
      fontWeight: theme.typography.h1.fontWeight,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: theme.spacing.lg,
    },
    subtitle: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    consentItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    consentText: {
      flex: 1,
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
      marginRight: theme.spacing.md,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
      alignItems: "center",
      marginTop: theme.spacing.xl,
    },
    disabledButton: {
      backgroundColor: theme.colors.border,
    },
    buttonText: {
      color: theme.colors.surface,
      fontSize: theme.typography.body.fontSize,
      fontWeight: "600",
    },
  });

  const isContinueEnabled = privacyConsent && dataConsent;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy & Consent</Text>
      <Text style={styles.subtitle}>
        Please review and agree to our terms to continue
      </Text>

      <View>
        <View style={styles.consentItem}>
          <Text style={styles.consentText}>
            I agree to the Privacy Policy and Terms of Service
          </Text>
          <Switch
            value={privacyConsent}
            onValueChange={setPrivacyConsent}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.surface}
          />
        </View>

        <View style={styles.consentItem}>
          <Text style={styles.consentText}>
            I consent to data collection for personalized mental health insights
          </Text>
          <Switch
            value={dataConsent}
            onValueChange={setDataConsent}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.surface}
          />
        </View>

        <View style={styles.consentItem}>
          <Text style={styles.consentText}>
            I would like to receive wellness tips and updates (optional)
          </Text>
          <Switch
            value={marketingConsent}
            onValueChange={setMarketingConsent}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.surface}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !isContinueEnabled && styles.disabledButton]}
        onPress={handleContinue}
        disabled={!isContinueEnabled}
      >
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

