import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedStatusBar() {
  const [primaryBackground] = [useThemeColor({}, "primaryBackground")];

  return <StatusBar backgroundColor={primaryBackground} />;
}
