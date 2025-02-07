import UnpaidUtilities from "@/components/home/UnpaidUtilities";
import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/Endpoint";
import { UserData } from "@/types/user";
import { useRouter } from "expo-router";

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [householdId, setHouseholdId] = useState<number | null>(null);
  const router = useRouter();

  const [primaryBackground, primaryBackgroundTint] = [
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
  ];

  useEffect(() => {
    const fetchAndStoreUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/user/profile`);
        const data = await response.json();
        setUserData(data);
        await SecureStore.setItemAsync("userData", JSON.stringify(data));

        if (data.default_household_id) {
          await SecureStore.setItemAsync(
            "householdId",
            data.default_household_id.toString()
          );
          console.log("Stored householdId:", data.default_household_id);
          setHouseholdId(data.default_household_id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setHouseholdId(null);
      }
    };

    fetchAndStoreUserData();
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
          {userData && <Header {...userData} />}
          {householdId ? (
            <>
              <UnpaidUtilities householdId={householdId} />
              <WeeklyTasks householdId={householdId} />
            </>
          ) : (
            <>
              <Text>Household not found</Text>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
