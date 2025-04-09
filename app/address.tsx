import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { baseUrl } from "@/constants/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddressScreen = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const getUserId = async () => {
    const tempId = await AsyncStorage.getItem("user");
    setUserId(tempId);
  };

  const getUserAddress = async () => {
    try {
      getUserId();
      const response = await axios.get(baseUrl + "user/" + userId + "/address");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Preethi K",
      address: "210(1), Tamilsolai, Nangavaram, Tamilsolai, Kulithalai- 639110",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const addAddress = () => {
    if (!newName || !newAddress) {
      Alert.alert("Please fill both fields");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: newName,
      address: newAddress,
    };

    setAddresses([...addresses, newEntry]);
    setNewName("");
    setNewAddress("");
    setModalVisible(false);
  };

  const handleShip = (address: any) => {
    Alert.alert("Shipping to", `${address.name}\n${address.address}`);
    // You could navigate or trigger API here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Address</Text>
      </View>

      {/* Add New Address */}
      <TouchableOpacity
        style={styles.addAddress}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} color="green" />
        <Text style={styles.addText}>Add your New Address</Text>
      </TouchableOpacity>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.addressName}>{item.name}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <TouchableOpacity onPress={() => handleShip(item)}>
              <Text style={styles.editText}>Ship</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No address found.
          </Text>
        }
      />

      {/* Add Address Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Address"
              style={[styles.input, { height: 100 }]}
              value={newAddress}
              onChangeText={setNewAddress}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={addAddress}>
              <Text style={styles.saveText}>Save Address</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  addText: {
    fontSize: 16,
    color: "green",
    marginLeft: 10,
  },
  addressCard: {
    backgroundColor: "#D8F3DC",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addressText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  editText: {
    fontSize: 14,
    color: "green",
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
