import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const AddressScreen = () => {
  const router = useRouter();

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
      <TouchableOpacity style={styles.addAddress}>
        <Icon name="plus" size={20} color="green" />
        <Text style={styles.addText}>Add your New Address</Text>
      </TouchableOpacity>

      {/* Saved Address Card */}
      <View style={styles.addressCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.addressName}>Preethi K</Text>
          <Text style={styles.addressText}>
            210(1), Tamilsolai, Nangavaram, Tamilsolai, Kulithalai- 639110
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Ship to this Address Button */}
      <TouchableOpacity style={styles.shipButton}>
        <Text style={styles.shipButtonText}>Ship to this address</Text>
      </TouchableOpacity>
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
  },
  editText: {
    fontSize: 14,
    color: "green",
  },
  shipButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  shipButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
