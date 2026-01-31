import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface WishCardBannerProps {
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function WishCardBanner({
  title,
  subtitle,
  onPress,
}: WishCardBannerProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress}>
      <LinearGradient
        colors={["#1E1B4B", "#312E81"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.arrowCircle}>
              <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>
        <View style={styles.cardPreview}>
          <LinearGradient
            colors={["#4338CA", "#6366F1"]}
            style={styles.cardGradient}
          >
            <View style={styles.cardLine} />
            <View style={[styles.cardLine, { width: 40 }]} />
          </LinearGradient>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: PhonePeColors.textSecondary,
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardPreview: {
    width: 80,
    height: 50,
    transform: [{ rotate: "-10deg" }],
  },
  cardGradient: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
    justifyContent: "flex-end",
  },
  cardLine: {
    height: 4,
    width: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    marginBottom: 4,
  },
});
