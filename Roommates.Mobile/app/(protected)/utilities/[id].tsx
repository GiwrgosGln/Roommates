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

  const handleMarkAsPaid = async () => {
    const token = await SecureStore.getItemAsync("accessToken");

    const response = await fetch(
      `${API_URL}/household/${params.householdId}/utilities/${id}/paid`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      router.replace({
        pathname: "/utilities/[id]",
        params: {
          id,
          utility: JSON.stringify({
            ...utilityData,
            paid_at: new Date().toISOString(),
          }),
        },
      });
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
              onPress={handleMarkAsPaid}
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
