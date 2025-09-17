import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTheme } from "../../src/contexts/ThemeContext";
import { router } from "expo-router";
import { completeProfileSvc } from "../../src/services/onboarding";

const AVATARS = [
  require("../../assets/avatar/avataaars (1).png"),
  require("../../assets/avatar/avataaars (2).png"),
  require("../../assets/avatar/avataaars (3).png"),
  require("../../assets/avatar/avataaars (4).png"),
  require("../../assets/avatar/avataaars (5).png"),
  require("../../assets/avatar/avataaars (6).png"),
  require("../../assets/avatar/avataaars (7).png"),
  require("../../assets/avatar/avataaars (8).png"),
  require("../../assets/avatar/avataaars (9).png"),
  require("../../assets/avatar/avataaars (10).png"),
  require("../../assets/avatar/avataaars (11).png"),
  require("../../assets/avatar/avataaars (12).png"),
  require("../../assets/avatar/avataaars (13).png"),
  require("../../assets/avatar/avataaars (14).png"),
  require("../../assets/avatar/avataaars (15).png"),
  require("../../assets/avatar/avataaars (16).png"),
  require("../../assets/avatar/avataaars (17).png"),
  require("../../assets/avatar/avataaars (18).png"),
];

export default function Profile() {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [avatarIndex, setAvatarIndex] = useState<number>(0);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleComplete = async () => {
    try {
      await completeProfileSvc({
        displayName: username || name || undefined,
        city: city || undefined,
        avatarUrl: undefined, // using local asset for now; can upload later
      });
    } catch (e) {
      console.warn("completeProfile failed", e);
    }
    router.replace("/(app)");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.colors.text,
      textAlign: "center",
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    avatarWrapper: {
      alignItems: "center",
      marginBottom: theme.spacing.lg,
    },
    avatarCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing.md,
      overflow: "hidden",
    },
    outlineBtn: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: 999,
    },
    outlineBtnText: {
      color: theme.colors.text,
      fontWeight: "600",
      fontSize: 13,
    },
    inputGroup: {
      marginBottom: theme.spacing.lg,
    },
    label: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.text,
      marginBottom: 8,
    },
    hint: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 6,
    },
    input: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 14,
      fontSize: 16,
      color: theme.colors.text,
    },
    cta: {
      marginTop: theme.spacing.xl,
      backgroundColor: theme.colors.primary,
      paddingVertical: 18,
      borderRadius: 999,
      alignItems: "center",
    },
    ctaDisabled: { opacity: 0.5 },
    ctaText: { color: theme.colors.surface, fontSize: 16, fontWeight: "700" },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.25)",
      justifyContent: "flex-end",
    },
    modalSheet: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      maxHeight: "65%",
    },
    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    modalTitle: { fontSize: 18, fontWeight: "700", color: theme.colors.text },
    grid: { marginTop: theme.spacing.sm },
    gridItem: { width: "25%", aspectRatio: 1, padding: 6 },
    gridItemInner: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    gridItemSelected: { borderColor: theme.colors.primary },
    gridImage: { width: "100%", height: "100%", resizeMode: "cover" },
    sheetButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: theme.spacing.lg,
    },
    sheetBtn: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: 12,
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: "transparent",
      marginRight: theme.spacing.sm,
    },
    sheetBtnPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      marginRight: 0,
      marginLeft: theme.spacing.sm,
    },
    sheetBtnText: { color: theme.colors.text, fontWeight: "600" },
    sheetBtnPrimaryText: { color: theme.colors.surface, fontWeight: "700" },
  });

  // Username is required
  const canSubmit = username.trim().length > 0;

  const renderAvatarItem = ({ item, index }: { item: any; index: number }) => {
    const selected = avatarIndex === index;
    return (
      <View style={styles.gridItem}>
        <TouchableOpacity
          onPress={() => setAvatarIndex(index)}
          activeOpacity={0.85}
          style={[styles.gridItemInner, selected && styles.gridItemSelected]}
        >
          <Image source={item} style={styles.gridImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          Help us personalize your mental wellness journey
        </Text>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={AVATARS[avatarIndex]}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => setPickerVisible(true)}
          >
            <Text style={styles.outlineBtnText}>Choose Avatar</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name (optional)</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Pick a username"
              placeholderTextColor={theme.colors.textSecondary}
              autoCapitalize="none"
            />
            <Text style={styles.hint}>
              Shown to others for anonymity. You can change it later.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City (optional)</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <TouchableOpacity
            style={[styles.cta, !canSubmit && styles.ctaDisabled]}
            onPress={handleComplete}
            disabled={!canSubmit}
          >
            <Text style={styles.ctaText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={pickerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose your avatar</Text>
              <TouchableOpacity onPress={() => setPickerVisible(false)}>
                <Text style={{ color: theme.colors.textSecondary }}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={AVATARS}
              keyExtractor={(_, idx) => String(idx)}
              renderItem={renderAvatarItem}
              numColumns={4}
              style={styles.grid}
            />
            <View style={styles.sheetButtons}>
              <TouchableOpacity
                style={styles.sheetBtn}
                onPress={() => setAvatarIndex(0)}
              >
                <Text style={styles.sheetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnPrimary]}
                onPress={() => setPickerVisible(false)}
              >
                <Text style={styles.sheetBtnPrimaryText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
