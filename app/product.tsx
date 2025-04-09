import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { productData } from "./data"; // Ensure this file exists and has product data
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import axios from "axios";
import { baseUrl } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type product = {
  id: number;
  userName: string;
  userId: number;
  name: string;
  category: string;
  categoryId: number;
  img: string;
  price: number;
  discount: number;
  offerPrice: number;
  priceType: "fixed" | "discount";
  image: string;
  description: string;
  availableQuantity: number;
  rating: number;
  noOfReviews: number;
};

const ProductView = () => {
  const [quantity, setQuantity] = useState(1);
  // const { data } = useLocalSearchParams(); // Get the passed product name
  const [userId, setUserId] = useState<null | string>(null);
  const { data } = useLocalSearchParams();
  // const productDetail = Array.isArray(data) ? JSON.parse(data[0]) : JSON.parse(data);
  // const productDetail: product = productData[0];
  const [productDetail, setProductDetail] = useState({
    id: 4,
    userId: 2,
    userName: "farmer1",
    name: "apple",
    price: 20,
    discount: 0,
    offerPrice: 20,
    priceType: "fixed",
    noOfReviews: 2,
    rating: 4.3,
    availableQuantity: 10,
    img: "https://i.ibb.co/dJ5wH33C/vegetable.jpg",
    description: "Apple",
    category: "vegetable",
    categoryId: 1,
  });

  const getUser = async () => {
    const tempuserId = await AsyncStorage.getItem("user");
    setUserId(tempuserId);
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(baseUrl + "product/" + data);
      setProductDetail(response.data);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const router = useRouter();

  useEffect(() => {
    getUser();
    getProductData();
  }, []);

  const addToCart = async () => {
    const CartItem = {
      id: 0,
      cart: null,
      product: productDetail,
      quantity: quantity,
      totalPrice:
        quantity *
        (productDetail.price -
          (productDetail.price * productDetail.discount) / 100),
    };
    try {
      const response = await axios.post(
        baseUrl + "cart/" + userId + "/add-item",
        CartItem
      );
      console.log(response.data);
      router.push("../cart");
    } catch (err) {
      console.log(err);
    }

    console.log(CartItem);
    // router.push("../cart");
  };

  // **Handle case where product is not found**
  if (!productDetail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <Image source={{ uri: productDetail.img }} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.title}>{productDetail.name}</Text>
        <Text style={styles.subtitle}>{productDetail.category}</Text>
        <Text style={styles.subtitle}>{productDetail.userName}</Text>
        <Text style={styles.marketPrice}>
          Market Price:{" "}
          <Text style={styles.strikeThrough}>₹{productDetail.price}</Text>
          <Text style={styles.discount}> {productDetail.discount}% Off</Text>
        </Text>
        <Text style={styles.price}>
          Your Price: ₹
          {productDetail.price -
            (productDetail.price * productDetail.discount) / 100}
        </Text>
        <Text style={styles.subtitle}>
          Available Quantity : {productDetail.availableQuantity}
        </Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <Icon name="minus-circle" size={24} color="#888" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            editable={false}
          />
          <TouchableOpacity
            onPress={() =>
              setQuantity((prev) =>
                prev < productDetail.availableQuantity ? prev + 1 : prev
              )
            }
          >
            <Icon name="plus-circle" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* About the Product */}
        <Text style={styles.sectionTitle}>About the Product</Text>
        <Text style={styles.description}>{productDetail.description}</Text>

        {/* Delivery Info */}
        {/* <View style={styles.deliveryContainer}>
          <Icon name="truck-delivery" size={24} color="black" />
          <Text style={styles.deliveryText}>
            Delivery to {productDetail.deliveryLocation}
          </Text>
        </View> */}

        {/* Rating & Reviews */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {productDetail.rating}</Text>
          <Text style={styles.ratingText}>Overall Rating</Text>
        </View>

        {/* User Reviews */}
        {/* {productDetail.reviews.map((review: any, index: any) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Most Useful Review</Text>
            <View style={styles.userContainer}>
              <Icon name="account-circle" size={40} color="#888" />
              <View>
                <Text style={styles.userName}>{review.user}</Text>
                <Text style={styles.verified}>
                  {review.verified && "✔ Verified Buyer"} - {review.date}
                </Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        ))} */}

        {/* Add to Bag Button */}
        <TouchableOpacity style={styles.addToBagButton} onPress={addToCart}>
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
  productSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  productButton: { fontSize: 16, padding: 10, color: "#000" },
  productDetail: { fontWeight: "bold", color: "green" },
  productImage: {
    width: "90%",
    height: 170,
    resizeMode: "contain",
    alignSelf: "center",
  },
  productDetails: { padding: 25 },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#66", marginVertical: 10 },
  marketPrice: { fontSize: 14, color: "#666", marginVertical: 15 },
  strikeThrough: { textDecorationLine: "line-through", color: "#888" },
  discount: { color: "green", fontWeight: "bold" },
  price: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityLabel: { fontSize: 16, marginRight: 10 },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    width: 50,
    textAlign: "center",
    borderRadius: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  description: { fontSize: 14, color: "#666", marginTop: 8 },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  deliveryText: { marginLeft: 8, fontSize: 16 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  rating: { fontSize: 18, fontWeight: "bold" },
  ratingText: { marginLeft: 8, fontSize: 16 },
  reviewContainer: { marginTop: 20 },
  reviewTitle: { fontSize: 18, fontWeight: "bold" },
  userContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  userName: { fontSize: 16, fontWeight: "bold" },
  verified: { color: "green", fontSize: 12 },
  reviewText: { fontSize: 14, color: "#666", marginTop: 8 },
  addToBagButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addToBagText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProductView;
