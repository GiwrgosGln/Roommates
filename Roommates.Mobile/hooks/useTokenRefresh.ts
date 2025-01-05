import { useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../constants/Endpoint";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export const useTokenRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshTokens = useCallback(async () => {
    setIsRefreshing(true);

    try {
      const currentRefreshToken = await SecureStore.getItemAsync(
        "refreshToken"
      );

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentRefreshToken}`,
        },
      });

      if (response.ok) {
        const data: TokenResponse = await response.json();

        await SecureStore.setItemAsync("accessToken", data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.refreshToken);

        return data.accessToken;
      }

      throw new Error("Token refresh failed");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return { refreshTokens, isRefreshing };
};
