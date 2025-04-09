import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "@/constants/api";
import { useRouter } from "expo-router";

// Define TypeScript type for cart items
type CartItem = {
  id: number;
  product: {
    id: number;
    userId: number;
    name: string;
    price: number;
    discount: number;
    offerPrice: number;
    priceType: string;
    noOfReviews: number;
    rating: number;
    availableQuantity: number;
    img: string;
    description: string;
    category: string;
    categoryId: number;
  };
  quantity: number;
  totalPrice: number;
};

// Define navigation type
type RootStackParamList = {
  proceed: undefined; // Add ProceedPage as a route
};

const Cart = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<null | string>(null);
  const [quantityChange, setQuantityChange] = useState(0);
  const [cartData, setCartData] = useState({
    id: 0,
    userId: 0,
    totalPrice: 0,
    cartItems: [
      {
        id: 1,
        product: {
          id: 1,
          userId: 2,
          userName: "farmer",
          name: "apple",
          price: 20,
          discount: 0,
          offerPrice: 20,
          priceType: "fixed",
          noOfReviews: 2,
          rating: 4.3,
          availableQuantity: 300,
          img: "https://i.ibb.co/dJ5wH33C/vegetable.jpg",
          description: "Apple",
          category: "vegetable",
          categoryId: 1,
        },
        quantity: 0,
        totalPrice: 0,
      },
    ],
  });
  const getCartData = async () => {
    try {
      const tempuserId = await AsyncStorage.getItem("user");
      setUserId(tempuserId);
      const response = await axios.get(baseUrl + "cart/" + tempuserId);
      setCartData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCartData();
  }, [quantityChange]);

  const updateItem = async (id: number, quantity: number) => {
    try {
      const response = await axios.put(
        baseUrl +
          "cart/" +
          cartData.id +
          "/update-item/" +
          id +
          "?quantity=" +
          quantity
      );
      setQuantityChange((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCartItem = async (itemId: number) => {
    try {
      const response = await axios.delete(
        baseUrl + "cart/" + cartData.id + "?itemId=" + itemId
      );
      setCartData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to increase quantity
  const increaseQuantity = (item: CartItem) => {
    updateItem(item.id, item.quantity + 1);
  };

  // Function to decrease quantity
  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity === 1) {
      return;
    }
    updateItem(item.id, item.quantity - 1);
  };

  // Function to remove item
  const removeItem = (id: number) => {
    // setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    console.log("remove");
    deleteCartItem(id);
  };

  return (
    <View style={styles.container}>
      {/* Cart Items */}
      <ScrollView contentContainerStyle={styles.cartContainer}>
        {cartData.cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          </View>
        ) : (
          cartData.cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image
                source={{ uri: item.product.img }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.farmerName}>{item.product.userName}</Text>
                <Text style={styles.itemPrice}>
                  Price: ₹{item.product.price}/kg
                </Text>
                <Text style={styles.deliveryDate}>
                  🚚 Delivery by Wed, 19 Mar
                </Text>
                <Text style={styles.stockStatus}>In Stock</Text>
                <View style={styles.quantityContainer}>
                  <Text>Quantity:</Text>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>You Pay ₹{item.totalPrice}</Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="trash-outline" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Total & Checkout */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>₹{cartData.totalPrice}</Text>
        <Text style={styles.totalText}>Total Price + Delivery Charge</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/payment")}
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
  deliverySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f1e5",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  deliveryText: { fontSize: 14, fontWeight: "bold" },
  locationText: { fontSize: 12, color: "gray" },
  changeButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  changeButtonText: { fontSize: 14, color: "black" },

  // Cart Items
  cartContainer: { paddingHorizontal: 10, paddingBottom: 100 },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  itemImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "bold", textTransform: "capitalize" },
  farmerName: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  itemPrice: { fontSize: 14, color: "#333" },
  deliveryDate: { fontSize: 12, color: "gray", marginBottom: 5 },
  stockStatus: { fontSize: 12, color: "green", fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: { fontSize: 18, fontWeight: "bold" },
  quantityValue: { fontSize: 16, fontWeight: "bold" },
  itemTotal: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  totalPrice: { fontSize: 18, fontWeight: "bold" },
  totalText: { fontSize: 12, color: "gray" },
  checkoutButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  checkoutButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default Cart;
