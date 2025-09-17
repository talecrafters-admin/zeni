import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const STRESS_LEVELS = [
  { value: 1, label: "Very Low", description: "You are very relaxed" },
  { value: 2, label: "Low", description: "You are somewhat relaxed" },
  { value: 3, label: "Moderate", description: "You are moderately stressed" },
  { value: 4, label: "High", description: "You are very stressed" },
  { value: 5, label: "Extreme", description: "You are extremely stressed out" },
];

export const StressLevelStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [stressLevel, setStressLevel] = useState(
    assessmentData.stressLevel || 3
  );

  useEffect(() => {
    updateAssessmentData({ stressLevel });
  }, [stressLevel]);

  const handleSelect = (level: number) => {
    setStressLevel(level);
  };

  const currentLevel =
    STRESS_LEVELS.find((level) => level.value === stressLevel) ||
    STRESS_LEVELS[2];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    bigNumber: {
      fontSize: 160,
      fontWeight: "800",
      color: theme.colors.text,
      marginBottom: 28,
    },
    trackWrapper: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: 28,
      paddingVertical: 16,
      paddingHorizontal: 12,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
      marginBottom: 22,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    track: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    pill: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    pillText: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
    },
    selectedRing: {
      width: 76,
      height: 76,
      borderRadius: 38,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      borderWidth: 4,
      borderColor: "#F1E7DF",
    },
    selectedPill: {
      backgroundColor: "#FF8C2A",
      borderColor: "#FF8C2A",
    },
    selectedText: {
      color: theme.colors.surface,
    },
    caption: {
      marginTop: 10,
      fontSize: 18,
      color: theme.colors.textSecondary,
      fontWeight: "600",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.bigNumber}>{stressLevel}</Text>

      <View style={styles.trackWrapper}>
        <View style={styles.track}>
          {STRESS_LEVELS.map((level) => {
            const selected = level.value === stressLevel;
            const pill = (
              <TouchableOpacity
                key={level.value}
                onPress={() => handleSelect(level.value)}
                activeOpacity={0.9}
                style={[styles.pill, selected && styles.selectedPill]}
              >
                <Text
                  style={[styles.pillText, selected && styles.selectedText]}
                >
                  {level.value}
                </Text>
              </TouchableOpacity>
            );

            if (!selected) return pill;
            return (
              <View key={level.value} style={styles.selectedRing}>
                {pill}
              </View>
            );
          })}
        </View>
      </View>

      <Text style={styles.caption}>
        {currentLevel.description.charAt(0).toUpperCase() +
          currentLevel.description.slice(1)}
        .
      </Text>
    </View>
  );
};
