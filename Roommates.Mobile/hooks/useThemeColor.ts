import { Colors } from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

export type ThemeType = "light" | "dark" | "blue";

export function useThemeColor(
  props: { light?: string; dark?: string; blue?: string },
  colorName: keyof typeof Colors.light &
    keyof typeof Colors.dark &
    keyof typeof Colors.blue
) {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props[theme as ThemeType];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme as ThemeType][colorName];
  }
}
