import { View, Text } from "../StyledComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/Colors";
import { Image, useColorScheme } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Header() {
  const [secondaryTextColor] = [useThemeColor({}, "secondaryText")];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, color: secondaryTextColor }}>
        Welcome back, John!
      </Text>
      <Image
        source={{
          uri: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    </View>
  );
}
