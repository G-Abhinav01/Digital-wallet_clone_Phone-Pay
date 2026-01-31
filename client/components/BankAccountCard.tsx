import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface BankAccountCardProps {
  bankName: string;
  accountNumber: string;
  balance: string;
  isPrimary?: boolean;
  onPress?: () => void;
}

export function BankAccountCard({
  bankName,
  accountNumber,
  balance,
  isPrimary = false,
  onPress,
}: BankAccountCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="bank" size={28} color={PhonePeColors.primary} />
      </View>
      <View style={styles.details}>
        <View style={styles.headerRow}>
          <Text style={styles.bankName}>{bankName}</Text>
          {isPrimary ? (
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryText}>Primary</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.accountNumber}>
          Account ending in {accountNumber}
        </Text>
        <Text style={styles.balance}>Balance: {balance}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={PhonePeColors.textMuted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PhonePeColors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.xs,
    backgroundColor: PhonePeColors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  details: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  primaryBadge: {
    backgroundColor: PhonePeColors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  primaryText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  accountNumber: {
    fontSize: 13,
    color: PhonePeColors.textSecondary,
    marginTop: 2,
  },
  balance: {
    fontSize: 14,
    color: PhonePeColors.text,
    fontWeight: "500",
    marginTop: 4,
  },
});
