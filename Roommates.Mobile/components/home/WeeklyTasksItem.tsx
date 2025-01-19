import React from "react";
import { View, Text } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { WeeklyTasksItemProps } from "@/types/task";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function WeeklyTasksItem({ task }: WeeklyTasksItemProps) {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    secondaryBackground,
    highlight,
    highlightText,
    success,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
    useThemeColor({}, "success"),
  ];
  const router = useRouter();

  const getTimeStatus = (completedAt: Date | null) => {
    if (!completedAt) return "In Progress";

    const completed = new Date(completedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - completed.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Completed Today";
    if (diffDays === 1) return "Completed Yesterday";
    return `Completed ${diffDays} days ago`;
  };

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
          gap: 15,
          padding: 20,
          marginVertical: 4,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
          backgroundColor: secondaryBackground,
        }}
      >
        {task.completed_at ? (
          <Feather name="check-circle" size={20} color={success} />
        ) : (
          <Feather name="clock" size={20} color={highlight} />
        )}
        <View style={{ backgroundColor: secondaryBackground }}>
          <Text
            style={{
              fontSize: 18,
              color: task.completed_at ? success : primaryText,
            }}
          >
            {task.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: tintText,
            }}
          >
            {getTimeStatus(
              task.completed_at ? new Date(task.completed_at) : null
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
