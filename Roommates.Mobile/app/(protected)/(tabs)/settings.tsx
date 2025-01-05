import { Text, View } from "@/components/StyledComponents";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logout from "@/components/auth/Logout";

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 20 }}>Settings</Text>
        <ThemeToggle />
        <Logout />
      </View>
    </SafeAreaView>
  );
}
