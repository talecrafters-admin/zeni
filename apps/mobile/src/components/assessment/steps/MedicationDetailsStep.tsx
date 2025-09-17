import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const COMMON_MEDICATIONS = [
  "Abilify",
  "Abilify Maintena",
  "Acetaminophen",
  "Aspirin",
  "Aspellarmus",
  "Gardian",
  "Lexapro",
  "Prozac",
  "Zoloft",
  "Xanax",
  "Ativan",
  "Klonopin",
  "Seroquel",
  "Risperdal",
  "Depakote",
  "Lithium",
  "Wellbutrin",
  "Cymbalta",
  "Effexor",
  "Paxil",
  "Celexa",
  "Trazodone",
  "Ambien",
  "Lunesta",
];

export const MedicationDetailsStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [selectedMedications, setSelectedMedications] = useState<string[]>(
    assessmentData.medications || []
  );

  useEffect(() => {
    updateAssessmentData({ medications: selectedMedications });
  }, [selectedMedications]);

  const handleToggleMedication = (medication: string) => {
    setSelectedMedications((prev) => {
      if (prev.includes(medication)) {
        return prev.filter((med) => med !== medication);
      } else {
        return [...prev, medication];
      }
    });
  };

  const handleRemoveMedication = (medication: string) => {
    setSelectedMedications((prev) => prev.filter((med) => med !== medication));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    medicationsList: {
      flex: 1,
      marginBottom: 20,
    },
    medicationItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: "transparent",
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    selectedMedicationItem: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryLight + "20",
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.border,
      marginRight: 12,
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
    medicationName: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: "500",
    },
    selectedMedicationName: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
    selectedMedications: {
      marginTop: 20,
    },
    selectedMedicationsTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      marginBottom: 12,
    },
    selectedMedicationsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    selectedMedicationTag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    selectedMedicationTagText: {
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
    skipMessage: {
      textAlign: "center",
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontStyle: "italic",
      marginTop: 40,
    },
  });

  // Don't show this step if user selected "none" or "prefer not to say"
  if (
    assessmentData.medicationType === "none" ||
    assessmentData.medicationType === "prefer-not-say"
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.skipMessage}>
          No medication details needed for your selection.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.medicationsList}
        showsVerticalScrollIndicator={false}
      >
        {COMMON_MEDICATIONS.map((medication) => {
          const isSelected = selectedMedications.includes(medication);
          return (
            <TouchableOpacity
              key={medication}
              style={[
                styles.medicationItem,
                isSelected && styles.selectedMedicationItem,
              ]}
              onPress={() => handleToggleMedication(medication)}
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
                  styles.medicationName,
                  isSelected && styles.selectedMedicationName,
                ]}
              >
                {medication}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {selectedMedications.length > 0 && (
        <View style={styles.selectedMedications}>
          <Text style={styles.selectedMedicationsTitle}>
            Selected Medications:
          </Text>
          <View style={styles.selectedMedicationsList}>
            {selectedMedications.map((medication) => (
              <View key={medication} style={styles.selectedMedicationTag}>
                <Text style={styles.selectedMedicationTagText}>
                  {medication}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveMedication(medication)}
                >
                  <Text style={styles.removeButton}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
