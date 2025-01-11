import { Pressable, Text } from "react-native";
import { Appearance } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemeToggle() {
  const backgroundColor = useThemeColor({}, "background");
  const secondaryTextColor = useThemeColor({}, "secondaryText");

  const toggleTheme = () => {
    const currentTheme = Appearance.getColorScheme();
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    Appearance.setColorScheme(nextTheme);
  };

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        padding: 10,
        backgroundColor,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: secondaryTextColor }}>Toggle Theme</Text>
    </Pressable>
  );
}
