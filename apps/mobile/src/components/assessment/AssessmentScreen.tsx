import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAssessment } from "../../contexts/AssessmentContext";

interface AssessmentScreenProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showNext?: boolean;
  onNext?: () => void;
  nextText?: string;
  nextDisabled?: boolean;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  children,
  title,
  showBack = true,
  onBack,
  showNext = true,
  onNext,
  nextText = "Continue →",
  nextDisabled = false,
}) => {
  const { theme } = useTheme();
  const { currentStep, totalSteps, nextStep, previousStep, canProceed } =
    useAssessment();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const isNextDisabled = nextDisabled || !canProceed();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      previousStep();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    backButton: {
      padding: 8,
    },
    backButtonText: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
    },
    stepIndicator: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontWeight: "500",
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.primary,
      marginBottom: 32,
      lineHeight: 32,
    },
    children: {
      flex: 1,
    },
    footer: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      paddingTop: 20,
    },
    nextButton: {
      backgroundColor: isNextDisabled
        ? theme.colors.textSecondary
        : theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: "center",
      opacity: isNextDisabled ? 0.6 : 1,
    },
    nextButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>
          {currentStep} of {totalSteps}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.children}>{children}</View>
      </View>

      {showNext && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            disabled={isNextDisabled}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.nextButtonText}>{nextText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
