import React, { useEffect } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import {
  useConversationControls,
  useConversationStatus,
} from "@elevenlabs/react-native";
import { usePermissions } from "../hooks/usePermissions";
import { Colors, Animation } from "../constants/agent";

export function VoiceButton() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { requestMicPermission } = usePermissions();
  const pulseScale = useSharedValue(1);

  const isActive = status === "connected";
  const isConnecting = status === "connecting";

  useEffect(() => {
    if (isActive) {
      pulseScale.value = withRepeat(
        withTiming(1.15, {
          duration: Animation.pulseDuration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    } else {
      cancelAnimation(pulseScale);
      pulseScale.value = withTiming(1, { duration: 200 });
    }
  }, [isActive, pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handlePress = async () => {
    if (isConnecting) return;

    if (isActive) {
      await endSession();
      return;
    }

    const hasPermission = await requestMicPermission();
    if (!hasPermission) return;

    await startSession({
      onConnect: ({ conversationId }) => {
        console.log("Connected:", conversationId);
      },
      onError: (message) => {
        console.error("Conversation error:", message);
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      {isActive && (
        <Animated.View style={[styles.pulseRing, pulseStyle]} />
      )}
      <Pressable
        onPress={handlePress}
        disabled={isConnecting}
        style={({ pressed }) => [
          styles.button,
          isActive && styles.buttonActive,
          isConnecting && styles.buttonConnecting,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.icon}>{isActive ? "■" : "🎤"}</Text>
        <Text style={styles.label}>
          {isConnecting
            ? "Connecting..."
            : isActive
              ? "End Session"
              : "Start Conversation"}
        </Text>
      </Pressable>
    </View>
  );
}

const BUTTON_SIZE = 140;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: BUTTON_SIZE * 1.4,
    height: BUTTON_SIZE * 1.4,
  },
  pulseRing: {
    position: "absolute",
    width: BUTTON_SIZE + 20,
    height: BUTTON_SIZE + 20,
    borderRadius: (BUTTON_SIZE + 20) / 2,
    borderWidth: 2,
    borderColor: Colors.primary,
    opacity: 0.5,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonConnecting: {
    borderColor: Colors.warning,
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  icon: {
    fontSize: 32,
    marginBottom: 4,
  },
  label: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
