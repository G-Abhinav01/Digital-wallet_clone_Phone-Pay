import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ActionTile } from "./ActionTile";
import { Spacing } from "@/constants/theme";

interface QuickAction {
  icon: string;
  label: string;
  iconLibrary?: "feather" | "material" | "ionicons";
  iconColor?: string;
  backgroundColor?: string;
  badge?: string;
  onPress?: () => void;
}

interface QuickActionRowProps {
  actions: QuickAction[];
  scrollable?: boolean;
}

export function QuickActionRow({ actions, scrollable = false }: QuickActionRowProps) {
  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {actions.map((action, index) => (
          <ActionTile
            key={index}
            icon={action.icon}
            label={action.label}
            iconLibrary={action.iconLibrary}
            iconColor={action.iconColor}
            backgroundColor={action.backgroundColor}
            badge={action.badge}
            onPress={action.onPress}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <ActionTile
          key={index}
          icon={action.icon}
          label={action.label}
          iconLibrary={action.iconLibrary}
          iconColor={action.iconColor}
          backgroundColor={action.backgroundColor}
          badge={action.badge}
          onPress={action.onPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: Spacing.sm,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
});
