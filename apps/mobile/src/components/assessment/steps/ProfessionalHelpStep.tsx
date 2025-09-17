import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

export const ProfessionalHelpStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [hasSoughtHelp, setHasSoughtHelp] = useState<boolean | undefined>(
    assessmentData.professionalHelp
  );

  useEffect(() => {
    if (hasSoughtHelp !== undefined) {
      updateAssessmentData({ professionalHelp: hasSoughtHelp });
    }
  }, [hasSoughtHelp]);

  const handleSelect = (value: boolean) => {
    setHasSoughtHelp(value);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    illustration: {
      width: 200,
      height: 200,
      backgroundColor: theme.colors.surface,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    illustrationText: {
      fontSize: 80,
      color: theme.colors.textSecondary,
    },
    optionsContainer: {
      width: "100%",
      gap: 20,
    },
    option: {
      backgroundColor: "transparent",
      paddingVertical: 20,
      paddingHorizontal: 24,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: "center",
    },
    selectedOption: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight + "20",
    },
    optionText: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
    },
    selectedOptionText: {
      color: theme.colors.primary,
    },
    yesButton: {
      borderColor: theme.colors.border,
      backgroundColor: "transparent",
    },
    noButton: {
      borderColor: theme.colors.border,
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.illustration}>
        <Text style={styles.illustrationText}>🤔</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            styles.yesButton,
            hasSoughtHelp === true && styles.selectedOption,
          ]}
          onPress={() => handleSelect(true)}
        >
          <Text
            style={[
              styles.optionText,
              hasSoughtHelp === true && styles.selectedOptionText,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            styles.noButton,
            hasSoughtHelp === false && styles.selectedOption,
          ]}
          onPress={() => handleSelect(false)}
        >
          <Text
            style={[
              styles.optionText,
              hasSoughtHelp === false && styles.selectedOptionText,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
