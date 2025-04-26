import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "@/constants/api";
import { useRouter } from "expo-router";

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
    userName: string;
  };
  productId: number;
  quantity: number;
  totalPrice: number;
  cartId: number;
  farmerId: number;
};

const Cart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<{
    id: number;
    originalPrice: number;
    discountedPrice: number;
    finalTotalPrice: number;
    items: CartItem[];
  }>({
    id: 2,
    originalPrice: 0,
    discountedPrice: 0,
    finalTotalPrice: 0,
    items: [],
  });

  const getProduct = async (id: number) => {
    try {
      const product = await axios.get(baseUrl + "product/" + id);
      return product.data;
    } catch (err) {
      console.log("Failed to fetch product", id);
      return {
        id,
        name: "Unknown Product",
        price: 0,
        discount: 0,
        offerPrice: 0,
        priceType: "N/A",
        noOfReviews: 0,
        rating: 0,
        availableQuantity: 0,
        img: "",
        description: "N/A",
        category: "N/A",
        categoryId: 0,
        userId: 0,
        userName: "Unknown",
      };
    }
  };

  const getCartData = async () => {
    try {
      setLoading(true);
      const tempuserId = await AsyncStorage.getItem("user");
      const response = await axios.get(baseUrl + "cart?cartId=" + tempuserId);
      const rawData = response.data;

      // Fetch all product data
      const itemsWithProducts = await Promise.all(
        rawData.items.map(async (item: any) => {
          const product = await getProduct(item.productId);
          return { ...item, product };
        })
      );

      // Set state with correct data
      setCartData({
        id: rawData.id,
        originalPrice: rawData.originalPrice,
        discountedPrice: rawData.discountedPrice,
        finalTotalPrice: rawData.finalTotalPrice,
        items: itemsWithProducts,
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const updateItem = async (itemId: number, quantity: number) => {
    try {
      await axios.put(
        `${baseUrl}cart/item?itemId=${itemId}&cartId=${cartData.id}&quantity=${quantity}`
      );
    } catch (err) {
      console.log("Update item error:", err);
      Alert.alert("Error", "Failed to update quantity. Please try again.");
    }
  };

  const deleteCartItem = async (itemId: number) => {
    try {
      await axios.delete(
        `${baseUrl}cart/item?cartId=${cartData.id}&itemId=${itemId}`
      );
      updateLocalCartAfterDeletion(itemId);
    } catch (err) {
      console.log("Delete item error:", err);
      alert("");
      Alert.alert("Error", "Failed to remove item. Please try again.");
    }
  };

  const updateLocalCartAfterDeletion = (itemId: number) => {
    const updatedItems = cartData.items.filter((item) => item.id !== itemId);

    const updatedOriginal = updatedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const updatedDiscounted = updatedItems.reduce(
      (sum, item) =>
        sum + (item.product.price - item.product.offerPrice) * item.quantity,
      0
    );
    const updatedFinal = updatedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    setCartData((prev) => ({
      ...prev,
      items: updatedItems,
      originalPrice: updatedOriginal,
      discountedPrice: updatedDiscounted,
      finalTotalPrice: updatedFinal,
    }));
  };

  const updateLocalQuantity = (itemId: number, newQuantity: number) => {
    const updatedItems = cartData.items.map((item: CartItem) => {
      if (item.id === itemId) {
        const updatedTotalPrice = item.product.offerPrice * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    const updatedOriginal = updatedItems.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );
    const updatedDiscounted = updatedItems.reduce(
      (sum, i) => sum + (i.product.price - i.product.offerPrice) * i.quantity,
      0
    );
    const updatedFinal = updatedItems.reduce((sum, i) => sum + i.totalPrice, 0);

    setCartData({
      ...cartData,
      items: updatedItems,
      originalPrice: updatedOriginal,
      discountedPrice: updatedDiscounted,
      finalTotalPrice: updatedFinal,
    });
  };

  const increaseQuantity = (item: CartItem) => {
    const newQuantity = item.quantity + 1;
    updateLocalQuantity(item.id, newQuantity);
    updateItem(item.id, newQuantity);
  };

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity <= 1) return;
    const newQuantity = item.quantity - 1;
    updateLocalQuantity(item.id, newQuantity);
    updateItem(item.id, newQuantity);
  };

  const removeItem = (id: number) => {
    console.log(id);
    // deleteCartItem(id);
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => deleteCartItem(id) },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.emptyCart}>
        <Text style={styles.emptyText}>Loading your cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cartContainer}>
        {cartData.items.length === 0 ? (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          </View>
        ) : (
          cartData.items.map((item: CartItem) => (
            <View key={item.id} style={styles.cartItem}>
              <Image
                source={{ uri: item.product.img }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.farmerName}>{item.product.userName}</Text>
                <Text style={styles.itemPrice}>
                  Price: ₹
                  {(item.product.price * (100 - item.product.discount)) / 100}
                  /kg
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
                <Text style={styles.itemTotal}>
                  You Pay ₹
                  {(item.quantity *
                    item.product.price *
                    (100 - item.product.discount)) /
                    100}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="trash-outline" size={22} color="black" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>
          ₹{cartData.finalTotalPrice.toFixed(1)}
        </Text>
        <Text style={styles.totalText}>Total Price + Delivery Charge</Text>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cartData.items.length === 0 && { backgroundColor: "#ccc" },
          ]}
          disabled={cartData.items.length === 0}
          onPress={() => router.push("/payment")}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
