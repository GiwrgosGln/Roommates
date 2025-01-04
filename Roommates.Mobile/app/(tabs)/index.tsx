import { Text, View } from "@/components/StyledComponents";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>This text will adapt to the theme</Text>
      <ThemeToggle />
    </View>
  );
}
