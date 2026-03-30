import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useConversationStatus } from "@elevenlabs/react-native";
import { Colors, Animation } from "../constants/agent";

const statusConfig = {
  disconnected: { label: "Ready", color: Colors.textSecondary },
  connecting: { label: "Connecting...", color: Colors.warning },
  connected: { label: "Connected", color: Colors.success },
  error: { label: "Error", color: Colors.error },
} as const;

export function StatusBadge() {
  const { status } = useConversationStatus();
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { borderColor: config.color }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.surface,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
