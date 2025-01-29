import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function FeedbackScreen() {
  const [feedbackType, setFeedbackType] = useState("feature");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [
    primaryText,
    secondaryText,
    tintText,
    primaryBackground,
    primaryBackgroundTint,
    highlight,
    highlightTint,
  ] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "tintText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "primaryBackgroundTint"),
    useThemeColor({}, "highlight"),
    useThemeColor({}, "highlightTint"),
  ];

  const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: primaryBackground }}
    >
      <LinearGradient
        colors={[primaryBackground, primaryBackgroundTint]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              padding: 16,
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              marginBottom: 20,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: primaryText,
                }}
              >
                Type
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: tintText,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
              >
                <Picker
                  selectedValue={feedbackType}
                  onValueChange={(value) => setFeedbackType(value)}
                  style={{ height: 60 }}
                  dropdownIconColor={primaryText}
                >
                  <Picker.Item
                    label="Feature Request"
                    value="feature"
                    style={{ color: primaryText }}
                  />
                  <Picker.Item
                    label="Bug Report"
                    value="bug"
                    style={{ color: primaryText }}
                  />
                </Picker>
              </View>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: primaryText,
                }}
              >
                Title
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={{
                  borderWidth: 1,
                  borderColor: tintText,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 16,
                  color: primaryText,
                }}
                placeholder="Enter title"
                placeholderTextColor={tintText}
              />

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: primaryText,
                }}
              >
                Description
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={{
                  borderWidth: 1,
                  borderColor: tintText,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  fontSize: 16,
                  minHeight: 100,
                  textAlignVertical: "top",
                  color: primaryText,
                }}
                placeholder="Enter description"
                placeholderTextColor={tintText}
              />
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={handleSubmit}
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
                  Submit
                  {feedbackType === "feature"
                    ? " Feature Request"
                    : " Bug Report"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
