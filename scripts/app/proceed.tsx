import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CartScreen = () => {
  const [quantity, setQuantity] = useState(15);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // ✅ FIX: Use Expo Router

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} />
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

        {/* Product Card - Tomato */}
        <View style={styles.productCard}>
          <Image
            source={require("../assets/images/tomato.png")}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>Tomato</Text>
            <Text style={styles.productPrice}>Price: ₹24/kg</Text>
            <Text style={styles.deliveryDate}>Delivery by Wed, 19 Mar</Text>
            <Text style={styles.inStock}>In Stock</Text>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                <Icon name="minus-circle" size={22} color="#888" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                value={String(quantity)}
                editable={false}
              />
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Icon name="plus-circle" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Price */}
            <Text style={styles.totalPrice}>₹360</Text>
          </View>
          <TouchableOpacity>
            <Icon name="trash-can-outline" size={24} color="#888" />
          </TouchableOpacity>
        </View>
        {/* Product Card - Finger Millet (Ragi) */}
<View style={styles.productCard}>
  <Image
    source={require("../assets/images/finger.png")} // Ensure the image exists
    style={styles.productImage}
  />
  <View style={styles.productDetails}>
    <Text style={styles.productTitle}>Finger Millet (Ragi)</Text>
    <Text style={styles.productPrice}>Price: ₹45/kg</Text>
    <Text style={styles.deliveryDate}>Delivery by Thu, 20 Mar</Text>
    <Text style={styles.inStock}>In Stock</Text>

    {/* Quantity Selector */}
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
      >
        <Icon name="minus-circle" size={22} color="#888" />
      </TouchableOpacity>
      <TextInput
        style={styles.quantityInput}
        value={String(quantity)}
        editable={false}
      />
      <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
        <Icon name="plus-circle" size={22} color="#888" />
      </TouchableOpacity>
    </View>

    {/* Price */}
    <Text style={styles.totalPrice}>₹675</Text>
  </View>
  <TouchableOpacity>
    <Icon name="trash-can-outline" size={24} color="#888" />
  </TouchableOpacity>
</View>

      </ScrollView>

      {/* Checkout Button */}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.checkoutText}>Proceed to Pay ₹7,360</Text>
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Complete Payment:</Text>
            <Text style={styles.modalAmount}>₹7,360</Text>

            {/* Payment Method Change */}
            <View style={styles.modalRow}>
              <Icon name="credit-card" size={24} />
              <Text style={styles.modalText}>Paying via Google Pay</Text>
              <TouchableOpacity onPress={() => router.push("/payment")}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Address Change */}
            <View style={styles.modalRow}>
              <Icon name="map-marker" size={24} />
              <Text style={styles.modalText}>Delivery to Kulithalai, 639110</Text>
              <TouchableOpacity onPress={() => router.push("../address")}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Confirm Payment */}
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentText}>Proceed to Pay ₹7,360</Text>
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
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#555",
  },
  deliveryDate: {
    color: "green",
  },
  inStock: {
    color: "green",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 40,
    textAlign: "center",
    marginHorizontal: 5,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
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
