import { View, Text } from "../StyledComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/Colors";
import { Image, useColorScheme } from "react-native";

export default function Header() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Welcome back, John!</Text>
      <Image
        source={{
          uri: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
    </View>
  );
}
