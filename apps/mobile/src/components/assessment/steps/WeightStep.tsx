import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const MIN_WEIGHT_KG = 30;
const MAX_WEIGHT_KG = 150;
const MIN_WEIGHT_LBS = 66;
const MAX_WEIGHT_LBS = 330;

export const WeightStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [weight, setWeight] = useState(assessmentData.weight || 70);
  const [unit, setUnit] = useState<"kg" | "lbs">(
    assessmentData.weightUnit || "kg"
  );

  useEffect(() => {
    updateAssessmentData({ weight, weightUnit: unit });
  }, [weight, unit]);

  const convertWeight = (
    value: number,
    fromUnit: "kg" | "lbs",
    toUnit: "kg" | "lbs"
  ) => {
    if (fromUnit === toUnit) return value;
    if (fromUnit === "kg" && toUnit === "lbs") return Math.round(value * 2.205);
    if (fromUnit === "lbs" && toUnit === "kg") return Math.round(value / 2.205);
    return value;
  };

  const handleWeightChange = (value: number) => {
    // Round to 1 decimal place for display
    const roundedValue = Math.round(value * 10) / 10;
    setWeight(roundedValue);
  };

  const handleUnitChange = (newUnit: "kg" | "lbs") => {
    if (newUnit !== unit) {
      const convertedWeight = convertWeight(weight, unit, newUnit);
      setWeight(convertedWeight);
      setUnit(newUnit);
    }
  };

  const minWeight = unit === "kg" ? MIN_WEIGHT_KG : MIN_WEIGHT_LBS;
  const maxWeight = unit === "kg" ? MAX_WEIGHT_KG : MAX_WEIGHT_LBS;
  const step = unit === "kg" ? 0.5 : 1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: theme.spacing.lg,
    },
    weightDisplay: {
      fontSize: 56,
      fontWeight: "700",
      color: theme.colors.primary,
      marginBottom: theme.spacing.md,
      textAlign: "center",
    },
    unit: {
      fontSize: 28,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
      fontWeight: "500",
    },
    sliderContainer: {
      width: "100%",
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.xl,
    },
    slider: {
      width: "100%",
      height: 50,
    },
    unitSelector: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: 6,
      marginBottom: theme.spacing.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    unitButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedUnitButton: {
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    unitButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    selectedUnitButtonText: {
      color: theme.colors.surface,
      fontWeight: "700",
    },
    weightRange: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: theme.spacing.md,
      marginTop: theme.spacing.sm,
    },
    rangeText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: "500",
    },
    weightContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.weightContainer}>
        <Text style={styles.weightDisplay}>{weight.toFixed(1)}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <View style={styles.unitSelector}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === "kg" && styles.selectedUnitButton,
          ]}
          onPress={() => handleUnitChange("kg")}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === "kg" && styles.selectedUnitButtonText,
            ]}
          >
            kg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitButton,
            unit === "lbs" && styles.selectedUnitButton,
          ]}
          onPress={() => handleUnitChange("lbs")}
        >
          <Text
            style={[
              styles.unitButtonText,
              unit === "lbs" && styles.selectedUnitButtonText,
            ]}
          >
            lbs
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minWeight}
          maximumValue={maxWeight}
          value={weight}
          step={step}
          onValueChange={handleWeightChange}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.border}
          thumbTintColor={theme.colors.primary}
        />
      </View>

      <View style={styles.weightRange}>
        <Text style={styles.rangeText}>
          {minWeight} {unit}
        </Text>
        <Text style={styles.rangeText}>
          {maxWeight} {unit}
        </Text>
      </View>
    </View>
  );
};
