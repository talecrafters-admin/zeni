import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

export const PhysicalDistressStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [hasPhysicalDistress, setHasPhysicalDistress] = useState<
    boolean | undefined
  >(assessmentData.physicalDistress);

  useEffect(() => {
    if (hasPhysicalDistress !== undefined) {
      updateAssessmentData({ physicalDistress: hasPhysicalDistress });
    }
  }, [hasPhysicalDistress]);

  const handleSelect = (value: boolean) => {
    setHasPhysicalDistress(value);
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
      paddingVertical: 20,
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
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 4,
    },
    selectedOptionTitle: {
      color: theme.colors.primary,
    },
    optionDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    selectedOptionDescription: {
      color: theme.colors.primary,
    },
    checkmarkIcon: {
      fontSize: 20,
      color: theme.colors.textSecondary,
      marginLeft: 12,
    },
    selectedCheckmarkIcon: {
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            hasPhysicalDistress === true && styles.selectedOption,
          ]}
          onPress={() => handleSelect(true)}
        >
          <View
            style={[
              styles.radioButton,
              hasPhysicalDistress === true && styles.selectedRadioButton,
            ]}
          >
            {hasPhysicalDistress === true && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <View style={styles.optionContent}>
            <Text
              style={[
                styles.optionTitle,
                hasPhysicalDistress === true && styles.selectedOptionTitle,
              ]}
            >
              Yes, one or multiple
            </Text>
            <Text
              style={[
                styles.optionDescription,
                hasPhysicalDistress === true &&
                  styles.selectedOptionDescription,
              ]}
            >
              Yes, I'm experiencing physical pain in different places over my
              body.
            </Text>
          </View>
          <Text
            style={[
              styles.checkmarkIcon,
              hasPhysicalDistress === true && styles.selectedCheckmarkIcon,
            ]}
          >
            ✓
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            hasPhysicalDistress === false && styles.selectedOption,
          ]}
          onPress={() => handleSelect(false)}
        >
          <View
            style={[
              styles.radioButton,
              hasPhysicalDistress === false && styles.selectedRadioButton,
            ]}
          >
            {hasPhysicalDistress === false && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <View style={styles.optionContent}>
            <Text
              style={[
                styles.optionTitle,
                hasPhysicalDistress === false && styles.selectedOptionTitle,
              ]}
            >
              No Physical Pain At All
            </Text>
            <Text
              style={[
                styles.optionDescription,
                hasPhysicalDistress === false &&
                  styles.selectedOptionDescription,
              ]}
            >
              No, I'm not experiencing any physical pain in my body at all.
            </Text>
          </View>
          <Text
            style={[
              styles.checkmarkIcon,
              hasPhysicalDistress === false && styles.selectedCheckmarkIcon,
            ]}
          >
            ✓
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
