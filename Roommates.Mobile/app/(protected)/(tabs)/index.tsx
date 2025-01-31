import UnpaidUtilities from "@/components/home/UnpaidUtilities";
import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import { ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/Endpoint";

export default function Home() {
  const [primaryBackground, primaryBackgroundTint] = [
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const response = await fetch(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          await SecureStore.setItemAsync(
            "userProfile",
            JSON.stringify(userData)
          );
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Header />
          <UnpaidUtilities householdId={1} />
          <WeeklyTasks householdId={1} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
