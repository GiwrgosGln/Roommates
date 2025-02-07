import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Logout from "@/components/auth/Logout";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/Endpoint";

export default function Settings() {
  const [primaryText, tintText, primaryBackground, primaryBackgroundTint] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
  ];
  const [defaultHouseholdId, setDefaultHouseholdId] = useState<number | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const response = await fetch(`${API_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setUserProfile(data);
        setDefaultHouseholdId(data.default_household_id);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

  const settingsItems: {
    id: number;
    title: string;
    icon: MaterialCommunityIconName;
    onPress: () => void;
  }[] = [
    {
      id: 1,
      title: "Household Management",
      icon: "home" as MaterialCommunityIconName,
      onPress: () => {
        router.push({
          pathname: "/(protected)/settings/household_management",
          params: { userProfile: JSON.stringify(userProfile) },
        });
      },
    },
    ...(defaultHouseholdId !== null
      ? [
          {
            id: 2,
            title: "Tasks History",
            icon: "clipboard-list-outline" as MaterialCommunityIconName,
            onPress: () => {
              router.push({
                pathname: "/(protected)/tasks/history",
                params: { householdId: defaultHouseholdId },
              });
            },
          },
          {
            id: 3,
            title: "Bills History",
            icon: "format-list-bulleted-square" as MaterialCommunityIconName,
            onPress: () => {
              router.push({
                pathname: "/(protected)/utilities/history",
                params: { householdId: defaultHouseholdId },
              });
            },
          },
        ]
      : []),
    {
      id: 4,
      title: "Feedback",
      icon: "lightbulb-outline" as MaterialCommunityIconName,
      onPress: () => {
        router.push({
          pathname: "/(protected)/settings/feedback",
        });
      },
    },
  ];

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            paddingTop: 20,
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: primaryText,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
              height: 80,
              borderRadius: 5,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.7}
          >
            <Image
              source={{
                uri: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
              }}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "80%",
              }}
            >
              <View>
                <Text style={{ color: primaryText, fontSize: 18 }}>Emma</Text>
                <Text style={{ color: tintText, fontSize: 14 }}>
                  Edit your profile
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={tintText}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {settingsItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "100%",
                  height: 50,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={28}
                    color={primaryText}
                  />
                  <Text style={{ color: primaryText, fontSize: 18 }}>
                    {item.title}
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={tintText}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <Logout />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
