import { Tabs } from "expo-router";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabsLayout() {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryText,
        tabBarInactiveTintColor: primaryText,
        tabBarItemStyle: {
          paddingBottom: 10,
        },
        tabBarStyle: {
          borderTopWidth: 0,
          height: 60,
          backgroundColor: primaryBackgroundTint,
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
            backgroundColor: primaryBackgroundTint,
            borderTopWidth: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 40, justifyContent: "center" }}>
              <Octicons size={28} name="home" color={primaryText} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    alignSelf: "center",
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: highlight,
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
            backgroundColor: primaryBackgroundTint,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ height: 40, justifyContent: "center" }}>
              <Ionicons size={28} name="person-outline" color={primaryText} />
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -4,
                    alignSelf: "center",
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: highlight,
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
