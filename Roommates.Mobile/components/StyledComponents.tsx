import {
  Text as RNText,
  View as RNView,
  TextProps,
  ViewProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = useThemeColor({}, "text");

  return <RNText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, "background");

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
}
