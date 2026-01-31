import React, { useCallback } from "react";
import { ScrollView, View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ProfileAvatar } from "@/components/ProfileAvatar";
import { SectionHeader } from "@/components/SectionHeader";
import { QuickActionRow } from "@/components/QuickActionRow";
import { PromoBanner } from "@/components/PromoBanner";
import { WishCardBanner } from "@/components/WishCardBanner";
import { ETFCard } from "@/components/ETFCard";
import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

const showAlert = (title: string) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  Alert.alert(title, `${title} feature coming soon!`);
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();

  const openScanner = useCallback(() => {
    navigation.navigate("Scanner");
  }, [navigation]);

  const openAccounts = useCallback(() => {
    navigation.navigate("Accounts");
  }, [navigation]);

  const moneyTransferActions = [
    { icon: "phone-call", label: "To Mobile\nNumber", iconLibrary: "feather" as const, backgroundColor: PhonePeColors.iconPurple, onPress: () => showAlert("To Mobile Number") },
    { icon: "bank", label: "To Bank &\nSelf A/c", iconLibrary: "material" as const, backgroundColor: PhonePeColors.iconPurple, onPress: () => showAlert("To Bank") },
    { icon: "download", label: "Receive\nMoney", iconLibrary: "feather" as const, backgroundColor: PhonePeColors.iconPurple, onPress: () => showAlert("Receive Money") },
    { icon: "currency-inr", label: "Check\nBalance", iconLibrary: "material" as const, backgroundColor: PhonePeColors.iconPurple, onPress: openAccounts },
  ];

  const rechargeActions = [
    { icon: "cellphone", label: "Mobile\nRecharge", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("Mobile Recharge") },
    { icon: "car", label: "Fastag\nRecharge", iconLibrary: "material" as const, backgroundColor: "#3B82F6", badge: "FASTag", onPress: () => showAlert("FASTag Recharge") },
    { icon: "lightbulb-on", label: "Electricity\nBill", iconLibrary: "material" as const, backgroundColor: "#FBBF24", onPress: () => showAlert("Electricity Bill") },
    { icon: "calendar-check", label: "Loan\nRepayment", iconLibrary: "material" as const, backgroundColor: "#A78BFA", onPress: () => showAlert("Loan Repayment") },
  ];

  const loanActions = [
    { icon: "account-cash", label: "Personal\nLoan", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Personal Loan") },
    { icon: "chart-line", label: "Mutual\nFunds Loan", iconLibrary: "material" as const, backgroundColor: "#22D3D8", onPress: () => showAlert("Mutual Funds Loan") },
    { icon: "gold", label: "Gold\nLoan", iconLibrary: "material" as const, backgroundColor: "#FBBF24", onPress: () => showAlert("Gold Loan") },
    { icon: "credit-card-check", label: "Credit\nScore", iconLibrary: "material" as const, backgroundColor: "#EF4444", badge: "FREE", onPress: () => showAlert("Credit Score") },
  ];

  const goldSilverActions = [
    { icon: "gold", label: "Buy\nGold", iconLibrary: "material" as const, backgroundColor: "#FBBF24", badge: "24K", onPress: () => showAlert("Buy Gold") },
    { icon: "piggy-bank", label: "Daily Gold\nSavings", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Daily Gold Savings") },
    { icon: "diamond-stone", label: "Buy\nSilver", iconLibrary: "material" as const, backgroundColor: "#9CA3AF", onPress: () => showAlert("Buy Silver") },
    { icon: "cash-multiple", label: "Daily Silver\nSavings", iconLibrary: "material" as const, backgroundColor: "#EC4899", onPress: () => showAlert("Daily Silver Savings") },
  ];

  const insuranceActions = [
    { icon: "motorbike", label: "Bike", iconLibrary: "material" as const, backgroundColor: PhonePeColors.surfaceLight, onPress: () => showAlert("Bike Insurance") },
    { icon: "car", label: "Car", iconLibrary: "material" as const, backgroundColor: "#3B82F6", onPress: () => showAlert("Car Insurance") },
    { icon: "medical-bag", label: "Health", iconLibrary: "material" as const, backgroundColor: "#EF4444", onPress: () => showAlert("Health Insurance") },
    { icon: "umbrella", label: "Life", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("Life Insurance") },
  ];

  const mutualFundActions = [
    { icon: "trophy-award", label: "Best SIP\nFunds", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Best SIP Funds") },
    { icon: "trending-up", label: "High Growth\nFunds", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("High Growth Funds") },
    { icon: "chart-bar", label: "Top\nCompanies", iconLibrary: "material" as const, backgroundColor: PhonePeColors.iconPurple, onPress: () => showAlert("Top Companies") },
    { icon: "cash", label: "Daily SIP\nwith ₹10", iconLibrary: "material" as const, backgroundColor: "#EC4899", onPress: () => showAlert("Daily SIP") },
  ];

  const travelActions = [
    { icon: "airplane", label: "Flight", iconLibrary: "material" as const, backgroundColor: PhonePeColors.surfaceLight, onPress: () => showAlert("Flight Booking") },
    { icon: "bus", label: "Bus", iconLibrary: "material" as const, backgroundColor: "#EF4444", onPress: () => showAlert("Bus Booking") },
    { icon: "train", label: "Train", iconLibrary: "material" as const, backgroundColor: "#3B82F6", onPress: () => showAlert("Train Booking") },
    { icon: "office-building", label: "Hotel", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Hotel Booking") },
  ];

  const managePaymentsActions = [
    { icon: "wallet", label: "Wallet", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Wallet") },
    { icon: "credit-card", label: "Wish Credit\nCard", iconLibrary: "material" as const, backgroundColor: PhonePeColors.iconPurple, onPress: () => showAlert("Wish Credit Card") },
    { icon: "credit-card-outline", label: "PhonePe\nHDFC card", iconLibrary: "material" as const, backgroundColor: "#3B82F6", onPress: () => showAlert("HDFC Card") },
    { icon: "credit-card-plus", label: "PhonePe\nSBI card", iconLibrary: "material" as const, backgroundColor: "#22C55E", badge: "Save 10%", onPress: () => showAlert("SBI Card") },
  ];

  const chatGPTActions = [
    { icon: "message-question", label: "Ask Me\nAnything", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("Ask Me Anything") },
    { icon: "image-plus", label: "Create Any\nImage", iconLibrary: "material" as const, backgroundColor: "#3B82F6", onPress: () => showAlert("Create Image") },
    { icon: "lightbulb-on", label: "Learn With\nChatGPT", iconLibrary: "material" as const, backgroundColor: "#FBBF24", onPress: () => showAlert("Learn with ChatGPT") },
    { icon: "food-apple", label: "Get Healthy\nRecipes", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("Healthy Recipes") },
  ];

  const chatGPTActions2 = [
    { icon: "calculator", label: "Plan My\nBudget", iconLibrary: "material" as const, backgroundColor: "#22C55E", onPress: () => showAlert("Plan Budget") },
    { icon: "star-circle", label: "Know Your\nAstrology", iconLibrary: "material" as const, backgroundColor: "#F97316", onPress: () => showAlert("Astrology") },
    { icon: "pencil", label: "Write\nAnything", iconLibrary: "material" as const, backgroundColor: "#EF4444", onPress: () => showAlert("Write Anything") },
    { icon: "airplane-takeoff", label: "Plan My\nVacation", iconLibrary: "material" as const, backgroundColor: PhonePeColors.surfaceLight, onPress: () => showAlert("Plan Vacation") },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <ProfileAvatar letter="A" onPress={openAccounts} />
        <View style={styles.headerRight}>
          <Pressable onPress={() => showAlert("Help")} style={styles.headerIcon}>
            <Feather name="help-circle" size={24} color={PhonePeColors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + Spacing["2xl"] }]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Money Transfers" />
        <QuickActionRow actions={moneyTransferActions} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
          <Pressable style={styles.promoPill} onPress={() => showAlert("Refer & Earn")}>
            <MaterialCommunityIcons name="currency-inr" size={16} color={PhonePeColors.accentYellow} />
            <Text style={styles.promoPillText}>Refer → ₹200</Text>
          </Pressable>
          <Pressable style={styles.promoPill} onPress={() => showAlert("Credit Score")}>
            <MaterialCommunityIcons name="shield-check" size={16} color="#22C55E" />
            <Text style={styles.promoPillText}>Get FREE credit score</Text>
          </Pressable>
        </ScrollView>

        <SectionHeader title="Recharge & Bills" />
        <QuickActionRow actions={rechargeActions} />
        <PromoBanner text="Get Free SIM delivery!" icon="sim" iconColor="#EF4444" />

        <SectionHeader title="Loans" />
        <QuickActionRow actions={loanActions} />
        <PromoBanner text="Mutual Fund loan @ 10% p.a." icon="currency-inr" iconColor="#22C55E" />

        <SectionHeader title="Gold & Silver" />
        <QuickActionRow actions={goldSilverActions} />
        <PromoBanner text="Start savings in Gold at ₹10" icon="gold" iconColor="#FBBF24" />

        <WishCardBanner
          title="Wish Card has 100% approval*"
          subtitle="Did you know?"
        />

        <SectionHeader title="Insurance" />
        <QuickActionRow actions={insuranceActions} />
        <PromoBanner text="Get dedicated claims support" icon="headset" iconColor={PhonePeColors.accentYellow} />

        <SectionHeader title="Mutual Funds" />
        <QuickActionRow actions={mutualFundActions} />
        <PromoBanner text="Find the right fund" icon="calculator" iconColor={PhonePeColors.accentYellow} />

        <SectionHeader title="Travel & Transit" />
        <QuickActionRow actions={travelActions} />
        <PromoBanner text="Save upto ₹500 on Bus" icon="bus" iconColor="#EF4444" />

        <SectionHeader title="Manage Payments" showMore moreText="View All" onMorePress={() => showAlert("View All Payments")} />
        <QuickActionRow actions={managePaymentsActions} />

        <SectionHeader title="Rewards" showMore moreText="View All" onMorePress={() => showAlert("View All Rewards")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rewardsScroll}>
          <View style={styles.rewardCard}>
            <View style={[styles.rewardIconBg, { backgroundColor: "#1a1a1a" }]}>
              <MaterialCommunityIcons name="music" size={32} color="#22C55E" />
            </View>
            <Text style={styles.rewardTitle}>JioSaavn</Text>
            <Text style={styles.rewardDesc}>30 day Free Trial of Pro Subscription*</Text>
          </View>
          <View style={styles.rewardCard}>
            <View style={[styles.rewardIconBg, { backgroundColor: "#7C3AED" }]}>
              <MaterialCommunityIcons name="television-play" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.rewardTitle}>Story Tv</Text>
            <Text style={styles.rewardDesc}>Claim Your ₹1 Trial Now Watch Unlimit...</Text>
          </View>
        </ScrollView>

        <View style={styles.shareMarketSection}>
          <Text style={styles.shareMarketTitle}>Looking for stocks or ETFs? Find both on</Text>
          <Text style={styles.shareMarketBrand}>share<Text style={styles.dotGreen}>.</Text>market</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.etfScroll}>
            <ETFCard name="NIFTYBEES ETF" price="286.28" />
            <ETFCard name="SILVERBEES ETF" price="297.62" iconColor="#9CA3AF" />
          </ScrollView>

          <Pressable style={styles.exploreButton} onPress={() => showAlert("Share.Market")}>
            <Text style={styles.exploreText}>Explore Share.Market</Text>
            <View style={styles.exploreArrow}>
              <Feather name="arrow-right" size={16} color="#FFFFFF" />
            </View>
          </Pressable>

          <Text style={styles.disclaimer}>
            Investments in securities market are subject to market risks, read all the related documents carefully before investing. The securities are quoted as an example and not as a recommendation. Kindly refer to https://share.market/ for more details.
          </Text>
        </View>

        <SectionHeader title="Explore with ChatGPT" />
        <QuickActionRow actions={chatGPTActions} />
        <QuickActionRow actions={chatGPTActions2} />

        <View style={styles.myQRSection}>
          <Text style={styles.myQRTitle}>MY QR</Text>
          <Text style={styles.myQRSubtitle}>Receive money</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  headerIcon: {
    padding: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.md,
  },
  promoScroll: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  promoPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PhonePeColors.surfaceLight,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
    gap: Spacing.xs,
  },
  promoPillText: {
    color: PhonePeColors.text,
    fontSize: 13,
    fontWeight: "500",
  },
  rewardsScroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  rewardCard: {
    width: 160,
    backgroundColor: PhonePeColors.surface,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginRight: Spacing.md,
  },
  rewardIconBg: {
    width: "100%",
    height: 80,
    borderRadius: BorderRadius.xs,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: PhonePeColors.text,
    marginBottom: 4,
  },
  rewardDesc: {
    fontSize: 12,
    color: PhonePeColors.textSecondary,
    lineHeight: 16,
  },
  shareMarketSection: {
    backgroundColor: PhonePeColors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  shareMarketTitle: {
    fontSize: 16,
    color: PhonePeColors.text,
    marginBottom: 4,
  },
  shareMarketBrand: {
    fontSize: 18,
    fontWeight: "700",
    color: PhonePeColors.text,
    marginBottom: Spacing.lg,
  },
  dotGreen: {
    color: "#22C55E",
  },
  etfScroll: {
    marginBottom: Spacing.lg,
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  exploreText: {
    fontSize: 16,
    color: PhonePeColors.primary,
    fontWeight: "600",
  },
  exploreArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PhonePeColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimer: {
    fontSize: 11,
    color: PhonePeColors.textMuted,
    lineHeight: 16,
  },
  myQRSection: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    opacity: 0.5,
  },
  myQRTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: PhonePeColors.textSecondary,
  },
  myQRSubtitle: {
    fontSize: 12,
    color: PhonePeColors.textMuted,
  },
});
