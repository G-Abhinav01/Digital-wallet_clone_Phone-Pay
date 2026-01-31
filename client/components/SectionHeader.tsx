import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { PhonePeColors, Spacing } from "@/constants/theme";

interface SectionHeaderProps {
  title: string;
  showMore?: boolean;
  onMorePress?: () => void;
  moreText?: string;
}

export function SectionHeader({
  title,
  showMore = false,
  onMorePress,
  moreText = "More",
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showMore ? (
        <Pressable onPress={onMorePress} style={styles.moreButton}>
          <Text style={styles.moreText}>{moreText}</Text>
          <Feather name="arrow-right" size={16} color={PhonePeColors.accentYellow} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  moreButton: {
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
