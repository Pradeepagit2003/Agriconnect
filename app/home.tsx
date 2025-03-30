import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { farmerData, productData, vegetables, categoriesData } from "./data"
import { FlatList } from "react-native";

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
  { name: "Vegetables", img: require("../assets/images/vegetables.jpg"), desc: "Fresh farm vegetables, straight to you!" },
  { name: "Millets", img: require("../assets/images/millets.jpeg"), desc: "Nutritious farm-fresh millets, straight to you!" },
  { name: "Fruits", img: require("../assets/images/fruits.jpeg"), desc: "Handpicked fresh fruits for a healthy life!" },
  { name: "Flowers", img: require("../assets/images/flowers.png"), desc: "Beautiful and fresh flowers for all occasions!" },
  { name: "Green Leafy Veg", img: require("../assets/images/leafy.jpeg"), desc: "Organic green leafy vegetables!" },
  { name: "Coconuts", img: require("../assets/images/coconut.png"), desc: "Fresh and natural coconuts!" },
  { name: "Spices", img: require("../assets/images/spices.jpeg"), desc: "Authentic spices for a flavorful meal!" },
  { name: "Pulses", img: require("../assets/images/pulses.jpg"), desc: "Healthy and nutritious pulses!" },
];

const HomeScreen = () => {
  const router = useRouter();

  const handleCategoryPress = (categoryName) => {
    let formattedRoute = categoryName.toLowerCase().replace(/\s+/g, "-");
  
    // Fixing specific category names to match file names
    if (formattedRoute === "vegetables") formattedRoute = "vegetable";
    if (formattedRoute === "millets") formattedRoute = "millet";
  
    router.push(`/${formattedRoute}`);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search input
  const filteredProducts = vegetables.filter((item : any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSearchResult = (query: any) => {
    
    if (!query) return null;

    // Check if query matches a category's name
    const matchedCategory =farmerData.find((farmer) => farmer.name === query)
  
    if (matchedCategory) {
      return { type: "category", data: matchedCategory };
    }
  
    // Check if query matches a farmer's name
    const matchedFarmer =farmerData.find((farmer) => farmer.name === query)
  
    if (matchedFarmer) {
      return { type: "farmer", data: matchedFarmer };
    }
  
    // Check if query matches a product name
    const matchedProduct =productData.find((product) => product.name === query)
  
    if (matchedProduct) {
      return { type: "product", data: matchedProduct };
    }
  
    return null; // No match found
  };
  

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
    placeholder="Search for all Products"
    placeholderTextColor="#888"
    value={searchQuery}
    onChangeText={(text) => setSearchQuery(text)}
  />
</View>

{/* Show List Only When Searching */}
<View style={styles.searchResultsContainer}>
  {searchQuery.length > 0 && (
    <FlatList
    data={[...vegetables, ...farmerData, ...categoriesData].filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )}

      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.itemContainer} 
          onPress={() => {
            const searchResult = getSearchResult(item.name);
            if (searchResult) {
              if (searchResult.type === "farmer" || searchResult.type === "category") {
                router.push({ pathname: "/list", params: { data: JSON.stringify(searchResult.data) } });
              } else if (searchResult.type === "product") {
                router.push({ pathname: "/product", params: { data: JSON.stringify(searchResult.data) } });
              }
            } else {
              handleCategoryPress(item.name); // Fallback to category navigation
            }
          }}
       >
          <Text style={styles.itemText}>{item.name} </Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text style={styles.noResult}>No results found</Text>}
    />
  )}
</View>


      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Categories */}
        <Text style={styles.header}>Categories</Text>
        <View style={styles.sectionContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => handleCategoryPress(item.name)}>
              <Image source={item.img} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
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
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/offer")}>
          <Image source={icons.offer} style={styles.navIcon} />
          <Text style={styles.navText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/message")}>
          <Image source={icons.message} style={styles.navIcon} />
          <Text style={styles.navText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/cart")}>
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
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: "green", textAlign: "center" },
  sectionContainer: { paddingHorizontal: 10 },

  // Card Styling
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 20, borderRadius: 15, marginBottom: 20, width: width * 0.95, alignSelf: "center" },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 8 },
  textContainer: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemDesc: { fontSize: 14, color: "#666" },

  // Top Navigation
  topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 30, paddingVertical: 20, borderBottomWidth: 1, borderColor: "#ddd" },
  logo: { fontSize: 22, fontWeight: "bold", color: "green" },
  navIcons: { flexDirection: "row" },
  profileIcon: { width: 25, height: 25, borderRadius: 20, marginLeft: 10 },

  // Search Bar
  searchContainer: { flexDirection: "row", backgroundColor: "#ffffff", margin: 10, borderRadius: 25, padding: 3, alignItems: "center", borderWidth: 1, borderColor: "green", marginLeft: 15, marginRight: 15 },
  searchIcon: { width: 20, height: 20, marginRight: 10, marginLeft: 10 },
  searchInput: { flex: 1, fontSize: 16 },
   itemContainer: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  itemText: { fontSize: 16 },
  noResult: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#888" },
  searchResultsContainer: {
    maxHeight: 300,  // Set a max height to keep it visible
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 5,
    marginHorizontal: 10,
  },

  // Bottom Navigation
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd", paddingVertical: 10, justifyContent: "space-around", alignItems: "center", height: 70 },
  navItem: { alignItems: "center" },
  navIcon: { width: 30, height: 30 },
  navText: { fontSize: 14, color: "#888" },
  navTextActive: { fontSize: 14, fontWeight: "bold", color: "green" },
});

export default HomeScreen;
