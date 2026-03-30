import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StatusBadge } from "../components/StatusBadge";
import { AgentSpeakingIndicator } from "../components/AgentSpeakingIndicator";
import { VoiceButton } from "../components/VoiceButton";
import { Colors } from "../constants/agent";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title}>Voice Agent</Text>
        <StatusBadge />
      </View>

      <View style={styles.center}>
        <AgentSpeakingIndicator />
      </View>

      <View style={styles.footer}>
        <VoiceButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 40,
  },
});
