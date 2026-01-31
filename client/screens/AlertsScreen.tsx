import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

interface Alert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "success" | "info" | "promo";
  read: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Payment Successful",
    message: "₹500 sent to John Doe successfully",
    time: "2 hours ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Cashback Received",
    message: "You received ₹25 cashback on your last recharge",
    time: "5 hours ago",
    type: "success",
    read: false,
  },
  {
    id: "3",
    title: "Bill Reminder",
    message: "Your electricity bill is due in 3 days",
    time: "1 day ago",
    type: "info",
    read: true,
  },
  {
    id: "4",
    title: "Special Offer",
    message: "Get 10% cashback on your next mobile recharge!",
    time: "2 days ago",
    type: "promo",
    read: true,
  },
  {
    id: "5",
    title: "Credit Score Updated",
    message: "Your credit score has been updated. Check now!",
    time: "3 days ago",
    type: "info",
    read: true,
  },
];

export default function AlertsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const getIconName = (type: string) => {
    switch (type) {
      case "success":
        return "check-circle";
      case "promo":
        return "tag";
      default:
        return "information";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "#22C55E";
      case "promo":
        return PhonePeColors.accentYellow;
      default:
        return PhonePeColors.primary;
    }
  };

  const handleAlertPress = (alert: Alert) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log("Alert pressed:", alert.title);
  };

  const renderAlert = ({ item }: { item: Alert }) => (
    <Pressable
      style={[styles.alertCard, !item.read && styles.unreadCard]}
      onPress={() => handleAlertPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(item.type)}20` }]}>
        <MaterialCommunityIcons
          name={getIconName(item.type) as any}
          size={24}
          color={getIconColor(item.type)}
        />
      </View>
      <View style={styles.alertContent}>
        <View style={styles.alertHeader}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          {!item.read ? <View style={styles.unreadDot} /> : null}
        </View>
        <Text style={styles.alertMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.alertTime}>{item.time}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Pressable>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </Pressable>
      </View>

      <FlatList
        data={mockAlerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: tabBarHeight + Spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  markAllRead: {
    fontSize: 14,
    color: PhonePeColors.primary,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
  },
  alertCard: {
    flexDirection: "row",
    backgroundColor: PhonePeColors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
  },
  unreadCard: {
    backgroundColor: PhonePeColors.surfaceLight,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.text,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PhonePeColors.primary,
  },
  alertMessage: {
    fontSize: 14,
    color: PhonePeColors.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: 12,
    color: PhonePeColors.textMuted,
    marginTop: Spacing.sm,
  },
  separator: {
    height: Spacing.md,
  },
});
