import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { API_URL } from "@/constants/Endpoint";
import * as SecureStore from "expo-secure-store";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export default function AddUtility() {
  const { householdId } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [primaryText, secondaryText, primaryBackground, highlight] = [
    useThemeColor({}, "primaryText"),
    useThemeColor({}, "secondaryText"),
    useThemeColor({}, "primaryBackground"),
    useThemeColor({}, "highlight"),
  ];
  const handleSubmit = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(`${API_URL}/utilities`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          due_date: dueDate.toISOString(),
          household_id: Number(householdId),
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("Error creating utility:", error);
    }
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: primaryBackground, padding: 20 }}>
      <Text style={{ color: primaryText, fontSize: 24, marginBottom: 20 }}>
        Add New Bill
      </Text>

      <TextInput
        placeholder="Bill Title"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text>{dueDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: highlight,
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Add Bill
        </Text>
      </TouchableOpacity>
    </View>
  );
}
