import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import { Text, View } from "@/components/StyledComponents";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <Header />
        <WeeklyTasks householdId={1} />
      </View>
    </SafeAreaView>
  );
}
