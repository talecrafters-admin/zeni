import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const COMMON_SYMPTOMS = [
  "Depressed",
  "Anxiety",
  "Social Withdrawal",
  "Feeling Numbness",
  "Feeling Sad",
  "Low Motivation",
  "Mood Swings",
  "Irritability",
  "Panic Attacks",
  "Sleep Problems",
  "Appetite Changes",
  "Concentration Issues",
  "Memory Problems",
  "Fatigue",
  "Restlessness",
  "Worthlessness",
  "Guilt",
  "Hopelessness",
  "Suicidal Thoughts",
  "Self-Harm",
  "Substance Use",
  "Isolation",
  "Paranoia",
  "Hallucinations",
];

export const MentalHealthSymptomsStep: React.FC = () => {
  const { theme } = useTheme();
  const { updateAssessmentData } = useAssessment();
  // Always start empty; user chooses explicitly
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptoms, setCustomSymptoms] = useState("");

  useEffect(() => {
    updateAssessmentData({
      mentalHealthSymptoms: selectedSymptoms,
      customSymptoms: customSymptoms,
    });
  }, [selectedSymptoms, customSymptoms]);

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCustomSymptomsChange = (text: string) => {
    setCustomSymptoms(text);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      paddingBottom: 24,
    },
    illustration: {
      width: 200,
      height: 200,
      backgroundColor: theme.colors.surface,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      alignSelf: "center",
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    illustrationText: {
      fontSize: 80,
      color: theme.colors.textSecondary,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 12,
    },
    pillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 20,
    },
    pill: {
      backgroundColor: "transparent",
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    pillSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    pillText: {
      color: theme.colors.text,
      fontSize: 14,
      fontWeight: "500",
    },
    pillTextSelected: {
      color: theme.colors.surface,
    },
    customInputContainer: {
      marginTop: 4,
    },
    customInputLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 8,
    },
    customInput: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: theme.colors.text,
      minHeight: 100,
      textAlignVertical: "top",
    },
    selectedSymptoms: {
      marginTop: 20,
    },
    selectedSymptomsTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 12,
    },
    selectedSymptomsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    selectedSymptomTag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    selectedSymptomTagText: {
      color: theme.colors.surface,
      fontSize: 14,
      fontWeight: "500",
      marginRight: 6,
    },
    removeButton: {
      fontSize: 16,
      color: theme.colors.surface,
      fontWeight: "600",
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.illustration}>
        <Text style={styles.illustrationText}>🤗</Text>
      </View>

      <Text style={styles.sectionTitle}>Most Common</Text>
      <View style={styles.pillsWrap}>
        {["Depressed", "Anxiety"].map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom);
          return (
            <TouchableOpacity
              key={symptom}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => handleToggleSymptom(symptom)}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextSelected]}
              >
                {symptom}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>All Symptoms</Text>
      <View style={styles.pillsWrap}>
        {COMMON_SYMPTOMS.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom);
          return (
            <TouchableOpacity
              key={symptom}
              style={[styles.pill, isSelected && styles.pillSelected]}
              onPress={() => handleToggleSymptom(symptom)}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextSelected]}
              >
                {symptom}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.customInputContainer}>
        <Text style={styles.customInputLabel}>Other symptoms (optional):</Text>
        <TextInput
          style={styles.customInput}
          placeholder="Social Withdrawal, Feeling Numbness, Feeling Sad, Depressed..."
          value={customSymptoms}
          onChangeText={handleCustomSymptomsChange}
          multiline
          placeholderTextColor={theme.colors.textSecondary}
        />
      </View>

      {selectedSymptoms.length > 0 && (
        <View style={styles.selectedSymptoms}>
          <Text style={styles.selectedSymptomsTitle}>Selected Symptoms:</Text>
          <View style={styles.selectedSymptomsList}>
            {selectedSymptoms.map((symptom) => (
              <View key={symptom} style={styles.selectedSymptomTag}>
                <Text style={styles.selectedSymptomTagText}>{symptom}</Text>
                <TouchableOpacity onPress={() => handleToggleSymptom(symptom)}>
                  <Text style={styles.removeButton}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};
