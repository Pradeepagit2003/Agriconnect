import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";

const CartPaymentScreen = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const totalMRP = 7360;
  const discount = 1490;
  const deliveryCharge = 200;
  const totalAmount = totalMRP - discount + deliveryCharge;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Delivery Info */}
        <View style={styles.deliveryContainer}>
          <Icon name="truck-delivery" size={24} color="black" />
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryText}>Delivery to 639110</Text>
            <Text style={styles.locationText}>Kulithalai</Text>
          </View>
          <TouchableOpacity onPress={() => router.push("../address")}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Price Details */}
        <View style={styles.priceDetails}>
          <Text style={styles.sectionTitle}>Price Detail</Text>
          <Text style={styles.savingText}>You are Saving ₹{discount}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>MRP</Text>
            <Text style={styles.priceValue}>₹{totalMRP}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.discountLabel}>Discount</Text>
            <Text style={styles.discountValue}>-₹{discount}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.deliveryLabel}>Delivery Charge</Text>
            <Text style={styles.deliveryValue}>+₹{deliveryCharge}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <View style={styles.paymentCard}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.payText}>Pay ₹{totalAmount}</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <Text style={styles.modalAmount}>₹{totalAmount}</Text>

            {/* Address Row */}
            <View style={styles.modalRow}>
              <Icon name="map-marker" size={24} />
              <Text style={styles.modalText}>
                Delivery to Kulithalai, 639110
              </Text>
            </View>

            {/* Payment Options */}
            {["UPI", "COD"].map((method) => (
              <TouchableOpacity
                key={method}
                style={styles.paymentOption}
                onPress={() => setSelectedPayment(method)}
              >
                <View style={styles.radioButton}>
                  {selectedPayment === method && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <View>
                  <Text style={styles.paymentMethod}>
                    {method === "UPI" ? "UPI" : "Cash on Delivery"}
                  </Text>
                  <Text style={styles.paymentDetail}>
                    {method === "UPI" ? "Google Pay" : "Pay at doorstep"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[
                styles.paymentButton,
                { backgroundColor: selectedPayment ? "#28a745" : "#ccc" },
              ]}
              disabled={!selectedPayment}
            >
              <Text style={styles.paymentText}>
                Proceed to Pay ₹{totalAmount}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  paymentDetail: {
    fontSize: 14,
    color: "#666",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10,
  },
  deliveryDetails: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    color: "#666",
  },
  changeText: {
    color: "#007BFF",
    fontWeight: "bold",
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
    alignItems: "center",
    marginVertical: 15,
  },
  otherPaymentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceDetails: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
  },
  paymentButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  paymentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartPaymentScreen;
