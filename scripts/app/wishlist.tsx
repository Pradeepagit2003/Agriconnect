import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

const WishlistScreen = () => {
  const router = useRouter();

  const [wishlist, setWishlist] = useState([
    {
      id: "1",
      name: "Tomato",
      weight: "20kg",
      oldPrice: 30,
      newPrice: 24,
      discount: "20% Off",
      rating: 4.3,
      image: require("../assets/images/tomato.png"),
    },
    {
      id: "2",
      name: "Pearl-Kambu",
      weight: "100kg",
      oldPrice: 125,
      newPrice: 118,
      discount: "6% Off",
      rating: 4.1,
      image: require("../assets/images/pearl.png"),
    },
  ]);

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <Icon name="shopping-cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for all Product"
          style={styles.searchInput}
        />
      </View>

      {/* Wishlist Items */}
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.rating}>
              ⭐ {item.rating}
            </Text>
            <Text style={styles.weight}>{item.weight}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
              <Text style={styles.newPrice}>₹{item.newPrice}</Text>
              <Text style={styles.discount}>{item.discount}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.heartButton}>
                <Icon name="heart" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addToBagButton}>
                <Text style={styles.buttonText}>Add to Bag</Text>
                <Icon name="shopping-bag" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    elevation: 2,
    width: 170,
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 12,
    color: "#555",
  },
  weight: {
    fontSize: 12,
    color: "#777",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  newPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  discount: {
    fontSize: 12,
    color: "green",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  heartButton: {
    backgroundColor: "#F4F4F4",
    padding: 8,
    borderRadius: 5,
  },
  addToBagButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    marginRight: 5,
  },
});

export default WishlistScreen;
