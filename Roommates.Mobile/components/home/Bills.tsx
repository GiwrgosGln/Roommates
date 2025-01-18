import { useThemeColor } from "@/hooks/useThemeColor";
import { View, Text } from "../StyledComponents";
import { LinearGradient } from "expo-linear-gradient";

export default function Bills() {
  const [
    success,
    textColor,
    secondaryTextColor,
    highlightColor,
    secondaryHightlightColor,
  ] = [
    useThemeColor({}, "success"),
    useThemeColor({}, "text"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "secondaryHighlight"),
  ];

  const billsPercentage = (3 / 7) * 100;

  return (
    <LinearGradient
      colors={[highlightColor, secondaryHightlightColor]}
      style={{
        width: "100%",
        marginTop: 30,
        paddingVertical: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 2,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "transparent",
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: 600, color: textColor }}>
          Bills
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ fontSize: 16, color: textColor }}>
            1 bill out of 3 paid
          </Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: textColor }}>
            {Math.round(billsPercentage)}%
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 6,
          backgroundColor: "#B45309", // Progress Bar Background Color
          borderRadius: 3,
        }}
      >
        <View
          style={{
            width: `${billsPercentage}%`,
            height: "100%",
            backgroundColor: textColor,
            borderRadius: 3,
          }}
        />
      </View>
    </LinearGradient>
  );
}
