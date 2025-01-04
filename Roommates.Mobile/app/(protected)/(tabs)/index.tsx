import { Text, View } from "@/components/StyledComponents";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TouchableOpacity, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants/Endpoint";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    loadTokens();
  }, []);

  const loadTokens = async () => {
    const token = await SecureStore.getItemAsync("token");
    const refresh = await SecureStore.getItemAsync("refreshToken");
    setAccessToken(token || "");
    setRefreshToken(refresh || "");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
      });

      const data = await response.json();
      Alert.alert("Logout", data.message);

      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Logout", "Successfully logged out");
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      router.replace("/login");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>This text will adapt to the theme</Text>
      <ThemeToggle />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Access Token:</Text>
      <Text style={{ marginBottom: 10 }}>{accessToken}</Text>

      <Text style={{ fontWeight: "bold" }}>Refresh Token:</Text>
      <Text style={{ marginBottom: 20 }}>{refreshToken}</Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
