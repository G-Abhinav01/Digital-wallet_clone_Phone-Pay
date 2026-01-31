import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface ETFCardProps {
  name: string;
  price: string;
  iconColor?: string;
  onPress?: () => void;
}

export function ETFCard({
  name,
  price,
  iconColor = "#9CA3AF",
  onPress,
}: ETFCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: PhonePeColors.surface }]}>
        <MaterialCommunityIcons name="chart-line" size={24} color={iconColor} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.label}>Previous closing price</Text>
      <Text style={styles.price}>{price}</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>View ETF Details</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: PhonePeColors.background,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: PhonePeColors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: PhonePeColors.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: PhonePeColors.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: PhonePeColors.text,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  button: {
    backgroundColor: PhonePeColors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
