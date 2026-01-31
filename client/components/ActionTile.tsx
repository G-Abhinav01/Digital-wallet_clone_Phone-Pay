import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

type IconLibrary = "feather" | "material" | "ionicons";

interface ActionTileProps {
  icon: string;
  label: string;
  iconLibrary?: IconLibrary;
  iconColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
  badge?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ActionTile({
  icon,
  label,
  iconLibrary = "feather",
  iconColor = "#FFFFFF",
  backgroundColor = PhonePeColors.iconPurple,
  onPress,
  badge,
}: ActionTileProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const renderIcon = () => {
    const iconSize = 28;
    switch (iconLibrary) {
      case "material":
        return (
          <MaterialCommunityIcons
            name={icon as any}
            size={iconSize}
            color={iconColor}
          />
        );
      case "ionicons":
        return <Ionicons name={icon as any} size={iconSize} color={iconColor} />;
      default:
        return <Feather name={icon as any} size={iconSize} color={iconColor} />;
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <View style={[styles.iconContainer, { backgroundColor }]}>
        {renderIcon()}
        {badge ? (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 80,
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
    position: "relative",
  },
  label: {
    fontSize: 11,
    color: PhonePeColors.text,
    textAlign: "center",
    lineHeight: 14,
  },
  badgeContainer: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: PhonePeColors.error,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "600",
  },
});
