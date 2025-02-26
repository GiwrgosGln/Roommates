import { AuthProvider } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const storedToken = await SecureStore.getItemAsync("token");
    setToken(storedToken);
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="tasks/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tasks/create_task"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tasks/history"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="utilities/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="utilities/unpaid_utilities"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="utilities/add_utility"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="utilities/history"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings/feedback"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings/household_management"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
