import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/Endpoint";
import { useRouter } from "expo-router";

export default function UtilityDetails() {
  const params = useLocalSearchParams();
  const utilityData = JSON.parse(params.utility as string);
  const router = useRouter();

  // Now you can access all utility properties
  const { id, title, amount, due_date, paid_at, created_at } = utilityData;
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    highlight,
    highlightText,
    success,
    warning,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
    useThemeColor({}, "success"),
    useThemeColor({}, "warning"),
  ];

  const validateParams = () => {
    if (!params.householdId || !id) {
      throw new Error("Missing required parameters");
    }
  };

  const handleMarkAsPaid = async () => {
    console.log("Starting handleMarkAsPaid");
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log("Token retrieved:", token ? "exists" : "missing");

      const url = `${API_URL}/household/${params.householdId}/utilities/${id}/paid`;
      console.log("Making request to:", url);

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      router.back();
    } catch (error: any) {
      // Type assertion to handle the error object
      console.log("Error details:", {
        message: error?.message || "Unknown error",
        stack: error?.stack || "No stack trace",
      });
    }
  };

  const handleDelete = async () => {
    try {
      validateParams();
      const token = await SecureStore.getItemAsync("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        `${API_URL}/household/${params.householdId}/utilities/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      router.back();
    } catch (error) {
      console.error("Failed to delete utility:", error);
    }
  };

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: primaryText,
                  fontSize: 24,
                }}
              >
                {title}
              </Text>
              <Text style={{ color: primaryText, fontSize: 20 }}>
                ${amount}
              </Text>
            </View>
            {!paid_at && (
              <Text style={{ color: highlight }}>
                Due Date: {new Date(due_date).toLocaleDateString()}
              </Text>
            )}
            {paid_at && (
              <Text style={{ color: success }}>
                Paid on: {new Date(paid_at).toLocaleDateString()}
              </Text>
            )}
          </View>

          <View>
            {!paid_at && (
              <TouchableOpacity
                onPress={handleMarkAsPaid}
                style={{
                  backgroundColor: success,
                  padding: 15,
                  borderRadius: 8,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: secondaryText, fontWeight: "bold" }}>
                  Mark as Paid
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleDelete}
              style={{
                backgroundColor: warning,
                padding: 15,
                borderRadius: 8,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: primaryText, fontWeight: "bold" }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
