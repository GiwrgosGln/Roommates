import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";

export default function HouseholdManagementScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ userProfile: string }>();
  const userProfile = params.userProfile
    ? JSON.parse(params.userProfile as string)
    : null;
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isAddHouseholdModalVisible, setAddHouseholdModalVisible] =
    useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedHouseholdId, setSelectedHouseholdId] = useState<number | null>(
    null
  );
  const [newHousehold, setNewHousehold] = useState({
    name: "",
    address: "",
    city: "",
  });

  const [
    primaryText,
    tintText,
    secondaryText,
    primaryBackground,
    primaryBackgroundTint,
    highlight,
    highlightTint,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightTint"),
  ];

  const handleInvite = () => {
    console.log(`Inviting ${inviteEmail} to household ${selectedHouseholdId}`);
    setInviteEmail("");
    setInviteModalVisible(false);
  };

  const renderHousehold = ({ item }: { item: any }) => (
    <View
      style={{
        padding: 16,
        backgroundColor: "rgba(255,255,255,0.1)",
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 18, color: primaryText, fontWeight: "600" }}>
            {item.households.name}
          </Text>
          <Text style={{ fontSize: 16, color: primaryText }}>
            Role: {item.role}
          </Text>
          <Text style={{ fontSize: 14, color: tintText }}>
            Created: {new Date(item.households.created_at).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={{ borderRadius: 8 }}
          onPress={() => {
            setSelectedHouseholdId(item.households.id);
            setInviteModalVisible(true);
          }}
        >
          <LinearGradient
            colors={[highlight, highlightTint]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderRadius: 8,
              gap: 5,
            }}
          >
            <MaterialCommunityIcons
              name="account-plus"
              size={20}
              color={secondaryText}
            />
            <Text style={{ color: secondaryText, fontWeight: "500" }}>
              Invite
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[primaryBackground, primaryBackgroundTint]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 28,
            color: primaryText,
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Household Management
        </Text>
        <FlatList
          data={userProfile?.household_members}
          renderItem={renderHousehold}
          keyExtractor={(item) => item.households.id.toString()}
          ListFooterComponent={
            <TouchableOpacity
              style={{
                marginHorizontal: 16,
                marginVertical: 16,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => setAddHouseholdModalVisible(true)}
            >
              <LinearGradient
                colors={[highlight, highlightTint]}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: secondaryText,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Add Household
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={isInviteModalVisible}
          onRequestClose={() => setInviteModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            onTouchStart={() => setInviteModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: primaryBackground,
                padding: 20,
                borderRadius: 12,
                width: "80%",
                gap: 16,
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: primaryText,
                  textAlign: "center",
                }}
              >
                Invite Member
              </Text>
              <TextInput
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: 12,
                  borderRadius: 8,
                  color: primaryText,
                }}
                placeholder="Enter email"
                placeholderTextColor={tintText}
                value={inviteEmail}
                onChangeText={setInviteEmail}
              />
              <TouchableOpacity onPress={handleInvite}>
                <LinearGradient
                  colors={[highlight, highlightTint]}
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: secondaryText,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Send Invite
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
