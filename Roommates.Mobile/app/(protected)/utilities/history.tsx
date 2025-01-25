import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState, useEffect } from "react";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

interface Utility {
  id: number;
  title: string;
  amount: number;
  due_date: string;
  paid_at: string | null;
  created_at: string;
}

export default function UtilityHistory() {
  const { householdId } = useLocalSearchParams();
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isFocused = useIsFocused;

  const [
    primaryText,
    tintText,
    secondaryText,
    primaryBackground,
    primaryBackgroundTint,
    secondaryBackground,
    highlightTint,
    highlight,
    success,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "highlightTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "success"),
  ];

  const fetchUtilities = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("Fetching utilities for household:", householdId);

      const response = await fetch(
        `${API_URL}/household/${householdId}/utilities/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Utilities fetched successfully:", data.length, "items");
        setUtilities(data);
      } else {
        console.error("Failed to fetch utilities:", response.status);
      }
    } catch (error) {
      console.error("Error fetching utilities:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUtilities();
  }, [householdId, isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUtilities();
  };

  const renderUtilityItem = ({ item }: { item: Utility }) => {
    const numericAmount =
      typeof item.amount === "string" ? parseFloat(item.amount) : item.amount;

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/utilities/[id]",
            params: {
              id: item.id,
              utility: JSON.stringify(item),
              householdId: householdId,
            },
          })
        }
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 5,
            padding: 10,
            marginVertical: 4,
            borderRadius: 8,
            borderWidth: 0.2,
            borderColor: tintText,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            backgroundColor: secondaryBackground,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: primaryText }}
            >
              {item.title}
            </Text>
            <Text style={{ color: primaryText }}>
              ${Number(numericAmount).toFixed(2)}
            </Text>
          </View>
          {item.paid_at ? (
            <Text style={{ color: success }}>
              Paid on: {new Date(item.paid_at).toLocaleDateString()}
            </Text>
          ) : (
            <Text style={{ color: highlight }}>
              Due: {new Date(item.due_date).toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: primaryText }}>Loading utilities...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: primaryBackground,
            padding: 20,
          }}
        >
          <Text
            style={{
              color: primaryText,
              fontSize: 24,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            Utility History
          </Text>
          <FlatList
            data={utilities}
            renderItem={renderUtilityItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text style={{ color: secondaryText, textAlign: "center" }}>
                No utilities found
              </Text>
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
