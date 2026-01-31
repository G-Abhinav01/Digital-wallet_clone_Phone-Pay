import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

const recentSearches = [
  "Mobile Recharge",
  "Electricity Bill",
  "DTH Recharge",
  "Gas Bill",
];

const popularServices = [
  { icon: "cellphone", label: "Mobile Recharge" },
  { icon: "flash", label: "Electricity" },
  { icon: "television", label: "DTH" },
  { icon: "gas-cylinder", label: "Gas" },
  { icon: "water", label: "Water" },
  { icon: "credit-card", label: "Credit Card" },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchText, setSearchText] = useState("");

  const handleServicePress = (service: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSearchText(service);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.md }]}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={PhonePeColors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for bills, recharges & more"
          placeholderTextColor={PhonePeColors.textMuted}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        {searchText.length > 0 ? (
          <Pressable onPress={() => setSearchText("")}>
            <Feather name="x" size={20} color={PhonePeColors.textMuted} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {searchText.length === 0 ? (
          <>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentList}>
              {recentSearches.map((search, index) => (
                <Pressable
                  key={index}
                  style={styles.recentItem}
                  onPress={() => handleServicePress(search)}
                >
                  <Feather name="clock" size={16} color={PhonePeColors.textMuted} />
                  <Text style={styles.recentText}>{search}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Popular Services</Text>
            <View style={styles.servicesGrid}>
              {popularServices.map((service, index) => (
                <Pressable
                  key={index}
                  style={styles.serviceItem}
                  onPress={() => handleServicePress(service.label)}
                >
                  <View style={styles.serviceIcon}>
                    <MaterialCommunityIcons
                      name={service.icon as any}
                      size={24}
                      color={PhonePeColors.iconPurple}
                    />
                  </View>
                  <Text style={styles.serviceLabel}>{service.label}</Text>
                </Pressable>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.noResults}>
            <MaterialCommunityIcons
              name="magnify"
              size={64}
              color={PhonePeColors.textMuted}
            />
            <Text style={styles.noResultsTitle}>Search for "{searchText}"</Text>
            <Text style={styles.noResultsSubtitle}>
              Find bills, recharges, and payment services
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PhonePeColors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PhonePeColors.surface,
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    height: 48,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: PhonePeColors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: PhonePeColors.textSecondary,
    marginBottom: Spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  recentList: {
    marginBottom: Spacing.xl,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: PhonePeColors.border,
  },
  recentText: {
    fontSize: 16,
    color: PhonePeColors.text,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.lg,
  },
  serviceItem: {
    width: "30%",
    alignItems: "center",
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: PhonePeColors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  serviceLabel: {
    fontSize: 12,
    color: PhonePeColors.text,
    textAlign: "center",
  },
  noResults: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: PhonePeColors.text,
    marginTop: Spacing.lg,
  },
  noResultsSubtitle: {
    fontSize: 14,
    color: PhonePeColors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: "center",
  },
});
