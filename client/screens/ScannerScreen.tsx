import React from "react";
import { View, StyleSheet, Text, Pressable, Dimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

import { PhonePeColors, Spacing, BorderRadius } from "@/constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SCANNER_SIZE = SCREEN_WIDTH * 0.7;

const quickActions = [
  { icon: "flash", label: "Flashlight" },
  { icon: "image", label: "Gallery" },
  { icon: "file-document-outline", label: "Pay Bills" },
  { icon: "history", label: "History" },
];

export default function ScannerScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const scanLinePosition = useSharedValue(0);

  React.useEffect(() => {
    scanLinePosition.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => ({
    top: scanLinePosition.value * (SCANNER_SIZE - 4),
  }));

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleQuickAction = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log(`${label} pressed`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Feather name="x" size={28} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Scan any QR code to pay</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.cameraContainer}>
        <View style={styles.cameraPreview}>
          <View style={styles.scannerFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            <Animated.View style={[styles.scanLine, scanLineStyle]}>
              <LinearGradient
                colors={["transparent", PhonePeColors.primary, "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scanLineGradient}
              />
            </Animated.View>
          </View>

          <View style={styles.cameraPlaceholder}>
            <MaterialCommunityIcons
              name="camera"
              size={64}
              color={PhonePeColors.textMuted}
            />
            <Text style={styles.cameraPlaceholderText}>
              {Platform.OS === "web" 
                ? "Camera not available on web\nOpen in Expo Go to scan QR codes"
                : "Point camera at QR code"}
            </Text>
          </View>
        </View>

        <Text style={styles.instructionText}>
          Point the camera at any UPI QR code
        </Text>
      </View>

      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + Spacing.lg }]}>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <Pressable
              key={index}
              style={styles.quickActionButton}
              onPress={() => handleQuickAction(action.label)}
            >
              <View style={styles.quickActionIcon}>
                <MaterialCommunityIcons
                  name={action.icon as any}
                  size={24}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.upiSection}>
          <View style={styles.upiLogo}>
            <Text style={styles.upiText}>UPI</Text>
          </View>
          <Text style={styles.upiSubtext}>Powered by NPCI</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 44,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPreview: {
    width: SCANNER_SIZE,
    height: SCANNER_SIZE,
    position: "relative",
  },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PhonePeColors.surface,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPlaceholderText: {
    fontSize: 14,
    color: PhonePeColors.textMuted,
    textAlign: "center",
    marginTop: Spacing.md,
    lineHeight: 20,
  },
  scannerFrame: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: PhonePeColors.primary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  scanLine: {
    position: "absolute",
    left: 10,
    right: 10,
    height: 2,
  },
  scanLineGradient: {
    flex: 1,
  },
  instructionText: {
    fontSize: 14,
    color: PhonePeColors.textSecondary,
    marginTop: Spacing.xl,
  },
  bottomSection: {
    paddingHorizontal: Spacing.lg,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Spacing.xl,
  },
  quickActionButton: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PhonePeColors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  quickActionLabel: {
    fontSize: 11,
    color: PhonePeColors.textSecondary,
  },
  upiSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  upiLogo: {
    backgroundColor: "#097939",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  upiText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  upiSubtext: {
    fontSize: 12,
    color: PhonePeColors.textMuted,
  },
});
