import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const HEALTH_GOALS = [
  { id: "reduce-stress", label: "I want to reduce stress." },
  { id: "ai-therapy", label: "I want to try AI therapy." },
  { id: "cope-trauma", label: "I want to cope with trauma." },
  { id: "better-person", label: "I want to be a better person." },
  { id: "trying-app", label: "Just trying this app, relax me." },
];

export const HealthGoalStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();

  const handleSelect = (goalId: string) => {
    updateAssessmentData({ healthGoal: goalId as any });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    optionsContainer: {
      gap: 16,
    },
    option: {
      backgroundColor: "transparent",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
    },
    selectedOption: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight + "20",
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      marginRight: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedRadioButton: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    radioButtonInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
    },
    optionText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: "500",
      flex: 1,
    },
    selectedOptionText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {HEALTH_GOALS.map((goal) => {
          const isSelected = assessmentData.healthGoal === goal.id;
          return (
            <TouchableOpacity
              key={goal.id}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => handleSelect(goal.id)}
            >
              <View
                style={[
                  styles.radioButton,
                  isSelected && styles.selectedRadioButton,
                ]}
              >
                {isSelected && <View style={styles.radioButtonInner} />}
              </View>
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {goal.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
