import { View, Text } from "@/components/StyledComponents";
import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { API_URL } from "@/constants/Endpoint";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    console.log("Login attempt started");
    try {
      console.log("Sending request with:", { email, password, name });
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();
      console.log("Response received:", data);

      if (data.accessToken) {
        console.log("Token received, storing...");
        await SecureStore.setItemAsync("token", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        console.log("Navigating to protected route...");
        router.replace("/(protected)/(tabs)");
      }
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "blue", padding: 15, borderRadius: 5 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
