import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  rightIcon?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  rightIcon,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled
            ? theme.colors.textSecondary
            : theme.colors.primary,
        };
      case "secondary":
        return {
          backgroundColor: disabled
            ? theme.colors.textSecondary
            : theme.colors.secondary,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: disabled
            ? theme.colors.textSecondary
            : theme.colors.primary,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return {
          color: disabled ? theme.colors.textSecondary : theme.colors.primary,
        };
      default:
        return {
          color: theme.colors.surface,
        };
    }
  };

  const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      minHeight: 52,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
    },
    rightIcon: {
      marginLeft: 8,
      fontSize: 16,
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={getTextStyle().color} />
          <Text style={[styles.buttonText, getTextStyle(), { marginLeft: 8 }]}>
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
          {rightIcon && (
            <Text style={[styles.rightIcon, getTextStyle()]}>{rightIcon}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
