import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/api";
const { width } = Dimensions.get("window");

// Importing images
const icons = {
  home: require("../assets/images/home.png"),
  offer: require("../assets/images/offer.png"),
  message: require("../assets/images/message.png"),
  cart: require("../assets/images/cart.png"),
  search: require("../assets/images/search.jpg"),
  bell: require("../assets/images/notification.png"),
  heart: require("../assets/images/heart.png"),
  profile: require("../assets/images/profile.png"),
};

// Data Arrays
const categories = [
  {
    id: 0,
    name: "Vegetables",
    img: require("../assets/images/vegetables.jpg"),
    description: "Fresh farm vegetables, straight to you!",
  },
  {
    id: 1,
    name: "Millets",
    img: require("../assets/images/millets.jpeg"),
    description: "Nutritious farm-fresh millets, straight to you!",
  },
  {
    id: 2,
    name: "Fruits",
    img: require("../assets/images/fruits.jpeg"),
    description: "Handpicked fresh fruits for a healthy life!",
  },
  {
    id: 3,
    name: "Flowers",
    img: require("../assets/images/flowers.png"),
    description: "Beautiful and fresh flowers for all occasions!",
  },
  {
    id: 4,
    name: "Green Leafy Veg",
    img: require("../assets/images/leafy.jpeg"),
    description: "Organic green leafy vegetables!",
  },
  {
    id: 5,
    name: "Coconuts",
    img: require("../assets/images/coconut.png"),
    description: "Fresh and natural coconuts!",
  },
  {
    id: 6,
    name: "Spices",
    img: require("../assets/images/spices.jpeg"),
    description: "Authentic spices for a flavorful meal!",
  },
  {
    id: 7,
    name: "Pulses",
    img: require("../assets/images/pulses.jpg"),
    description: "Healthy and nutritious pulses!",
  },
];

const HomeScreen = () => {
  const router = useRouter();
  const [categoriesData, setCategoriesData] = useState(categories);
  const handleCategoryPress = (categoryName: string) => {
    let formattedRoute = categoryName.toLowerCase().replace(/\s+/g, "-");

    // Fixing specific category names to match file names
    if (formattedRoute === "vegetables") formattedRoute = "vegetable";
    if (formattedRoute === "millets") formattedRoute = "millet";

    router.push(`/${formattedRoute}`);
  };

  const getCategories = async () => {
    const response = await axios.get(baseUrl + "product/category");
    if (response.status === 200) {
      setCategoriesData(response.data);
    } else {
      setCategoriesData(categories);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Text style={styles.logo}>AgriConnect</Text>
        <View style={styles.navIcons}>
          <Image source={icons.bell} style={styles.navIcon} />
          <Image source={icons.heart} style={styles.navIcon} />
          <TouchableOpacity onPress={() => router.push("/account")}>
            <Image source={icons.profile} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={icons.search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for all Product"
          placeholderTextColor="#888"
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Categories */}
        <Text style={styles.header}>Categories</Text>
        <View style={styles.sectionContainer}>
          {categoriesData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleCategoryPress(item.name)}
            >
              <Image source={{ uri: item.img }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={icons.home} style={styles.navIcon} />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/offer")}
        >
          <Image source={icons.offer} style={styles.navIcon} />
          <Text style={styles.navText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/message")}
        >
          <Image source={icons.message} style={styles.navIcon} />
          <Text style={styles.navText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/cart")}
        >
          <Image source={icons.cart} style={styles.navIcon} />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 70 },
  scrollContent: { padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "green",
    textAlign: "center",
  },
  sectionContainer: { paddingHorizontal: 10 },

  // Card Styling
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: width * 0.95,
    alignSelf: "center",
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 8 },
  textContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemDesc: { fontSize: 14, color: "#666" },

  // Top Navigation
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logo: { fontSize: 22, fontWeight: "bold", color: "green" },
  navIcons: { flexDirection: "row" },
  profileIcon: { width: 25, height: 25, borderRadius: 20, marginLeft: 10 },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 25,
    padding: 3,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    marginLeft: 15,
    marginRight: 15,
  },
  searchIcon: { width: 20, height: 20, marginRight: 10, marginLeft: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  // Bottom Navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
  },
  navItem: { alignItems: "center" },
  navIcon: { width: 30, height: 30 },
  navText: { fontSize: 14, color: "#888" },
  navTextActive: { fontSize: 14, fontWeight: "bold", color: "green" },
});

export default HomeScreen;
