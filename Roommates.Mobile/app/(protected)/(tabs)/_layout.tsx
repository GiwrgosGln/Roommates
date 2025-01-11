import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  const [secondaryBackgroundColor, secondaryTextColor] = [
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "secondaryText"),
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: secondaryBackgroundColor,
        tabBarInactiveTintColor: secondaryTextColor,
        tabBarItemStyle: {
          paddingBottom: 10,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          height: 60,
          backgroundColor: "rgba(0,0,0,0.7)",
          position: "absolute",
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={100}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
