import React from "react";
import { StyleSheet, View, Text, Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface RewardCardProps {
  title: string;
  description: string;
  iconName?: string;
  onPress?: () => void;
}

export function RewardCard({
  title,
  description,
  onPress,
}: RewardCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <LinearGradient
        colors={[PhonePeColors.surfaceLight, PhonePeColors.surface]}
        style={styles.gradient}
      >
        <View style={styles.iconPlaceholder}>
          <View style={styles.iconBg} />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 180,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    padding: Spacing.md,
  },
  iconPlaceholder: {
    width: "100%",
    height: 80,
    backgroundColor: PhonePeColors.background,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
    overflow: "hidden",
  },
  iconBg: {
    flex: 1,
    backgroundColor: PhonePeColors.surfaceLight,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: PhonePeColors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: PhonePeColors.textSecondary,
    lineHeight: 16,
  },
});
