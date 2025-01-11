import { Text } from "@/components/StyledComponents";
import { TouchableOpacity, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { API_URL } from "@/constants/Endpoint";

export default function Logout() {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
      });

      const data = await response.json();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      router.replace("/login");
    } catch (error) {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
      router.replace("/login");
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        backgroundColor: "#ff6b6b",
        padding: 15,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
    </TouchableOpacity>
  );
}
