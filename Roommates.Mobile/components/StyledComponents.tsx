import {
  Text as RNText,
  View as RNView,
  ScrollView as RNScrollView,
  TextProps,
  ViewProps,
  ScrollViewProps,
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

export function ScrollView(props: ScrollViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({}, "background");

  return <RNScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}
