import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { View, Text } from "../StyledComponents";
import { API_URL } from "../../constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";
import Entypo from "@expo/vector-icons/Entypo";

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed_at: string | null;
  created_at: string;
  created_by_name: string;
}

interface WeeklyTasksProps {
  householdId: number;
}

export default function WeeklyTasks({ householdId }: WeeklyTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isFocused = useIsFocused();
  const { refreshTokens } = useTokenRefresh();

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused, householdId]);

  const fetchTasks = async () => {
    try {
      let token = await SecureStore.getItemAsync("accessToken");
      console.log("Current token:", token);

      let response = await fetch(`${API_URL}/household/${householdId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        // Token expired, refresh it
        console.log("Token expired, refreshing...");
        token = await refreshTokens();
        console.log("Token refreshed:", token);
        // Retry with new token
        response = await fetch(`${API_URL}/household/${householdId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        marginVertical: 4,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: "#2E2E3E",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: Colors[colorScheme ?? "light"].text,
          textDecorationLine: item.completed_at ? "line-through" : "none",
        }}
      >
        {item.title}
      </Text>

      <MaterialCommunityIcons
        name="check"
        size={24}
        color={item.completed_at ? "#4CAF50" : "#757575"}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",

            color: Colors[colorScheme ?? "light"].text,
          }}
        >
          Tasks
        </Text>
        <Pressable>
          <Entypo name="add-to-list" size={24} color="white" />
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
