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
import { useThemeColor } from "@/hooks/useThemeColor";
import WeeklyTasksItem from "./WeeklyTasksItem";
import { Task, WeeklyTasksProps } from "@/types/task";

export default function WeeklyTasks({ householdId }: WeeklyTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const colorScheme = useColorScheme();
  const isFocused = useIsFocused();
  const { refreshTokens } = useTokenRefresh();
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];

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
    <WeeklyTasksItem task={item} />
  );

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  const displayedTasks = showAll ? tasks : tasks.slice(0, 4);

  return (
    <View style={{ flex: 1, paddingVertical: 40 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: primaryText,
          }}
        >
          Tasks
        </Text>
        <Pressable>
          <Entypo name="add-to-list" size={24} color={primaryText} />
        </Pressable>
      </View>
      <View>
        <FlatList
          data={displayedTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}
        />
        {tasks.length > 4 && (
          <Pressable
            onPress={() => setShowAll(!showAll)}
            style={{
              padding: 12,
              alignItems: "center",
              marginTop: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: primaryText }}>
              {showAll ? "Show Less" : `Show All (${tasks.length})`}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
