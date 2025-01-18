import Bills from "@/components/home/Bills";
import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import { Text, ScrollView, View } from "@/components/StyledComponents";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, height: "auto" }}>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
        }}
      >
        <Header />
        <Bills />
        <WeeklyTasks householdId={1} />
      </ScrollView>
    </SafeAreaView>
  );
}
