import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const { width } = Dimensions.get("window");
const GAUGE_WIDTH = width - 40;
const GAUGE_HEIGHT = 120;
const SEGMENT_WIDTH = GAUGE_WIDTH / 3;

const MOOD_OPTIONS = [
  {
    id: "sad",
    emoji: "😢",
    label: "Sad",
    color: "#FF8E53",
    segmentIndex: 0,
  },
  {
    id: "neutral",
    emoji: "😐",
    label: "Neutral",
    color: "#FFD93D",
    segmentIndex: 1,
  },
  {
    id: "happy",
    emoji: "😊",
    label: "Happy",
    color: "#6BCF7F",
    segmentIndex: 2,
  },
];

const SUB_EMOTIONS = {
  sad: ["Lonely", "Disappointed", "Melancholy", "Blue", "Down"],
  neutral: ["Calm", "Content", "Balanced", "Steady", "Composed"],
  happy: ["Joyful", "Cheerful", "Pleased", "Satisfied", "Content"],
};

const CONTEXTS = {
  sad: ["Personal", "Work", "Health", "Relationships", "Disappointment"],
  neutral: ["Personal", "Work", "Health", "Relationships", "Daily Life"],
  happy: ["Personal", "Work", "Health", "Relationships", "Achievement"],
};

export const MoodStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [selectedMood, setSelectedMood] = useState(assessmentData.mood || null);
  const [selectedSubEmotions, setSelectedSubEmotions] = useState<string[]>([]);
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [showSubEmotions, setShowSubEmotions] = useState(false);
  const [showContext, setShowContext] = useState(false);

  useEffect(() => {
    updateAssessmentData({
      mood: selectedMood as any,
      subEmotions: selectedSubEmotions,
      contexts: selectedContexts,
    });
  }, [selectedMood, selectedSubEmotions, selectedContexts]);

  // Auto-advance to context when sub-emotions are selected
  useEffect(() => {
    if (selectedSubEmotions.length > 0 && !showContext) {
      setShowContext(true);
    }
  }, [selectedSubEmotions, showContext]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId as any);
    setShowSubEmotions(true);
    setShowContext(false);
    setSelectedSubEmotions([]);
    setSelectedContexts([]);
  };

  const handleSubEmotionSelect = (subEmotion: string) => {
    setSelectedSubEmotions((prev) => {
      if (prev.includes(subEmotion)) {
        return prev.filter((item) => item !== subEmotion);
      } else {
        return [...prev, subEmotion];
      }
    });
  };

  const handleContextSelect = (context: string) => {
    setSelectedContexts((prev) => {
      if (prev.includes(context)) {
        return prev.filter((item) => item !== context);
      } else {
        return [...prev, context];
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 40,
    },
    currentMood: {
      alignItems: "center",
      marginBottom: 40,
    },
    currentMoodText: {
      fontSize: 20,
      color: theme.colors.textSecondary,
      fontWeight: "500",
      marginBottom: 12,
    },
    currentMoodEmoji: {
      fontSize: 80,
    },
    gaugeContainer: {
      width: GAUGE_WIDTH,
      height: GAUGE_HEIGHT + 40, // Extra space for pointer
      alignSelf: "center",
      marginBottom: 40,
    },
    gauge: {
      width: GAUGE_WIDTH,
      height: GAUGE_HEIGHT,
      borderRadius: GAUGE_HEIGHT / 2,
      backgroundColor: theme.colors.surface,
      borderWidth: 4,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: "hidden",
    },
    gaugeSegments: {
      flexDirection: "row",
      height: "100%",
    },
    segment: {
      flex: 1,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    leftSegment: {
      backgroundColor: "#FF8E53",
      borderTopLeftRadius: GAUGE_HEIGHT / 2,
      borderBottomLeftRadius: GAUGE_HEIGHT / 2,
    },
    centerSegment: {
      backgroundColor: "#FFD93D",
    },
    rightSegment: {
      backgroundColor: "#6BCF7F",
      borderTopRightRadius: GAUGE_HEIGHT / 2,
      borderBottomRightRadius: GAUGE_HEIGHT / 2,
    },
    moodEmoji: {
      fontSize: 32,
    },
    subEmotionsContainer: {
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 20,
    },
    subEmotionsTitle: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 20,
      textAlign: "center",
    },
    subEmotionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
    },
    contextContainer: {
      width: "100%",
      paddingHorizontal: 20,
      marginTop: 20,
    },
    contextTitle: {
      fontSize: 18,
      color: theme.colors.text,
      fontWeight: "600",
      marginBottom: 20,
      textAlign: "center",
    },
    contextGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
    },
    subEmotionButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: "transparent",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    selectedSubEmotionButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    subEmotionText: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "500",
    },
    selectedSubEmotionText: {
      color: theme.colors.surface,
    },
    contextButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: "transparent",
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    selectedContextButton: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    contextText: {
      fontSize: 14,
      color: theme.colors.text,
      fontWeight: "500",
    },
    selectedContextText: {
      color: theme.colors.surface,
    },
    selectionFeedback: {
      marginTop: 16,
      padding: 12,
      backgroundColor: theme.colors.primary + "10",
      borderRadius: 8,
      alignItems: "center",
    },
    selectionFeedbackText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
  });

  const selectedMoodData = MOOD_OPTIONS.find(
    (mood) => mood.id === selectedMood
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Current Mood Display - Only show if mood selected */}
      {selectedMood && (
        <View style={styles.currentMood}>
          <Text style={styles.currentMoodText}>
            I Feel {selectedMoodData?.label}
          </Text>
          <Text style={styles.currentMoodEmoji}>{selectedMoodData?.emoji}</Text>
        </View>
      )}

      {/* Semi-Circular Gauge - Only show if no sub-emotions selected */}
      {!showSubEmotions && (
        <View style={styles.gaugeContainer}>
          <View style={styles.gauge}>
            <View style={styles.gaugeSegments}>
              {MOOD_OPTIONS.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.segment,
                    mood.segmentIndex === 0 && styles.leftSegment,
                    mood.segmentIndex === 1 && styles.centerSegment,
                    mood.segmentIndex === 2 && styles.rightSegment,
                  ]}
                  onPress={() => handleMoodSelect(mood.id)}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Sub-Emotions Selection */}
      {showSubEmotions && !showContext && (
        <View style={styles.subEmotionsContainer}>
          <Text style={styles.subEmotionsTitle}>
            Thanks for checking in. Want to explore what's behind that emotion?
            🤔
          </Text>
          <View style={styles.subEmotionsGrid}>
            {SUB_EMOTIONS[selectedMood as keyof typeof SUB_EMOTIONS]?.map(
              (subEmotion) => {
                const isSelected = selectedSubEmotions.includes(subEmotion);
                return (
                  <TouchableOpacity
                    key={subEmotion}
                    style={[
                      styles.subEmotionButton,
                      isSelected && styles.selectedSubEmotionButton,
                    ]}
                    onPress={() => handleSubEmotionSelect(subEmotion)}
                  >
                    <Text
                      style={[
                        styles.subEmotionText,
                        isSelected && styles.selectedSubEmotionText,
                      ]}
                    >
                      {subEmotion}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
          {selectedSubEmotions.length > 0 && (
            <View style={styles.selectionFeedback}>
              <Text style={styles.selectionFeedbackText}>
                {selectedSubEmotions.length} sub-emotion
                {selectedSubEmotions.length > 1 ? "s" : ""} selected
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Context Selection */}
      {showContext && (
        <View style={styles.contextContainer}>
          <Text style={styles.contextTitle}>
            Where might this feeling be coming from?
          </Text>
          <View style={styles.contextGrid}>
            {CONTEXTS[selectedMood as keyof typeof CONTEXTS]?.map((context) => {
              const isSelected = selectedContexts.includes(context);
              return (
                <TouchableOpacity
                  key={context}
                  style={[
                    styles.contextButton,
                    isSelected && styles.selectedContextButton,
                  ]}
                  onPress={() => handleContextSelect(context)}
                >
                  <Text
                    style={[
                      styles.contextText,
                      isSelected && styles.selectedContextText,
                    ]}
                  >
                    {context}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedContexts.length > 0 && (
            <View style={styles.selectionFeedback}>
              <Text style={styles.selectionFeedbackText}>
                {selectedContexts.length} context
                {selectedContexts.length > 1 ? "s" : ""} selected
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};
