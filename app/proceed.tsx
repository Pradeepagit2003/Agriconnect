import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const totalAmount = 7360;

  const handleNavigate = (path: any) => {
    setModalVisible(false);
    setTimeout(() => {
      router.push(path);
    }, 300); // Wait for modal to close before navigating
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      <ScrollView>
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
      </ScrollView>

      {/* Checkout Button */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.checkoutText}>Proceed to Pay ₹{totalAmount}</Text>
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Complete Payment:</Text>
            <Text style={styles.modalAmount}>₹{totalAmount}</Text>

            {/* Payment Method Row */}
            <View style={styles.modalRow}>
              <Icon name="credit-card" size={24} />
              <Text style={styles.modalText}>Paying via Google Pay</Text>
              <TouchableOpacity onPress={() => handleNavigate("/payment")}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Address Row */}
            <View style={styles.modalRow}>
              <Icon name="map-marker" size={24} />
              <Text style={styles.modalText}>
                Delivery to Kulithalai, 639110
              </Text>
              <TouchableOpacity onPress={() => handleNavigate("../address")}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Final Payment Button */}
            <TouchableOpacity style={styles.paymentButton}>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
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
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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

export default CartScreen;
