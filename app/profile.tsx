import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { baseUrl } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define OrderItem and Profile types
interface OrderItem {
  productId: number;
  quantity: number;
}

interface Profile {
  id: number;
  userName: string;
  email: string;
  number: string;
  userType: string;
  addresses: string[];
  orderItems: OrderItem[];
}

// API response type
interface ApiResponse {
  userName: string;
  gender: string;
  email: string;
  number: string;
}

export default function EditProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [editableField, setEditableField] = useState<keyof Profile | null>(
    null
  );
  const [profile, setProfile] = useState<Profile>({
    id: 1,
    userName: "",
    email: "",
    number: "",
    userType: "",
    addresses: [""],
    orderItems: [],
  });

  const editableFields: (keyof Profile)[] = ["userName", "email", "number"];

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = await AsyncStorage.getItem("user");
        const validUserId = userId ?? "";
        const response = await axios.get<Profile>(
          baseUrl + "user/" + validUserId
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = (field: keyof Profile) => {
    setEditableField(field);
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleDone = async () => {
    if (!profile.email.includes("@")) {
      Alert.alert(t("invalid_email"), t("please_enter_valid_email"));
      return;
    }
    let response;
    try {
      const userId = await AsyncStorage.getItem("user");
      const validUserId = userId ?? "";
      response = await axios.put(baseUrl + "user/" + validUserId, profile);

      if (response.status === 200) {
        Alert.alert(t("success"), t("profile_updated"));
      } else {
        Alert.alert(t("error", t(response.data)));
        alert(response.data);
      }
    } catch (error) {
      Alert.alert(t("error"), t("failed_to_update_profile"));
      alert(t("failed_to_update_profile"));
      console.error("Update error:", error);
    } finally {
      setEditableField(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("edit_profile")}</Text>
      </View>

      {/* Profile Image Placeholder */}
      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Editable Fields */}
      <View style={styles.formContainer}>
        {editableFields.map((field) => (
          <ProfileField
            key={field}
            label={t(field)}
            value={profile[field]?.toString() || ""}
            editable={editableField === field}
            onEdit={() => handleEdit(field)}
            onChange={(text) => handleChange(field, text)}
          />
        ))}
      </View>

      {/* Done Button */}
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>{t("done")}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ProfileField Component
const ProfileField = ({
  label,
  value,
  editable,
  onEdit,
  onChange,
}: {
  label: string;
  value: string;
  editable: boolean;
  onEdit: () => void;
  onChange: (text: string) => void;
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, editable && styles.editableInput]}
        value={value}
        editable={editable}
        onChangeText={onChange}
        autoFocus={editable}
      />
      {!editable && (
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: 80,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#777",
  },
  input: {
    flex: 2,
    fontSize: 16,
    color: "black",
  },
  editableInput: {
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  doneButton: {
    marginTop: 40,
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  doneText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
