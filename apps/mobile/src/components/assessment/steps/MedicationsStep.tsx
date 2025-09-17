import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const MEDICATION_OPTIONS = [
  { id: "prescribed", label: "Prescribed Medications", icon: "💊" },
  { id: "otc", label: "Over the Counter Supplements", icon: "🧴" },
  { id: "none", label: "I'm not taking any", icon: "❌" },
  { id: "prefer-not-say", label: "Prefer not to say", icon: "🤐" },
];

export const MedicationsStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [medicationType, setMedicationType] = useState(
    assessmentData.medicationType || undefined
  );

  useEffect(() => {
    if (medicationType !== undefined) {
      updateAssessmentData({ medicationType: medicationType as any });
    }
  }, [medicationType]);

  const handleSelect = (type: string) => {
    setMedicationType(type as any);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    option: {
      width: "48%",
      backgroundColor: "transparent",
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: "center",
      minHeight: 120,
      justifyContent: "center",
    },
    selectedOption: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight + "20",
    },
    optionIcon: {
      fontSize: 32,
      marginBottom: 12,
    },
    optionText: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "600",
      textAlign: "center",
      lineHeight: 20,
    },
    selectedOptionText: {
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {MEDICATION_OPTIONS.map((option) => {
          const isSelected = medicationType === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.option, isSelected && styles.selectedOption]}
              onPress={() => handleSelect(option.id)}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
