import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface PhoneInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  countryCode?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  countryCode = "+91", // Default to India
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");

    // For Indian numbers (10 digits)
    if (countryCode === "+91") {
      if (cleaned.length === 0) {
        return "";
      } else if (cleaned.length <= 5) {
        return cleaned;
      } else if (cleaned.length <= 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      } else {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 10)}`;
      }
    }

    // For US numbers (10 digits)
    if (countryCode === "+1") {
      if (cleaned.length === 0) {
        return "";
      } else if (cleaned.length <= 3) {
        return `(${cleaned}`;
      } else if (cleaned.length <= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
          6,
          10
        )}`;
      }
    }

    // For other countries, just return cleaned digits
    return cleaned;
  };

  const handleTextChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    onChangeText(formatted);
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: error
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.border,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    countryCode: {
      fontSize: 16,
      color: theme.colors.text,
      marginRight: 8,
      fontWeight: "500",
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text,
      paddingVertical: 0,
    },
    leftIcon: {
      marginRight: 12,
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    errorIcon: {
      marginRight: 8,
      fontSize: 16,
      color: theme.colors.error,
    },
    errorText: {
      fontSize: 14,
      color: theme.colors.error,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.leftIcon}>📞</Text>
        <Text style={styles.countryCode}>{countryCode}</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={handleTextChange}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={countryCode === "+91" ? 12 : 17} // Indian: 12345 67890, US: (123) 456-7890
        />
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
