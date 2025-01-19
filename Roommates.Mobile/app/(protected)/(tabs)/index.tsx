import Bills from "@/components/home/Bills";
import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import { ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];
  return (
    <SafeAreaView
      style={{ flex: 1, height: "auto", backgroundColor: primaryBackground }}
    >
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
