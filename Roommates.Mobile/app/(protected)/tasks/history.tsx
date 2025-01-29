import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import WeeklyTasksItem from "@/components/home/WeeklyTasksItem";
import { Task } from "@/types/task";
import { useIsFocused } from "@react-navigation/native";

export default function History() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { householdId } = useLocalSearchParams();
  const [primaryText, primaryBackground, primaryBackgroundTint] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
  ];

  const fetchTasks = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");

      console.log("Fetching tasks for household:", householdId);

      const response = await fetch(
        `${API_URL}/household/${householdId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Enhanced error handling with response details
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Response status:", response.status);
        console.log("Response text:", errorText);

        if (response.status === 500) {
          throw new Error("Server error - please try again later");
        }
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Detailed error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [isFocused]);

  const renderTask = ({ item }: { item: Task }) => (
    <WeeklyTasksItem task={item} />
  );

  if (loading) {
    return (
      <View>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, marginBottom: 40 }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 16,
              color: primaryText,
              alignSelf: "center",
            }}
          >
            Task History
          </Text>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  taskCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  dateContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
