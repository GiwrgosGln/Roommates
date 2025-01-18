import { Tabs } from "expo-router";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  const [backgroundColor, secondaryBackgroundColor, secondaryTextColor] = [
    useThemeColor({}, "background"),
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "secondaryText"),
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: secondaryTextColor,
        tabBarInactiveTintColor: secondaryTextColor,
        tabBarItemStyle: {
          paddingBottom: 10,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          height: 60,
          backgroundColor: backgroundColor,
          position: "absolute",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: backgroundColor,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 40, justifyContent: "center" }}>
              <Octicons size={28} name="home" color={secondaryTextColor} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    alignSelf: "center",
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#FED32C",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: backgroundColor,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 40, justifyContent: "center" }}>
              <Ionicons
                size={28}
                name="person-outline"
                color={secondaryTextColor}
              />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    alignSelf: "center",
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#FED32C",
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
