import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAssessment } from "../../../contexts/AssessmentContext";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = 72;
const VISIBLE_ITEMS = 5;

export const AgeStep: React.FC = () => {
  const { theme } = useTheme();
  const { assessmentData, updateAssessmentData } = useAssessment();
  const [selectedAge, setSelectedAge] = useState(assessmentData.age || 18);
  const scrollViewRef = useRef<ScrollView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.7)).current;

  const ages = Array.from({ length: 85 }, (_, i) => i + 16); // Ages 16-100

  useEffect(() => {
    updateAssessmentData({ age: selectedAge });
  }, [selectedAge]);

  useEffect(() => {
    // Scroll to selected age on mount with smooth animation
    setTimeout(() => {
      scrollToAge(selectedAge);
    }, 200);
  }, []);

  // Animate selected age appearance
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selectedAge]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const age = ages[index];
    if (age && age !== selectedAge) {
      setSelectedAge(age);
      // Light haptic feedback when age changes
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
  };

  const handleScrollBeginDrag = () => {
    // Medium haptic feedback when starting to scroll
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleMomentumScrollEnd = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const age = ages[index];
    if (age && age !== selectedAge) {
      setSelectedAge(age);
    }
    // Stronger haptic feedback when scroll ends
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  const scrollToAge = (age: number) => {
    const index = ages.indexOf(age);
    if (index !== -1) {
      scrollViewRef.current?.scrollTo({
        y: index * ITEM_HEIGHT,
        animated: true,
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    pickerContainer: {
      height: ITEM_HEIGHT * VISIBLE_ITEMS,
      width: "100%",
      position: "relative",
    },
    scrollView: {
      flex: 1,
    },
    ageItem: {
      height: ITEM_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    ageText: {
      fontSize: 28,
      color: theme.colors.textSecondary,
      fontWeight: "400",
      opacity: 0.6,
    },
    selectedAgeText: {
      fontSize: 48,
      color: theme.colors.surface,
      fontWeight: "700",
    },
    selectedAgeContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
      paddingHorizontal: 35,
      paddingVertical: 15,
      minWidth: Dimensions.get("window").width * 0.6,
      alignItems: "center",
      height: 90,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 12,
    },
    centerIndicator: {
      position: "absolute",
      top: ITEM_HEIGHT,
      left: 0,
      right: 0,
      height: ITEM_HEIGHT,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      backgroundColor: "transparent",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.centerIndicator} />
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollBeginDrag={handleScrollBeginDrag}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={8}
          bounces={true}
          bouncesZoom={false}
          alwaysBounceVertical={false}
          contentContainerStyle={{
            paddingTop: ITEM_HEIGHT * 2,
            paddingBottom: ITEM_HEIGHT * 2,
          }}
        >
          {ages.map((age) => {
            const isSelected = age === selectedAge;
            return (
              <View key={age} style={styles.ageItem}>
                <Animated.View
                  style={[
                    isSelected ? styles.selectedAgeContainer : undefined,
                    isSelected && {
                      transform: [{ scale: scaleAnim }],
                      opacity: opacityAnim,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ageText,
                      isSelected && styles.selectedAgeText,
                    ]}
                  >
                    {age}
                  </Text>
                </Animated.View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
