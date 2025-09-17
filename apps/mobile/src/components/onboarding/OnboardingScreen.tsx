import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  onNext?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
  showNext?: boolean;
  showSkip?: boolean;
  showBack?: boolean;
  nextText?: string;
  skipText?: string;
  backText?: string;
  stepNumber?: number;
  totalSteps?: number;
  highlightWords?: string[]; // Words to highlight in the title
  showSignInButton?: boolean; // Show sign in button instead of arrow for first screen
  showGetStartedButton?: boolean; // Show get started button for welcome screen
  onGetStarted?: () => void; // Handler for get started button
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = (props) => {
  const {
    title,
    subtitle,
    description,
    backgroundColor,
    children,
    onNext,
    onSkip,
    onBack,
    showNext = true,
    showSkip = false,
    showBack = false,
    nextText = "Next",
    skipText = "Skip",
    backText = "Back",
    stepNumber,
    totalSteps,
    highlightWords = [],
    showSignInButton = false,
    showGetStartedButton = false,
    onGetStarted,
  } = props;
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    safeArea: {
      flex: 1,
    },
    // Top section with illustration
    topSection: {
      flex: 0.7,
      backgroundColor: theme.colors.background,
      position: "relative",
    },
    stepButton: {
      position: "absolute",
      top: 20,
      alignSelf: "center",
      backgroundColor: theme.colors.surface + "33",
      borderWidth: 1,
      borderColor: theme.colors.surface,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      zIndex: 1000,
    },
    stepButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.surface,
    },
    illustrationContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    // Bottom section with content
    bottomSection: {
      flex: 0.3,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 30,
      position: "relative",
    },
    // Arch/curve at the top of bottom section - using huge circle
    archCurve: {
      position: "absolute",
      top: -60,
      left: -200,
      width: Dimensions.get("window").width * 2,
      height: Dimensions.get("window").height * 2,
      backgroundColor: theme.colors.surface,
      borderRadius: Dimensions.get("window").width,
    },
    progressContainer: {
      marginTop: -30,
      marginBottom: 30,
      alignItems: "center",
    },
    progressBar: {
      height: 10,
      width: 100,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.colors.primary,
      width:
        stepNumber && totalSteps
          ? `${(stepNumber / totalSteps) * 100}%`
          : "20%",
    },
    titleContainer: {
      marginBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.primary,
      lineHeight: 36,
      textAlign: "center",
    },
    highlightedText: {
      color: theme.colors.accent,
    },
    ctaButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    ctaButtonText: {
      color: theme.colors.surface,
      fontSize: 20,
      fontWeight: "600",
    },
    // Sign In button for first screen
    signInButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 40,
      paddingVertical: 16,
      borderRadius: 25,
      alignSelf: "center",
    },
    signInButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: "600",
    },
    // Get Started button for welcome screen - primary CTA
    getStartedButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 40,
      paddingVertical: 16,
      borderRadius: 25,
      alignSelf: "center",
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    getStartedButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: "600",
      marginRight: 8,
    },
    // Sign In text link
    signInText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
      textDecorationLine: "underline",
    },
    buttonContainer: {
      alignItems: "center",
    },
    // Cloud-like background shapes
    cloudShape: {
      position: "absolute",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: 50,
    },
  });

  // Helper function to render title with highlighted words
  const renderTitle = () => {
    if (!highlightWords.length) {
      return <Text style={styles.title}>{title}</Text>;
    }

    const words = title.split(" ");
    return (
      <Text style={styles.title}>
        {words.map((word, index) => {
          const isHighlighted = highlightWords.some((highlightWord) =>
            word.toLowerCase().includes(highlightWord.toLowerCase())
          );
          return (
            <Text
              key={index}
              style={isHighlighted ? styles.highlightedText : {}}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </Text>
          );
        })}
      </Text>
    );
  };

  // Render cloud-like background shapes
  const renderCloudShapes = () => (
    <>
      <View
        style={[
          styles.cloudShape,
          { width: 80, height: 40, top: 100, left: 50 },
        ]}
      />
      <View
        style={[
          styles.cloudShape,
          { width: 60, height: 30, top: 150, right: 60 },
        ]}
      />
      <View
        style={[
          styles.cloudShape,
          { width: 100, height: 50, bottom: 200, left: 80 },
        ]}
      />
      <View
        style={[
          styles.cloudShape,
          { width: 70, height: 35, bottom: 150, right: 40 },
        ]}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View style={styles.safeArea}>
        {/* Top Section with Illustration */}
        <View style={styles.topSection}>
          {renderCloudShapes()}

          {/* Step Button */}
          {stepNumber && (
            <TouchableOpacity style={styles.stepButton}>
              <Text style={styles.stepButtonText}>
                Step{" "}
                {stepNumber === 1
                  ? "One"
                  : stepNumber === 2
                  ? "Two"
                  : stepNumber === 3
                  ? "Three"
                  : stepNumber === 4
                  ? "Four"
                  : "Five"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Illustration */}
          <View style={styles.illustrationContainer}>{children}</View>
        </View>

        {/* Bottom Section with Content */}
        <View style={styles.bottomSection}>
          {/* Arch/Curve */}
          <View style={styles.archCurve} />

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>{renderTitle()}</View>

          {/* CTA Buttons */}
          {showGetStartedButton ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.getStartedButton}
                onPress={onGetStarted}
              >
                <Text style={styles.getStartedButtonText}>Get Started →</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onNext}>
                <Text style={styles.signInText}>
                  Already have an account? Sign In.
                </Text>
              </TouchableOpacity>
            </View>
          ) : showSignInButton ? (
            <TouchableOpacity style={styles.signInButton} onPress={onNext}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          ) : showNext ? (
            <TouchableOpacity style={styles.ctaButton} onPress={onNext}>
              <Text style={styles.ctaButtonText}>→</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
