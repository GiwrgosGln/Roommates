import { View, Text } from "../StyledComponents";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";

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
      <Text style={{ fontSize: 24, width: "50%" }}>Welcome to the Studio!</Text>
      <MaterialCommunityIcons name="home-switch" size={40} color="#00AAFF" />
    </View>
  );
}
