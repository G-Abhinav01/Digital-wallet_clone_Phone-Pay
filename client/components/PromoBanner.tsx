import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface PromoBannerProps {
  text: string;
  icon?: string;
  iconColor?: string;
  showArrow?: boolean;
  onPress?: () => void;
  backgroundColor?: string;
}

export function PromoBanner({
  text,
  icon,
  iconColor = PhonePeColors.accentYellow,
  showArrow = true,
  onPress,
  backgroundColor = PhonePeColors.surfaceLight,
}: PromoBannerProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { backgroundColor }]}
    >
      <View style={styles.content}>
        {icon ? (
          <MaterialCommunityIcons
            name={icon as any}
            size={20}
            color={iconColor}
            style={styles.icon}
          />
        ) : null}
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
      {showArrow ? (
        <View style={styles.arrowContainer}>
          <Text style={styles.moreText}>More</Text>
          <Feather name="arrow-right" size={16} color={PhonePeColors.accentYellow} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.lg,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    fontSize: 13,
    color: PhonePeColors.text,
    flex: 1,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  moreText: {
    fontSize: 14,
    color: PhonePeColors.accentYellow,
    fontWeight: "500",
  },
});
