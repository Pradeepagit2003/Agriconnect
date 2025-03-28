import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PaymentScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="black" onPress={() => router.back()} />
        <Text style={styles.headerText}>Select Payment</Text>
      </View>

      {/* Favorite Payment Method */}
      <Text style={styles.sectionTitle}>Your Favourite Payment Method</Text>
      <View style={styles.paymentCard}>
        <Text style={styles.paymentMethod}>UPI</Text>
        <Text style={styles.disabledText}>Google Pay</Text>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText}>Pay ₹7,360</Text>
        </TouchableOpacity>
      </View>

      {/* Other Payment Options */}
      <TouchableOpacity style={styles.otherPayment} onPress={() => router.push("/pay")}>
        <Text style={styles.otherPaymentText}>Other Payment Options</Text>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      {/* Price Details */}
      <View style={styles.priceDetails}>
        <Text style={styles.sectionTitle}>Price Detail</Text>
        <Text style={styles.savingText}>You are Saving ₹1490</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>MRP</Text>
          <Text style={styles.priceValue}>₹7360</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.discountLabel}>Discount</Text>
          <Text style={styles.discountValue}>-₹1490</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.deliveryLabel}>Delivery Charge</Text>
          <Text style={styles.deliveryValue}>+₹200</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>₹7560</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  paymentCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledText: {
    fontSize: 14,
    color: "gray",
  },
  payButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  payText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  otherPayment: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    alignItems: "center",
  },
  otherPaymentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceDetails: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
  },
  savingText: {
    color: "green",
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  priceLabel: {
    fontSize: 14,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  discountLabel: {
    fontSize: 14,
    color: "green",
  },
  discountValue: {
    fontSize: 14,
    color: "green",
    fontWeight: "bold",
  },
  deliveryLabel: {
    fontSize: 14,
    color: "red",
  },
  deliveryValue: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
