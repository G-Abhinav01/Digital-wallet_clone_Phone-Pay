import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  type: "debit" | "credit";
  status: "success" | "pending" | "failed";
  date: string;
  icon: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "John Doe",
    subtitle: "UPI Transfer",
    amount: "500.00",
    type: "debit",
    status: "success",
    date: "Today, 2:30 PM",
    icon: "account",
  },
  {
    id: "2",
    title: "Mobile Recharge",
    subtitle: "+91 98765 43210",
    amount: "299.00",
    type: "debit",
    status: "success",
    date: "Today, 11:15 AM",
    icon: "cellphone",
  },
  {
    id: "3",
    title: "Received from Jane",
    subtitle: "UPI Transfer",
    amount: "1,000.00",
    type: "credit",
    status: "success",
    date: "Yesterday, 6:45 PM",
    icon: "account",
  },
  {
    id: "4",
    title: "Electricity Bill",
    subtitle: "BESCOM",
    amount: "1,250.00",
    type: "debit",
    status: "success",
    date: "Yesterday, 10:00 AM",
    icon: "flash",
  },
  {
    id: "5",
    title: "Amazon Pay",
    subtitle: "Online Shopping",
    amount: "2,499.00",
    type: "debit",
    status: "pending",
    date: "22 Jan, 3:20 PM",
    icon: "shopping",
  },
  {
    id: "6",
    title: "Cashback",
    subtitle: "Recharge Reward",
    amount: "25.00",
    type: "credit",
    status: "success",
    date: "22 Jan, 11:30 AM",
    icon: "gift",
  },
];

const filterOptions = ["All", "Sent", "Received", "Recharges", "Bills"];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [activeFilter, setActiveFilter] = useState("All");

  const handleTransactionPress = (transaction: Transaction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Transaction pressed:", transaction.title);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "#22C55E";
      case "pending":
        return PhonePeColors.accentYellow;
      case "failed":
        return "#EF4444";
      default:
        return PhonePeColors.textSecondary;
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <Pressable
      style={styles.transactionCard}
      onPress={() => handleTransactionPress(item)}
    >
      <View style={styles.transactionIcon}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={PhonePeColors.text}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
        <View style={styles.transactionMeta}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.type === "credit" ? styles.creditAmount : styles.debitAmount,
        ]}
      >
        {item.type === "credit" ? "+" : "-"} ₹{item.amount}
      </Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Pressable style={styles.searchButton}>
          <Feather name="search" size={22} color={PhonePeColors.text} />
        </Pressable>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          data={filterOptions}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.filterChip,
                activeFilter === item && styles.activeFilterChip,
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveFilter(item);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={mockTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBarHeight + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="history"
              size={64}
              color={PhonePeColors.textMuted}
            />
            <Text style={styles.emptyTitle}>No transactions yet</Text>
            <Text style={styles.emptySubtitle}>
              Your payment history will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PhonePeColors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: PhonePeColors.text,
  },
  searchButton: {
    padding: Spacing.sm,
  },
  filtersContainer: {
    marginBottom: Spacing.md,
  },
  filtersList: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: PhonePeColors.surface,
    marginRight: Spacing.sm,
  },
  activeFilterChip: {
    backgroundColor: PhonePeColors.primary,
  },
  filterText: {
    fontSize: 14,
    color: PhonePeColors.textSecondary,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PhonePeColors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PhonePeColors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  transactionSubtitle: {
    fontSize: 13,
    color: PhonePeColors.textSecondary,
    marginTop: 2,
  },
  transactionMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  transactionDate: {
    fontSize: 12,
    color: PhonePeColors.textMuted,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: Spacing.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  creditAmount: {
    color: "#22C55E",
  },
  debitAmount: {
    color: PhonePeColors.text,
  },
  separator: {
    height: Spacing.md,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: PhonePeColors.text,
    marginTop: Spacing.lg,
  },
  emptySubtitle: {
    fontSize: 14,
    color: PhonePeColors.textSecondary,
    marginTop: Spacing.sm,
  },
});
