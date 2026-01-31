import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import ScannerScreen from "@/screens/ScannerScreen";
import AccountsScreen from "@/screens/AccountsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { PhonePeColors } from "@/constants/theme";

export type RootStackParamList = {
  Main: undefined;
  Scanner: undefined;
  Accounts: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerStyle: {
          backgroundColor: PhonePeColors.background,
        },
        headerTintColor: PhonePeColors.text,
        contentStyle: {
          backgroundColor: PhonePeColors.background,
        },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          headerTitle: "Bank Accounts",
          presentation: "modal",
          headerTransparent: true,
          headerBlurEffect: "dark",
        }}
      />
    </Stack.Navigator>
  );
}
