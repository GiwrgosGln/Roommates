import { Text, View } from "@/components/StyledComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logout from "@/components/auth/Logout";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Settings() {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryBackground }}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 20, color: primaryText }}>Settings</Text>
        <ThemeToggle />
        <Logout />
      </View>
    </SafeAreaView>
  );
}
