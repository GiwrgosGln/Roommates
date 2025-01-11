import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Button } from "react-native";
import { View, Text } from "@/components/StyledComponents";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/types/task";

export default function TaskDetails() {
  const { id, task } = useLocalSearchParams();
  const taskData: Task = JSON.parse(task as string);
  const [backgroundColor, textColor, secondaryTextColor] = [
    useThemeColor({}, "background"),
    useThemeColor({}, "text"),
    useThemeColor({}, "secondaryText"),
  ];

  const handleComplete = async () => {
    // Implement complete task logic using your API
  };

  const handleDelete = async () => {
    // Implement delete task logic using your API
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: secondaryTextColor }}>{taskData.title}</Text>
      <Text style={{ color: secondaryTextColor }}>{taskData.description}</Text>
      <Text style={{ color: secondaryTextColor }}>{taskData.created_at}</Text>
      <View>
        <Button title="Complete Task" onPress={handleComplete} />

        <Button title="Delete Task" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
}
