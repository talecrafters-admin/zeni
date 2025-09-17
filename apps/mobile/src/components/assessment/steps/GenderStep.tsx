import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const GENDER_OPTIONS = [
  { id: "male", label: "I am Male", icon: "👨" },
  { id: "female", label: "I am Female", icon: "👩" },
  { id: "prefer-skip", label: "Prefer to skip, thanks.", icon: "⏭️" },
];

export const GenderStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();

  const handleSelect = (genderId: string) => {
    updateAssessmentData({ gender: genderId as any });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    optionsContainer: {
      gap: 20,
    },
    genderCard: {
      backgroundColor: "transparent",
      paddingVertical: 24,
      paddingHorizontal: 20,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: "center",
      minHeight: 120,
      justifyContent: "center",
    },
    selectedGenderCard: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight + "20",
    },
    genderIcon: {
      fontSize: 48,
      marginBottom: 12,
    },
    genderText: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
      textAlign: "center",
    },
    selectedGenderText: {
      color: theme.colors.primary,
    },
    skipButton: {
      backgroundColor: theme.colors.primaryLight + "20",
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      alignItems: "center",
      marginTop: 8,
    },
    selectedSkipButton: {
      backgroundColor: theme.colors.primary,
    },
    skipText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: "500",
    },
    selectedSkipText: {
      color: theme.colors.surface,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        {GENDER_OPTIONS.slice(0, 2).map((option) => {
          const isSelected = assessmentData.gender === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.genderCard,
                isSelected && styles.selectedGenderCard,
              ]}
              onPress={() => handleSelect(option.id)}
            >
              <Text style={styles.genderIcon}>{option.icon}</Text>
              <Text
                style={[
                  styles.genderText,
                  isSelected && styles.selectedGenderText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[
            styles.skipButton,
            assessmentData.gender === "prefer-skip" &&
              styles.selectedSkipButton,
          ]}
          onPress={() => handleSelect("prefer-skip")}
        >
          <Text
            style={[
              styles.skipText,
              assessmentData.gender === "prefer-skip" &&
                styles.selectedSkipText,
            ]}
          >
            {GENDER_OPTIONS[2].label}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
