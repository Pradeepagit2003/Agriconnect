import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define TypeScript type for cart items
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
  inStock: boolean;
};

// Define navigation type
type RootStackParamList = {
  proceed: undefined; // Add ProceedPage as a route
};

const Cart = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Sample cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Tomato",
      price: 24,
      quantity: 15,
      image: require("../assets/images/tomato.png"),
      inStock: true,
    },
    {
      id: 2,
      name: "Finger-Ragi",
      price: 100,
      quantity: 70,
      image: require("../assets/images/finger.png"),
      inStock: true,
    },
  ]);

  // Function to increase quantity
  const increaseQuantity = (id: number) => {
    setCartItems((prevCart) => 
      prevCart.map((item) => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Function to remove item
  const removeItem = (id: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Cart</Text>
      </View>

      {/* Delivery Section */}
      <View style={styles.deliverySection}>
        <View>
          <Text style={styles.deliveryText}>Delivery to 639110</Text>
          <Text style={styles.locationText}>Kulithalai</Text>
        </View>
        <TouchableOpacity style={styles.changeButton}>
          <Text style={styles.changeButtonText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView contentContainerStyle={styles.cartContainer}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price: ₹{item.price}/kg</Text>
              <Text style={styles.deliveryDate}>🚚 Delivery by Wed, 19 Mar</Text>
              <Text style={styles.stockStatus}>In Stock</Text>
              <View style={styles.quantityContainer}>
                <Text>Quantity:</Text>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.itemTotal}>You Pay ₹{item.price * item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="trash-outline" size={22} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Total & Checkout */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>₹{totalPrice}</Text>
        <Text style={styles.totalText}>Total Price + Delivery Charge</Text>
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => navigation.navigate("proceed")}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Pay →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: { flexDirection: "row", alignItems: "center", padding: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },

  // Delivery Section
  deliverySection: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#f9f1e5", padding: 15, margin: 10, borderRadius: 10 },
  deliveryText: { fontSize: 14, fontWeight: "bold" },
  locationText: { fontSize: 12, color: "gray" },
  changeButton: { backgroundColor: "#fff", paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: "#ccc" },
  changeButtonText: { fontSize: 14, color: "black" },

  // Cart Items
  cartContainer: { paddingHorizontal: 10, paddingBottom: 100 },
  cartItem: { flexDirection: "row", backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 8, borderWidth: 1, borderColor: "#ddd", alignItems: "center" },
  itemImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "#333" },
  deliveryDate: { fontSize: 12, color: "gray", marginBottom: 5 },
  stockStatus: { fontSize: 12, color: "green", fontWeight: "bold" },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  quantityButton: { backgroundColor: "#ddd", paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5, marginHorizontal: 5 },
  quantityText: { fontSize: 18, fontWeight: "bold" },
  quantityValue: { fontSize: 16, fontWeight: "bold" },
  itemTotal: { fontSize: 14, fontWeight: "bold", marginTop: 5 },

  // Footer
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 15, borderTopWidth: 1, borderColor: "#ddd", alignItems: "center" },
  totalPrice: { fontSize: 18, fontWeight: "bold" },
  totalText: { fontSize: 12, color: "gray" },
  checkoutButton: { backgroundColor: "#ffcc00", paddingVertical: 12, paddingHorizontal: 20, borderRadius: 25, marginTop: 10 },
  checkoutButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default Cart;
