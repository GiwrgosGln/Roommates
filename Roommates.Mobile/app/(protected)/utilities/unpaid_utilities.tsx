import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

type SearchParams = {
  householdId: string;
  utilities?: string;
  totalAmount?: string;
};

interface Utility {
  id: number;
  title: string;
  amount: number;
  due_date: string;
  created_by: {
    name: string;
    email: string;
  };
}

export default function UnpaidUtilitiesScreen() {
  const params = useLocalSearchParams<SearchParams>();
  const householdId = Number(params.householdId);
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { refreshTokens } = useTokenRefresh();
  const router = useRouter();
  const isFocused = useIsFocused;

  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    secondaryBackground,
    highlight,
    highlightTint,
    success,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightTint"),
    useThemeColor({}, "success"),
  ];

  useEffect(() => {
    fetchUnpaidUtilities();
  });

  const fetchUnpaidUtilities = async () => {
    try {
      let token = await SecureStore.getItemAsync("accessToken");
      let response = await fetch(
        `${API_URL}/household/${householdId}/utilities/unpaid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 403) {
        // Token expired, refresh it
        console.log("Token expired, refreshing...");
        token = await refreshTokens();
        console.log("Token refreshed:", token);
        // Retry with new token
        response = await fetch(
          `${API_URL}/household/${householdId}/utilities/unpaid`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const data = await response.json();
      setUtilities(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Error fetching unpaid utilities:", error);
    }
  };

  const calculateTotal = (data: Utility[]) => {
    const total = data.reduce(
      (sum, utility) => sum + Number(utility.amount),
      0
    );
    setTotalAmount(total);
  };

  const markAsPaid = async (utilityId: number) => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      await fetch(
        `${API_URL}/household/${householdId}/utilities/${utilityId}/paid`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUnpaidUtilities();
    } catch (error) {
      console.error("Error marking utility as paid:", error);
    }
  };

  const renderUtilityItem = ({ item }: { item: Utility }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 12,
        backgroundColor: secondaryBackground,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 4,
            color: primaryText,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 2, color: tintText }}>
          Due: {new Date(item.due_date).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: 14, marginBottom: 2, color: tintText }}>
          Added by: {item.created_by.name}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
            color: primaryText,
          }}
        >
          {Number(item.amount).toFixed(2)}€
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: success,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
          }}
          onPress={() => markAsPaid(item.id)}
        >
          <Text
            style={{ color: secondaryText, fontSize: 14, fontWeight: "500" }}
          >
            Mark as Paid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: tintText,
            }}
          >
            Bills
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", color: tintText }}>
            Total: {totalAmount.toFixed(2)}€
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => {
              router.push({
                pathname: "/(protected)/utilities/add_utility",
                params: { householdId },
              });
            }}
          >
            <LinearGradient
              colors={[highlight, highlightTint]}
              style={{
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: secondaryText,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Add bill
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => {
              router.push({
                pathname: "/(protected)/utilities/history",
                params: { householdId },
              });
            }}
          >
            <LinearGradient
              colors={[highlight, highlightTint]}
              style={{
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: secondaryText,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                View history
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <FlatList
          data={utilities}
          renderItem={renderUtilityItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 12 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
