import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const VOICE_TEXT = "I believe in Dr. Freud with all my heart.";

export const VoiceAnalysisStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [voiceText, setVoiceText] = useState(assessmentData.voiceText || "");

  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    updateAssessmentData({ voiceText });
  }, [voiceText]);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setHasRecorded(false);
    startPulseAnimation();

    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      setVoiceText(VOICE_TEXT);
      stopPulseAnimation();
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);
    setVoiceText(VOICE_TEXT);
    stopPulseAnimation();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    instructions: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 40,
      lineHeight: 24,
      paddingHorizontal: 20,
    },
    waveformContainer: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: isRecording
        ? theme.colors.primaryLight + "20"
        : theme.colors.surface,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
      borderWidth: 2,
      borderColor: isRecording ? theme.colors.primary : theme.colors.border,
    },
    waveform: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isRecording
        ? theme.colors.primary
        : theme.colors.textSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
    waveformText: {
      fontSize: 24,
      color: theme.colors.surface,
      fontWeight: "600",
    },
    voiceTextContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 20,
      paddingHorizontal: 24,
      borderRadius: 12,
      marginBottom: 40,
      borderWidth: 1,
      borderColor: theme.colors.border,
      minHeight: 80,
      justifyContent: "center",
    },
    voiceText: {
      fontSize: 18,
      color: theme.colors.text,
      textAlign: "center",
      lineHeight: 24,
      fontStyle: "italic",
    },
    recordButton: {
      backgroundColor: isRecording ? theme.colors.error : theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: "center",
      minWidth: 120,
    },
    recordButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: "600",
    },
    statusText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginTop: 12,
    },
    analysisComplete: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: "600",
      textAlign: "center",
      marginTop: 12,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Please say the following words below. Don't worry, we don't steal your
        voice data.
      </Text>

      <Animated.View
        style={[
          styles.waveformContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <View style={styles.waveform}>
          <Text style={styles.waveformText}>
            {isRecording ? "🎤" : hasRecorded ? "✓" : "🎵"}
          </Text>
        </View>
      </Animated.View>

      <View style={styles.voiceTextContainer}>
        <Text style={styles.voiceText}>
          {hasRecorded ? voiceText : VOICE_TEXT}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.recordButton}
        onPress={isRecording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.recordButtonText}>
          {isRecording
            ? "Stop Recording"
            : hasRecorded
            ? "Record Again"
            : "Start Recording"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.statusText}>
        {isRecording
          ? "Recording... Please speak clearly."
          : hasRecorded
          ? "Voice analysis complete!"
          : "Tap to start recording"}
      </Text>

      {hasRecorded && (
        <Text style={styles.analysisComplete}>✓ AI analysis complete</Text>
      )}
    </View>
  );
};
