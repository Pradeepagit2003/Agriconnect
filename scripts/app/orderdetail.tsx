import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Import useLocalSearchParams
import Icon from "react-native-vector-icons/Feather";

const OrderDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the Order ID from the URL params

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
      </View>

      {/* Order ID */}
      <Text style={styles.orderId}>Order ID: {id}</Text> {/* Display the Order ID */}

      {/* Product Section */}
      <View style={styles.productContainer}>
        <Image source={require("../assets/images/tomato.png")} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>Tomato</Text>
          <Text style={styles.productVariety}>Desi Varieties</Text>
          <Text style={styles.productWeight}>15kg</Text>
        </View>
      </View>

      {/* Delivery Status */}
      <Text style={styles.arrivalDate}>Arriving By Wed, 19 Mar</Text>

      {/* Tracking Progress */}
      <View style={styles.trackingContainer}>
        <Icon name="check-circle" size={28} color="green" />
        <View style={styles.line} />
        <Icon name="truck" size={28} color="green" />
        <View style={styles.line} />
        <Icon name="package" size={28} color="#ddd" />
      </View>
      <Text style={styles.cancelNote}>Cancellation is not allowed after shipping</Text>

      {/* Delivery Details */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <Icon name="map-pin" size={18} color="#000" />
            <Text style={styles.recipientName}>Sekar</Text>
          </View>
          <Text style={styles.addressText}>
            210(1), Tamilsolai, Nangavaram, Tamilsolai, Kulithalai - 639110, Tamil Nadu, India.
          </Text>
          <View style={styles.phoneContainer}>
            <Icon name="phone" size={18} color="#000" />
            <Text style={styles.phoneText}>+91 xxxxxxxxxx</Text>
          </View>
        </View>
      </View>

      {/* Pricing Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.sectionTitle}>Item Price</Text>
        <Text style={styles.price}>₹360</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>MRP</Text>
          <Text style={styles.priceStrike}>₹450</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Discounted</Text>
          <Text style={styles.discountPrice}>-₹90</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  orderId: { fontSize: 14, color: "#666", marginBottom: 10 },
  productContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  productImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 16, fontWeight: "bold" },
  productVariety: { fontSize: 14, color: "#777" },
  productWeight: { fontSize: 14, color: "#777" },
  arrivalDate: { fontSize: 16, color: "green", fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  trackingContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  line: { width: 40, height: 2, backgroundColor: "green", marginHorizontal: 5 },
  cancelNote: { textAlign: "center", fontSize: 12, color: "#777", marginBottom: 15 },
  deliveryContainer: { marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  addressCard: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 10 },
  addressHeader: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  recipientName: { fontSize: 14, fontWeight: "bold", marginLeft: 5 },
  addressText: { fontSize: 14, color: "#555", marginBottom: 8 },
  phoneContainer: { flexDirection: "row", alignItems: "center" },
  phoneText: { fontSize: 14, marginLeft: 5 },
  priceContainer: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 10 },
  price: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  priceLabel: { fontSize: 14, color: "#666" },
  priceStrike: { fontSize: 14, color: "#999", textDecorationLine: "line-through" },
  discountPrice: { fontSize: 14, color: "green" },
});

export default OrderDetailScreen;
