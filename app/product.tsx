import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { productData } from "./data"; // Ensure this file exists and has product data
import { useLocalSearchParams } from "expo-router/build/hooks";

const ProductView = () => {
//   const [selectedProduct, setSelectedProduct] = useState(productData[0]);
  const [quantity, setQuantity] = useState(1);
  const { name } = useLocalSearchParams(); // Get the passed product name
  const selectedProduct = productData.find((product) => product.name === name); // Find product by name

     // **Handle case where product is not found**
  if (!selectedProduct) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image source={selectedProduct.image} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.title}>{selectedProduct.name}</Text>
        <Text style={styles.subtitle}>{selectedProduct.variety}</Text>
        <Text style={styles.marketPrice}>
          Market Price: <Text style={styles.strikeThrough}>₹{selectedProduct.marketPrice}</Text>
          <Text style={styles.discount}> {selectedProduct.discount}% Off</Text>
        </Text>
        <Text style={styles.price}>Your Price: ₹{selectedProduct.marketPrice - (selectedProduct.marketPrice * selectedProduct.discount) / 100}</Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
            <Icon name="minus-circle" size={24} color="#888" />
          </TouchableOpacity>
          <TextInput style={styles.quantityInput} value={String(quantity)} editable={false} />
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Icon name="plus-circle" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* About the Product */}
        <Text style={styles.sectionTitle}>About the Product</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>

        {/* Delivery Info */}
        <View style={styles.deliveryContainer}>
          <Icon name="truck-delivery" size={24} color="black" />
          <Text style={styles.deliveryText}>Delivery to {selectedProduct.deliveryLocation}</Text>
        </View>

        {/* Rating & Reviews */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {selectedProduct.rating}</Text>
          <Text style={styles.ratingText}>Overall Rating</Text>
        </View>

        {/* User Reviews */}
        {selectedProduct.reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Most Useful Review</Text>
            <View style={styles.userContainer}>
              <Icon name="account-circle" size={40} color="#888" />
              <View>
                <Text style={styles.userName}>{review.user}</Text>
                <Text style={styles.verified}>{review.verified && "✔ Verified Buyer"} - {review.date}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))}

        {/* Add to Bag Button */}
        <TouchableOpacity style={styles.addToBagButton}>
          <Text style={styles.addToBagText}>Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red" },  
  container: { flex: 1, backgroundColor: "#fff" },
  productSelector: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  productButton: { fontSize: 16, padding: 10, color: "#000" },
  selectedProduct: { fontWeight: "bold", color: "green" },
  productImage: { width: "90%", height: 170, resizeMode: "contain", alignSelf: "center" },
  productDetails: { padding: 25 },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#66", marginVertical: 10 },
  marketPrice: { fontSize: 14, color: "#666", marginVertical: 15 },
  strikeThrough: { textDecorationLine: "line-through", color: "#888" },
  discount: { color: "green", fontWeight: "bold" },
  price: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  quantityLabel: { fontSize: 16, marginRight: 10 },
  quantityInput: { borderWidth: 1, borderColor: "#ddd", padding: 8, width: 50, textAlign: "center", borderRadius: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  description: { fontSize: 14, color: "#666", marginTop: 8 },
  deliveryContainer: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  deliveryText: { marginLeft: 8, fontSize: 16 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  rating: { fontSize: 18, fontWeight: "bold" },
  ratingText: { marginLeft: 8, fontSize: 16 },
  reviewContainer: { marginTop: 20 },
  reviewTitle: { fontSize: 18, fontWeight: "bold" },
  userContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  userName: { fontSize: 16, fontWeight: "bold" },
  verified: { color: "green", fontSize: 12 },
  reviewText: { fontSize: 14, color: "#666", marginTop: 8 },
  addToBagButton: { backgroundColor: "green", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 20 },
  addToBagText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProductView;
