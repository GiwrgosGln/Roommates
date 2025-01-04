import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedStatusBar() {
  const backgroundColor = useThemeColor({}, "background");
  const style = useThemeColor({}, "text") === "#ECEDEE" ? "light" : "dark";

  return <StatusBar style={style} backgroundColor={backgroundColor} />;
}
