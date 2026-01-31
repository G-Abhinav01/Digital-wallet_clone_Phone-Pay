import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { PhonePeColors, BorderRadius } from "@/constants/theme";

interface ProfileAvatarProps {
  letter?: string;
  onPress?: () => void;
  size?: number;
}

export function ProfileAvatar({
  letter = "A",
  onPress,
  size = 44,
}: ProfileAvatarProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.avatar, { width: size, height: size }]}>
        <Text style={[styles.letter, { fontSize: size * 0.45 }]}>{letter}</Text>
        <View style={styles.qrBadge}>
          <MaterialCommunityIcons name="qrcode" size={12} color="#FFFFFF" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
  avatar: {
    backgroundColor: PhonePeColors.accentYellow,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  letter: {
    fontWeight: "700",
    color: "#000000",
  },
  qrBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: PhonePeColors.surfaceLight,
    borderRadius: 6,
    padding: 2,
  },
});
