import React from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { BankAccountCard } from "@/components/BankAccountCard";
import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

const mockAccounts = [
  {
    id: "1",
    bankName: "HDFC Bank",
    accountNumber: "4521",
    balance: "₹25,430.00",
    isPrimary: true,
  },
  {
    id: "2",
    bankName: "State Bank of India",
    accountNumber: "7823",
    balance: "₹12,150.00",
    isPrimary: false,
  },
  {
    id: "3",
    bankName: "ICICI Bank",
    accountNumber: "3456",
    balance: "₹8,900.00",
    isPrimary: false,
  },
];

export default function AccountsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  const handleAccountPress = (account: typeof mockAccounts[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Account pressed:", account.bankName);
  };

  const handleAddAccount = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Add account pressed");
  };

  const totalBalance = mockAccounts.reduce((sum, acc) => {
    const amount = parseFloat(acc.balance.replace(/[₹,]/g, ""));
    return sum + amount;
  }, 0);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: insets.bottom + Spacing.xl 
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </Text>
          <Text style={styles.balanceSubtext}>
            Across {mockAccounts.length} linked accounts
          </Text>
        </View>

        <View style={styles.quickActions}>
          <Pressable style={styles.quickAction} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons name="bank-transfer" size={24} color={PhonePeColors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Transfer</Text>
          </Pressable>
          <Pressable style={styles.quickAction} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color={PhonePeColors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Receive</Text>
          </Pressable>
          <Pressable style={styles.quickAction} onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
            <View style={styles.quickActionIcon}>
              <MaterialCommunityIcons name="file-document-outline" size={24} color={PhonePeColors.primary} />
            </View>
            <Text style={styles.quickActionLabel}>Statement</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
          <Pressable onPress={handleAddAccount}>
            <Feather name="plus-circle" size={22} color={PhonePeColors.primary} />
          </Pressable>
        </View>

        {mockAccounts.map((account) => (
          <BankAccountCard
            key={account.id}
            bankName={account.bankName}
            accountNumber={account.accountNumber}
            balance={account.balance}
            isPrimary={account.isPrimary}
            onPress={() => handleAccountPress(account)}
          />
        ))}

        <Pressable style={styles.addAccountButton} onPress={handleAddAccount}>
          <Feather name="plus" size={20} color={PhonePeColors.primary} />
          <Text style={styles.addAccountText}>Add Bank Account</Text>
        </Pressable>

        <View style={styles.securityNote}>
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color={PhonePeColors.textMuted}
          />
          <Text style={styles.securityText}>
            Your bank accounts are secured with 256-bit encryption
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PhonePeColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  balanceCard: {
    backgroundColor: PhonePeColors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  balanceSubtext: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: Spacing.sm,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.xl,
  },
  quickAction: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PhonePeColors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    fontSize: 12,
    color: PhonePeColors.text,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  addAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PhonePeColors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: PhonePeColors.primary,
    borderStyle: "dashed",
  },
  addAccountText: {
    fontSize: 16,
    color: PhonePeColors.primary,
    fontWeight: "500",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  securityText: {
    fontSize: 12,
    color: PhonePeColors.textMuted,
    textAlign: "center",
  },
});
