import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Logout from "@/components/auth/Logout";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Settings() {
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    secondaryBackground,
    highlight,
    highlightText,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "secondaryBackground"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightText"),
  ];

  type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

  const settingsItems: {
    id: number;
    title: string;
    icon: MaterialCommunityIconName;
    onPress: () => void;
  }[] = [
    {
      id: 1,
      title: "Households",
      icon: "home",
      onPress: () => {},
    },
    {
      id: 2,
      title: "Household Members",
      icon: "account-group",
      onPress: () => {},
    },
    {
      id: 3,
      title: "Tasks History",
      icon: "clipboard-list-outline",
      onPress: () => {},
    },
    {
      id: 4,
      title: "Bills History",
      icon: "format-list-bulleted-square",
      onPress: () => {},
    },
    {
      id: 5,
      title: "Feature Idea",
      icon: "lightbulb-outline",
      onPress: () => {},
    },
    {
      id: 6,
      title: "Report a bug",
      icon: "bug-outline",
      onPress: () => {},
    },
  ];

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            paddingTop: 20,
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: primaryText,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
              height: 80,
              borderRadius: 5,
              paddingHorizontal: 20,
            }}
            activeOpacity={0.7}
          >
            <Image
              source={{
                uri: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
              }}
              style={{ width: 60, height: 60, borderRadius: 100 }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "80%",
              }}
            >
              <View>
                <Text style={{ color: primaryText, fontSize: 18 }}>Emma</Text>
                <Text style={{ color: tintText, fontSize: 14 }}>
                  Edit your profile
                </Text>
              </View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={tintText}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {settingsItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "100%",
                  height: 50,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={28}
                    color={primaryText}
                  />
                  <Text style={{ color: primaryText, fontSize: 18 }}>
                    {item.title}
                  </Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={tintText}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          >
            <Logout />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
