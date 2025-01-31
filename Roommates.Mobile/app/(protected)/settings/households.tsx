import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HouseholdsScreen() {
  const { userProfile } = useLocalSearchParams();
  useEffect(() => {
    console.log("User Profile:", userProfile);
  }, [userProfile]);
  return (
    <View>
      <Text>Households</Text>
    </View>
  );
}
