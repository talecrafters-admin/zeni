import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onComplete: () => void;
  mode?: "splash" | "full"; // 'splash' for onboarding, 'full' for app launch
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  mode = "full",
}) => {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const rotateAnim = new Animated.Value(0);

  // Different steps based on mode
  const steps =
    mode === "splash"
      ? [{ type: "splash", duration: 2000 }] // Only splash for onboarding
      : [
          { type: "splash", duration: 2000 },
          { type: "loading", duration: 3000 },
          { type: "quote", duration: 4000 },
          { type: "fetching", duration: 2000 },
        ];

  const quotes = [
    {
      text: "In the midst of winter, I found there was within me an invincible summer.",
      author: "— ALBERT CAMUS",
    },
    {
      text: "The mind is everything. What you think you become.",
      author: "— BUDDHA",
    },
    {
      text: "Peace comes from within. Do not seek it without.",
      author: "— BUDDHA",
    },
  ];

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    // Initial fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Progress through steps
    let totalTime = 0;
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);

        if (step.type === "loading") {
          // Animate progress from 0 to 99%
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 99) {
                clearInterval(progressInterval);
                return 99;
              }
              return prev + 1;
            });
          }, 30);
        }
      }, totalTime);

      totalTime += step.duration;
    });

    // Complete after all steps
    setTimeout(() => {
      onComplete();
    }, totalTime);
  };

  const renderLogo = () => {
    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <Animated.View
        style={[styles.logoContainer, { transform: [{ rotate: spin }] }]}
      >
        <View
          style={[
            styles.circle,
            { backgroundColor: theme.colors.primary, top: -5, left: -5 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { backgroundColor: theme.colors.primary, top: -5, right: -5 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { backgroundColor: theme.colors.primary, bottom: -5, left: -5 },
          ]}
        />
        <View
          style={[
            styles.circle,
            { backgroundColor: theme.colors.primary, bottom: -5, right: -5 },
          ]}
        />
      </Animated.View>
    );
  };

  const renderSplash = () => (
    <View
      style={[
        styles.stepContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {renderLogo()}
        <Text style={[styles.brandName, { color: theme.colors.primary }]}>
          zeni
        </Text>
      </Animated.View>
    </View>
  );

  const renderLoading = () => (
    <View
      style={[styles.stepContainer, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.loadingBackground}>
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.primary },
          ]}
        />
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.primary, top: 100, right: 50 },
          ]}
        />
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.primary, bottom: 150, left: 100 },
          ]}
        />
      </View>
      <Text style={[styles.progressText, { color: theme.colors.surface }]}>
        {progress}%
      </Text>
    </View>
  );

  const renderQuote = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return (
      <View
        style={[styles.stepContainer, { backgroundColor: theme.colors.accent }]}
      >
        <View style={styles.quoteContainer}>
          {renderLogo()}
          <Text style={[styles.quoteText, { color: theme.colors.surface }]}>
            {quote.text}
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.colors.surface }]}>
            {quote.author}
          </Text>
        </View>
      </View>
    );
  };

  const renderFetching = () => (
    <View
      style={[styles.stepContainer, { backgroundColor: theme.colors.success }]}
    >
      <View style={styles.fetchingBackground}>
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.success },
          ]}
        />
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.success, top: 80, right: 30 },
          ]}
        />
        <View
          style={[
            styles.backgroundCircle,
            { backgroundColor: theme.colors.success, bottom: 120, left: 80 },
          ]}
        />
      </View>
      <View style={styles.fetchingContent}>
        <Text style={[styles.fetchingText, { color: theme.colors.surface }]}>
          Fetching Data...
        </Text>
        <Text style={[styles.shakeText, { color: theme.colors.surface }]}>
          Shake screen to interact!
        </Text>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderSplash();
      case 1:
        return renderLoading();
      case 2:
        return renderQuote();
      case 3:
        return renderFetching();
      default:
        return renderSplash();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={currentStep === 0 ? "dark-content" : "light-content"}
        backgroundColor={theme.colors.background}
      />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    position: "relative",
    marginBottom: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
  },
  brandName: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "System",
  },
  loadingBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolute",
    opacity: 0.1,
  },
  progressText: {
    fontSize: 48,
    fontWeight: "700",
    fontFamily: "System",
  },
  quoteContainer: {
    paddingHorizontal: 40,
    alignItems: "flex-start",
  },
  quoteText: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 28,
    marginTop: 30,
    marginBottom: 20,
    fontStyle: "italic",
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  fetchingBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  fetchingContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  fetchingText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "System",
  },
  shakeText: {
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.8,
  },
});
