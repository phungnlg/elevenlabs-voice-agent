# ElevenLabs Voice Agent

React Native + Expo POC wrapping an ElevenLabs conversational AI agent with real-time voice communication.

## Tech Stack

- Expo SDK 54, React Native, TypeScript
- `@elevenlabs/react-native` - ElevenLabs Conversational AI SDK
- `@livekit/react-native` + `@livekit/react-native-webrtc` - WebRTC transport
- `react-native-reanimated` - Animations
- Expo Router - Navigation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set your ElevenLabs Agent ID in `constants/agent.ts`:
```ts
export const AGENT_ID = "your_agent_id_here";
```

Get your Agent ID from [ElevenLabs Agents Dashboard](https://elevenlabs.io/agents).

3. Build and run (Expo Go is NOT supported - native modules required):
```bash
npx expo prebuild
npx expo run:ios
# or
npx expo run:android
```

## Features

- Real-time voice conversations with ElevenLabs AI agents
- Cross-platform microphone permission handling
- Visual feedback: connection status badge, speaking/listening indicator
- Animated pulse effects using Reanimated
- Dark theme UI

## Project Structure

```
app/
  _layout.tsx              - Root layout with ConversationProvider
  index.tsx                - Main voice conversation screen
components/
  VoiceButton.tsx          - Start/stop button with pulse animation
  StatusBadge.tsx          - Connection status indicator
  AgentSpeakingIndicator.tsx - Speaking vs listening visual
hooks/
  usePermissions.ts        - Cross-platform mic permission
constants/
  agent.ts                 - Agent ID, colors, animation config
```

## Notes

- Requires Expo development builds (not Expo Go) due to native WebRTC modules
- `newArchEnabled` is set to `false` for LiveKit compatibility
- iOS microphone permission configured via `NSMicrophoneUsageDescription` in app.json
- Android uses `RECORD_AUDIO` permission with runtime request
