import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface ErrorDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  primaryAction?: {
    text: string;
    onPress: () => void;
  };
  secondaryAction?: {
    text: string;
    onPress: () => void;
  };
}

const { width } = Dimensions.get("window");

export const ErrorDialog: React.FC<ErrorDialogProps> = ({
  visible,
  title,
  message,
  onClose,
  primaryAction,
  secondaryAction,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      width: width * 0.9,
      maxWidth: 400,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    },
    iconContainer: {
      alignItems: "center",
      marginBottom: 16,
    },
    icon: {
      fontSize: 48,
      color: theme.colors.error,
      marginBottom: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginBottom: 12,
    },
    message: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 24,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
    },
    primaryButtonText: {
      color: theme.colors.surface,
    },
    secondaryButtonText: {
      color: theme.colors.textSecondary,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⚠</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            {secondaryAction && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={secondaryAction.onPress}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  {secondaryAction.text}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={primaryAction?.onPress || onClose}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                {primaryAction?.text || "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
