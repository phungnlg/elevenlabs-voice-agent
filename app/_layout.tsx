import { Stack } from "expo-router";
import { ConversationProvider } from "@elevenlabs/react-native";
import { AGENT_ID } from "../constants/agent";

export default function RootLayout() {
  return (
    <ConversationProvider agentId={AGENT_ID}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0F0F1A" },
        }}
      />
    </ConversationProvider>
  );
}
