import { View, Text } from "react-native";
import { Image, useColorScheme } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { UserData } from "@/types/user";

export default function Header(userData: UserData) {
  const [primaryText, tintText] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "tintText"),
  ];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!userData.default_household_id ? (
          <Text style={{ fontSize: 16, color: tintText }}>
            Welcome back, {userData.name}!
          </Text>
        ) : (
          <View>
            <Text style={{ fontSize: 16, color: tintText }}>
              Welcome back, {userData.name}!
            </Text>
          </View>
        )}
      </View>

      <Image
        source={{
          uri:
            userData.profile_picture ||
            "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    </View>
  );
}
