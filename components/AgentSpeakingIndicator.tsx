import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import { useConversationMode } from "@elevenlabs/react-native";
import { Colors, Animation } from "../constants/agent";

export function AgentSpeakingIndicator() {
  const { isSpeaking } = useConversationMode();
  const glowScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (isSpeaking) {
      glowScale.value = withRepeat(
        withTiming(1.4, {
          duration: Animation.glowDuration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
      glowOpacity.value = withRepeat(
        withTiming(0.8, {
          duration: Animation.glowDuration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    } else {
      cancelAnimation(glowScale);
      cancelAnimation(glowOpacity);
      glowScale.value = withTiming(1, { duration: 300 });
      glowOpacity.value = withTiming(0.3, { duration: 300 });
    }
  }, [isSpeaking, glowScale, glowOpacity]);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.orbWrapper}>
        <Animated.View style={[styles.glow, animatedGlowStyle]} />
        <View
          style={[
            styles.orb,
            { backgroundColor: isSpeaking ? Colors.primary : Colors.primaryDim },
          ]}
        />
      </View>
      <Text style={styles.label}>
        {isSpeaking ? "Agent Speaking" : "Listening"}
      </Text>
    </View>
  );
}

const ORB_SIZE = 120;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  orbWrapper: {
    width: ORB_SIZE * 1.8,
    height: ORB_SIZE * 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: ORB_SIZE * 1.5,
    height: ORB_SIZE * 1.5,
    borderRadius: (ORB_SIZE * 1.5) / 2,
    backgroundColor: Colors.primary,
  },
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
});
