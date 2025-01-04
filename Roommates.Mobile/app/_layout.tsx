import { Stack } from "expo-router";
import React from "react";

import { ThemedStatusBar } from "@/components/ThemedStatusBar";

export default function Layout() {
  return (
    <>
      <ThemedStatusBar />
      <Stack>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
