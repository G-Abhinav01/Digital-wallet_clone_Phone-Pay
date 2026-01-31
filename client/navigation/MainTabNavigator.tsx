import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import AlertsScreen from "@/screens/AlertsScreen";
import HistoryScreen from "@/screens/HistoryScreen";
import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  ScannerTab: undefined;
  AlertsTab: undefined;
  HistoryTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function ScannerPlaceholder() {
  return <View />;
}

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const rootNavigation = useNavigation<any>();

  const handleScannerPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    rootNavigation.navigate("Scanner");
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === "ScannerTab") {
            handleScannerPress();
            return;
          }

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === "ScannerTab") {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.scannerButton}
            >
              <View style={styles.scannerIconContainer}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={28}
                  color="#FFFFFF"
                />
              </View>
            </Pressable>
          );
        }

        let iconName: string;
        let IconComponent: any = Feather;
        let label = options.title || route.name;
        let badgeCount = 0;

        switch (route.name) {
          case "HomeTab":
            iconName = "home";
            label = "Home";
            break;
          case "SearchTab":
            iconName = "search";
            label = "Search";
            break;
          case "AlertsTab":
            iconName = "bell";
            label = "Alerts";
            badgeCount = 1;
            break;
          case "HistoryTab":
            iconName = "clock";
            label = "History";
            break;
          default:
            iconName = "circle";
        }

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <View style={styles.iconWrapper}>
              <IconComponent
                name={iconName}
                size={22}
                color={isFocused ? PhonePeColors.tabActive : PhonePeColors.tabInactive}
              />
              {badgeCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badgeCount}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.tabLabel,
                { color: isFocused ? PhonePeColors.tabActive : PhonePeColors.tabInactive },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="SearchTab" component={SearchScreen} />
      <Tab.Screen name="ScannerTab" component={ScannerPlaceholder} />
      <Tab.Screen name="AlertsTab" component={AlertsScreen} />
      <Tab.Screen name="HistoryTab" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: PhonePeColors.surface,
    borderTopWidth: 0,
    paddingTop: Spacing.sm,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xs,
  },
  iconWrapper: {
    position: "relative",
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "500",
  },
  scannerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  scannerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    backgroundColor: PhonePeColors.scannerPurple,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: PhonePeColors.background,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: PhonePeColors.alertBadge,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
});
