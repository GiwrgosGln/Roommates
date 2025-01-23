import UnpaidUtilities from "@/components/home/UnpaidUtilities";
import Header from "@/components/home/Header";
import WeeklyTasks from "@/components/home/WeeklyTasks";
import { ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];
  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <Header />
          <UnpaidUtilities householdId={1} />
          <WeeklyTasks householdId={1} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
