import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const { height } = Dimensions.get("window");

const SLEEP_QUALITY_OPTIONS = [
  { value: 0, label: "Excellent", hours: "7-9 HOURS" },
  { value: 1, label: "Good", hours: "6-7 HOURS" },
  { value: 2, label: "Fair", hours: "5 HOURS" },
  { value: 3, label: "Poor", hours: "3-4 HOURS" },
  { value: 4, label: "Worst", hours: "<3 HOURS" },
];

export const SleepQualityStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [selectedValue, setSelectedValue] = useState<number>(2);

  useEffect(() => {
    if (assessmentData.sleepQuality !== undefined) {
      const value =
        typeof assessmentData.sleepQuality === "number"
          ? assessmentData.sleepQuality
          : 2;
      setSelectedValue(value);
    }
  }, [assessmentData.sleepQuality]);

  const handleOptionSelect = (value: number) => {
    setSelectedValue(value);
    const option = SLEEP_QUALITY_OPTIONS[value];
    const hoursMatch = option.hours.match(/(\d+)/);
    const hoursValue = hoursMatch ? parseInt(hoursMatch[1]) : 5;
    updateAssessmentData({
      sleepQuality: value as any,
      sleepHours: hoursValue,
    });
  };

  const sliderHeight = height * 0.5;
  const handlePosition = (selectedValue / 4) * (sliderHeight - 40);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F6F0", paddingHorizontal: 20 },
    sliderContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      height: sliderHeight,
      marginTop: 60,
    },
    leftLabels: { flex: 1, paddingRight: 20 },
    labelItem: {
      height: sliderHeight / 5,
      justifyContent: "center",
      paddingVertical: 8,
    },
    labelText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#8B4513",
      marginBottom: 4,
    },
    hoursText: { fontSize: 12, color: "#A0A0A0", fontWeight: "500" },
    selectedLabel: { color: "#8B4513", fontWeight: "700" },
    selectedHours: { color: "#8B4513", fontWeight: "600" },
    sliderTrack: {
      width: 16,
      height: sliderHeight,
      backgroundColor: "#FF6B35",
      borderRadius: 8,
      position: "relative",
      marginHorizontal: 20,
    },
    sliderHandle: {
      position: "absolute",
      width: 40,
      height: 40,
      backgroundColor: "#FF6B35",
      borderRadius: 20,
      left: -12,
      top: handlePosition,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "#FF8C69",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    handleIcon: { fontSize: 16, color: "white", fontWeight: "bold" },
    rightMarkers: { flex: 1, paddingLeft: 20 },
    markerItem: {
      height: sliderHeight / 5,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
    },
    markerDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: "#C4C4C4",
    },
    markerDotSelected: {
      backgroundColor: "#8B4513",
      transform: [{ scale: 1.3 }],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <View style={styles.leftLabels}>
          {SLEEP_QUALITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.labelItem}
              onPress={() => handleOptionSelect(option.value)}
            >
              <Text
                style={[
                  styles.labelText,
                  selectedValue === option.value && styles.selectedLabel,
                ]}
              >
                {option.label}
              </Text>
              <Text
                style={[
                  styles.hoursText,
                  selectedValue === option.value && styles.selectedHours,
                ]}
              >
                {option.hours}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sliderTrack}>
          <View style={styles.sliderHandle}>
            <Text style={styles.handleIcon}>→</Text>
          </View>
        </View>
        <View style={styles.rightMarkers}>
          {SLEEP_QUALITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.markerItem}
              onPress={() => handleOptionSelect(option.value)}
            >
              <View
                style={[
                  styles.markerDot,
                  selectedValue === option.value && styles.markerDotSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
