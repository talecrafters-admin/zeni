import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Theme {
  colors: {
    // Mindful Brown
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Empathy Orange
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;

    // Optimistic Gray
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    muted: string;

    // Serenity Green
    success: string;
    successLight: string;

    // Zen Yellow
    warning: string;
    warningLight: string;

    // Error
    error: string;

    // Kind Purple
    accent: string;
    accentLight: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  typography: {
    h1: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    h2: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    h3: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    body: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
    caption: {
      fontSize: number;
      fontWeight: string;
      lineHeight: number;
    };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const lightTheme: Theme = {
  colors: {
    // Mindful Brown
    primary: "#704A33", // Brown 70
    primaryLight: "#926247", // Brown 60
    primaryDark: "#4F3422", // Brown 80

    // Empathy Orange
    secondary: "#C96100", // Orange 50
    secondaryLight: "#ED7E1C", // Orange 40
    secondaryDark: "#AA5500", // Orange 60

    // Optimistic Gray
    background: "#F5F5F5", // Gray 10
    surface: "#FFFFFF",
    text: "#161513", // Gray 100
    textSecondary: "#5A554E", // Gray 70
    border: "#E1E1E0", // Gray 20

    // Serenity Green
    success: "#5A6B38", // Green 70
    successLight: "#7D944D", // Green 60

    // Zen Yellow
    warning: "#E0A500", // Yellow 60
    warningLight: "#FFBD1A", // Yellow 50

    // Error (using Orange for consistency)
    error: "#C96100", // Orange 50

    // Kind Purple
    accent: "#6C5FC8", // Purple 60
    accentLight: "#8978E3", // Purple 50

    // Additional semantic colors
    info: "#6C5FC8", // Purple 60
    muted: "#C9C7C5", // Gray 30
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Mindful Brown (lighter for dark mode)
    primary: "#AC836C", // Brown 50
    primaryLight: "#C0A091", // Brown 40
    primaryDark: "#926247", // Brown 60

    // Empathy Orange (lighter for dark mode)
    secondary: "#ED7E1C", // Orange 40
    secondaryLight: "#F6A360", // Orange 30
    secondaryDark: "#C96100", // Orange 50

    // Optimistic Gray (dark mode)
    background: "#161513", // Gray 100
    surface: "#292723", // Gray 90
    text: "#F5F5F5", // Gray 10
    textSecondary: "#ACA9A5", // Gray 40
    border: "#3F3C36", // Gray 80

    // Serenity Green (lighter for dark mode)
    success: "#7D944D", // Green 60
    successLight: "#9BB068", // Green 50

    // Zen Yellow (lighter for dark mode)
    warning: "#FFBD1A", // Yellow 50
    warningLight: "#FFCE5C", // Yellow 40

    // Error (using Orange for consistency)
    error: "#ED7E1C", // Orange 40

    // Kind Purple (lighter for dark mode)
    accent: "#8978E3", // Purple 50
    accentLight: "#A694F5", // Purple 40

    // Additional semantic colors
    info: "#8978E3", // Purple 50
    muted: "#5A554E", // Gray 70
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme_preference");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.warn("Failed to load theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem(
        "theme_preference",
        newTheme ? "dark" : "light"
      );
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
