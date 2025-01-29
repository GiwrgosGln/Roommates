import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { WeeklyTasksProps } from "@/types/task";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";

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

type NavigationProps = {
  navigate: (screen: string, params?: any) => void;
};

export default function UnpaidUtilities({ householdId }: WeeklyTasksProps) {
  const [utilities, setUtilities] = useState<Utility[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const isFocused = useIsFocused();
  const router = useRouter();

  const fetchUnpaidUtilities = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(
        `${API_URL}/household/${householdId}/utilities/unpaid`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUtilities(data);

      const total =
        data.length > 0
          ? data.reduce(
              (sum: number, utility: Utility) => sum + Number(utility.amount),
              0
            )
          : 0;
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching unpaid utilities:", error);
      setTotalAmount(0);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUnpaidUtilities();
    }
  }, [isFocused]);

  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    highlight,
    highlightTint,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightTint"),
    useThemeColor({}, "highlightText"),
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(protected)/utilities/unpaid_utilities",
          params: { householdId },
        })
      }
    >
      <LinearGradient
        colors={[highlight, highlightTint]}
        style={{
          width: "100%",
          marginTop: 30,
          paddingVertical: 20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 2,
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            marginBottom: 15,
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "600", color: secondaryText }}
          >
            Bills
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text style={{ fontSize: 16, color: secondaryText }}>
              {utilities.length} {utilities.length === 1 ? "bill" : "bills"}{" "}
              pending
            </Text>

            <Text
              style={{ fontSize: 16, color: secondaryText, fontWeight: "700" }}
            >
              {Number(totalAmount).toFixed(2)}€
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
