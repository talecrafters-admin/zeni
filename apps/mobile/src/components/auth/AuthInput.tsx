import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface AuthInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  error?: string;
  leftIcon?: string | React.ReactNode;
  rightIcon?: string | React.ReactNode;
  onRightIconPress?: () => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      borderColor: error
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.border,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      paddingVertical: 0,
    },
    leftIconText: {
      marginRight: 10,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    rightIconText: {
      marginLeft: 10,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    errorIcon: { marginRight: 8, fontSize: 16, color: theme.colors.error },
    errorText: { fontSize: 14, color: theme.colors.error, fontWeight: "500" },
  });

  const renderLeft = () => {
    if (!leftIcon) return null;
    if (typeof leftIcon === "string")
      return <Text style={styles.leftIconText}>{leftIcon}</Text>;
    return <View style={{ marginRight: 10 }}>{leftIcon}</View>;
  };

  const renderRight = () => {
    if (!rightIcon) return null;
    const content =
      typeof rightIcon === "string" ? (
        <Text style={styles.rightIconText}>{rightIcon}</Text>
      ) : (
        <View style={{ marginLeft: 10 }}>{rightIcon}</View>
      );
    return onRightIconPress ? (
      <TouchableOpacity onPress={onRightIconPress}>{content}</TouchableOpacity>
    ) : (
      content
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {renderLeft()}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {renderRight()}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};
