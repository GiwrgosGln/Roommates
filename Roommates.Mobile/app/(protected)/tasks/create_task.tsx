import { View, Text, TextInput, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateTask() {
  const { householdId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { refreshTokens } = useTokenRefresh();

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

  const createTask = async () => {
    try {
      let token = await SecureStore.getItemAsync("accessToken");

      // Convert householdId to number
      const household_id = parseInt(householdId as string);

      let response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          household_id,
        }),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.status === 403) {
        token = await refreshTokens();
        response = await fetch(`${API_URL}/tasks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            household_id,
          }),
        });
      }

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <TextInput
            style={{
              borderWidth: 0.3,
              borderColor: primaryText,
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              color: primaryText,
            }}
            placeholder="Task Title"
            placeholderTextColor={tintText}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={{
              borderWidth: 0.3,
              borderColor: primaryText,
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              height: 300,
              color: primaryText,
              textAlignVertical: "top",
            }}
            placeholder="Task Description"
            placeholderTextColor={tintText}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <Pressable
          style={{
            backgroundColor: highlight,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
          }}
          onPress={createTask}
        >
          <Text style={{ color: highlightText, fontWeight: "bold" }}>
            Create Task
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
