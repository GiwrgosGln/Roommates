import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/types/task";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useReadableDate } from "@/hooks/useDateTransform";
import { Feather } from "@expo/vector-icons";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";

export default function TaskDetails() {
  const { id, task } = useLocalSearchParams();
  const { formatDate } = useReadableDate();
  const taskData: Task = JSON.parse(task as string);
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

  const readableDate = formatDate(taskData.created_at);

  const handleComplete = async () => {
    try {
      let token = await SecureStore.getItemAsync("accessToken");
      await fetch(
        `${API_URL}/household/${taskData.household_id}/tasks/${taskData.id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      let token = await SecureStore.getItemAsync("accessToken");
      await fetch(
        `${API_URL}/household/${taskData.household_id}/tasks/${taskData.id}`,
        {
          method: "DELETE ",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
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
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: primaryText,
                  fontSize: 24,
                }}
              >
                {taskData.title}
              </Text>
              {taskData.completed_at ? (
                <Feather name="check-circle" size={22} color={success} />
              ) : (
                <Feather name="clock" size={22} color={highlight} />
              )}
            </View>
            <Text
              style={{
                color: primaryText,
                fontWeight: 300,
              }}
            >
              {readableDate}
            </Text>

            <Text style={{ color: primaryText, fontSize: 16, marginTop: 20 }}>
              {taskData.description}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {!taskData.completed_at && (
              <TouchableOpacity
                onPress={handleComplete}
                style={{
                  backgroundColor: success,
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: secondaryText,
                    fontSize: 16,
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  Complete Task
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleDelete}
              style={{
                backgroundColor: warning,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: primaryText,
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Delete Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
