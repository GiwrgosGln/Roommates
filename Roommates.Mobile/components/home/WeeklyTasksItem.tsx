import React from "react";
import { View, Text } from "../StyledComponents";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { WeeklyTasksItemProps } from "@/types/task";

export default function WeeklyTasksItem({ task }: WeeklyTasksItemProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/tasks/[id]",
      params: { id: task.id, task: JSON.stringify(task) },
    });
  };

  return (
    <Pressable onPress={handlePress}>
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
          backgroundColor: "#BCEB0B",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: Colors[colorScheme ?? "light"].text,
            textDecorationLine: task.completed_at ? "line-through" : "none",
          }}
        >
          {task.title}
        </Text>
      </View>
    </Pressable>
  );
}
