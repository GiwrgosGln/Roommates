import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { API_URL } from "@/constants/Endpoint";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Test123!");
  const [
    primaryText,
    secondaryText,
    primaryBackground,
    highlight,
    highlightTint,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightTint"),
    useThemeColor({}, "highlightText"),
  ];

  const handleLogin = async () => {
    try {
      console.log("Sending request with:", { email, password });
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.accessToken) {
        await SecureStore.setItemAsync("token", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);
        router.replace("/(protected)/(tabs)");
      }
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: primaryBackground,
      }}
    >
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          color: primaryText,
          borderColor: primaryText,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          color: primaryText,
          borderColor: primaryText,
        }}
      />
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={[highlight, highlightTint]}
          style={{
            width: "100%",
            marginTop: 30,
            paddingVertical: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            display: "flex",
            flexDirection: "column",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: highlightText, textAlign: "center" }}>
            Login
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
