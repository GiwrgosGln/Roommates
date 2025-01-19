import { Pressable, Text } from "react-native";
import { Appearance } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemeToggle() {
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
        backgroundColor: primaryBackground,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: primaryText }}>Toggle Theme</Text>
    </Pressable>
  );
}
