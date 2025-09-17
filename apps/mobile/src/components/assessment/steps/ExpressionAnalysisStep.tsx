import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const CONCERNING_PHRASES = [
  "kill me",
  "don't want to be alive",
  "end it all",
  "suicide",
  "hurt myself",
  "die",
  "dead",
  "worthless",
  "hopeless",
  "no point",
];

export const ExpressionAnalysisStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [freeText, setFreeText] = useState(assessmentData.freeText || "");
  const [concerningPhrases, setConcerningPhrases] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    updateAssessmentData({
      freeText,
      concerningPhrases,
    });
  }, [freeText, concerningPhrases]);

  const handleTextChange = (text: string) => {
    setFreeText(text);
    setCharacterCount(text.length);

    // Analyze text for concerning phrases
    const foundPhrases: string[] = [];
    const lowerText = text.toLowerCase();

    CONCERNING_PHRASES.forEach((phrase) => {
      if (lowerText.includes(phrase)) {
        foundPhrases.push(phrase);
      }
    });

    setConcerningPhrases(foundPhrases);
  };

  const highlightConcerningText = (text: string) => {
    if (concerningPhrases.length === 0) return text;

    let highlightedText = text;
    concerningPhrases.forEach((phrase) => {
      const regex = new RegExp(`(${phrase})`, "gi");
      highlightedText = highlightedText.replace(regex, "🔴$1🔴");
    });

    return highlightedText;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    instructions: {
      fontSize: 16,
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 20,
      lineHeight: 24,
      paddingHorizontal: 20,
    },
    textInputContainer: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor:
        concerningPhrases.length > 0 ? theme.colors.error : theme.colors.border,
      marginBottom: 20,
      padding: 16,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      textAlignVertical: "top",
      lineHeight: 24,
    },
    characterCount: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: "right",
      marginTop: 8,
    },
    concerningPhrasesContainer: {
      backgroundColor:
        concerningPhrases.length > 0
          ? theme.colors.error + "20"
          : "transparent",
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      borderWidth: concerningPhrases.length > 0 ? 1 : 0,
      borderColor: theme.colors.error,
    },
    concerningPhrasesTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.error,
      marginBottom: 8,
    },
    concerningPhrasesList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    concerningPhraseTag: {
      backgroundColor: theme.colors.error,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 12,
    },
    concerningPhraseText: {
      color: theme.colors.surface,
      fontSize: 12,
      fontWeight: "500",
    },
    voiceButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 20,
    },
    voiceButtonText: {
      color: theme.colors.surface,
      fontSize: 16,
      fontWeight: "600",
    },
    analysisStatus: {
      fontSize: 14,
      color:
        concerningPhrases.length > 0
          ? theme.colors.error
          : theme.colors.primary,
      textAlign: "center",
      fontWeight: "600",
    },
    warningMessage: {
      fontSize: 14,
      color: theme.colors.error,
      textAlign: "center",
      marginTop: 8,
      fontStyle: "italic",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Freely write down anything that's on your mind. Dr. Freud is here to
        listen...
      </Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="I don't want to be alive anymore. Just f****** kill me, doc."
          value={freeText}
          onChangeText={handleTextChange}
          multiline
          placeholderTextColor={theme.colors.textSecondary}
          maxLength={350}
        />
        <Text style={styles.characterCount}>{characterCount}/350</Text>
      </View>

      {concerningPhrases.length > 0 && (
        <View style={styles.concerningPhrasesContainer}>
          <Text style={styles.concerningPhrasesTitle}>
            ⚠️ Concerning phrases detected:
          </Text>
          <View style={styles.concerningPhrasesList}>
            {concerningPhrases.map((phrase, index) => (
              <View key={index} style={styles.concerningPhraseTag}>
                <Text style={styles.concerningPhraseText}>{phrase}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.voiceButton}>
        <Text style={styles.voiceButtonText}>Use voice instead</Text>
      </TouchableOpacity>

      <Text style={styles.analysisStatus}>
        {concerningPhrases.length > 0
          ? "⚠️ AI detected concerning content"
          : "✓ AI analysis in progress..."}
      </Text>

      {concerningPhrases.length > 0 && (
        <Text style={styles.warningMessage}>
          If you're having thoughts of self-harm, please reach out to a mental
          health professional or crisis hotline.
        </Text>
      )}
    </View>
  );
};
