import { useCallback, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";

export function usePermissions() {
  const [granted, setGranted] = useState(false);

  const requestMicPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === "ios") {
      // iOS permission is handled via Info.plist prompt automatically
      setGranted(true);
      return true;
    }

    if (Platform.OS === "android") {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message:
            "This app needs microphone access for voice conversations.",
          buttonPositive: "Allow",
          buttonNegative: "Deny",
        }
      );
      const isGranted = result === PermissionsAndroid.RESULTS.GRANTED;
      setGranted(isGranted);
      return isGranted;
    }

    return false;
  }, []);

  return { granted, requestMicPermission };
}
