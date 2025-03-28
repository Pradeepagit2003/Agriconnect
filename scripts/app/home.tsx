import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Importing images
const homeIcon = require("../assets/images/home.png");
const offerIcon = require("../assets/images/offer.png");
const messageIcon = require("../assets/images/message.png");
const cartIcon = require("../assets/images/cart.png");
const searchIcon = require("../assets/images/search.jpeg");
const bellIcon = require("../assets/images/notification.png");
const heartIcon = require("../assets/images/heart.png");
const profileIcon = require("../assets/images/profile.jpeg");

// Data Arrays
const categories = [
  { name: "Vegetables", img: require("../assets/images/vegetables.jpg"), desc: "Fresh farm vegetables, straight to you!" },
  { name: "Millets", img: require("../assets/images/millets.jpeg"), desc: "Nutritious farm-fresh millets, straight to you!" },
  { name: "Fruits", img: require("../assets/images/fruits.jpeg"), desc: "Handpicked fresh fruits for a healthy life!" },
  { name: "Flowers", img: require("../assets/images/flowers.png"), desc: "Beautiful and fresh flowers for all occasions!" },
  { name: "Green Leafy Veg", img: require("../assets/images/leafy.png"), desc: "Organic green leafy vegetables!" },
  { name: "Coconuts", img: require("../assets/images/coconut.png"), desc: "Fresh and natural coconuts!" },
  { name: "Spices", img: require("../assets/images/spices.jpeg"), desc: "Authentic spices for a flavorful meal!" },
  { name: "Pulses", img: require("../assets/images/pulses.jpg"), desc: "Healthy and nutritious pulses!" }
];
const recentAdded = [{ name: "Recently Added", img: require("../assets/images/recently.jpg"), desc: "Fresh stock just arrived!" }];
const comboOffers = [{ name: "Combo Offer", img: require("../assets/images/combo.jpg"), desc: "Special combo deals on fresh produce!" }];

const HomeScreen = () => {
  const router = useRouter(); // ✅ Use router for navigation

  return (
    <View style={styles.container}>

      {/* Top Navigation */}
<View style={styles.topNav}>
  <Text style={styles.logo}>AgriConnect</Text>
  <View style={styles.navIcons}>
    <Image source={bellIcon} style={styles.navIcon} />
    <Image source={heartIcon} style={styles.navIcon} />
    
    {/* Profile Image with Navigation */}
    <TouchableOpacity onPress={() => router.push("./account")}>
      <Image source={profileIcon} style={styles.profileIcon} />
    </TouchableOpacity>
  </View>
</View>


      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search for all Product" placeholderTextColor="#888" />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Categories */}
        <Text style={styles.header}>Categories</Text>
        <View style={styles.sectionContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => router.push("/vegetable")}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
          
          ))}
        </View>

        {/* Recently Added */}
        <Text style={styles.header}>Recently Added</Text>
        {recentAdded.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.img} style={styles.largeImage} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        {/* Combo Offers */}
        <Text style={styles.header}>Combo Offers</Text>
        {comboOffers.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.img} style={styles.largeImage} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={homeIcon} style={styles.navIcon} />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        {/* ✅ Navigate to Offer Page */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/offer")}>
          <Image source={offerIcon} style={styles.navIcon} />
          <Text style={styles.navText}>Offer</Text>
        </TouchableOpacity>

        {/* ✅ Navigate to Message Page */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/message")}>
          <Image source={messageIcon} style={styles.navIcon} />
          <Text style={styles.navText}>Message</Text>
        </TouchableOpacity>

        {/* ✅ Navigate to Cart Page */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/cart")}>
          <Image source={cartIcon} style={styles.navIcon} />
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
  card: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#f0f0f0", 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 20, 
    width: width * 0.95, 
    alignSelf: "center" 
  },

  image: { width: 250, height: 180, borderRadius: 10, marginRight: 8 },
  largeImage: { width: 150, height: 150, borderRadius: 15, marginRight: 15 },
  textContainer: { flex: 5 },
  itemTitle: { fontSize: 14, fontWeight: "bold", color: "#333" },
  itemDesc: { fontSize: 12, color: "#666" },

  // Top Navigation
  topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  logo: { fontSize: 22, fontWeight: "bold", color: "green" },
  navIcons: { flexDirection: "row" },
  profileIcon: { width: 25, height: 25, borderRadius: 20 },

  // Search Bar
  searchContainer: { flexDirection: "row", backgroundColor: "#f2f2f2", margin: 10, borderRadius: 25, padding: 10, alignItems: "center" },
  searchIcon: { width: 20, height: 20, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  // Bottom Navigation
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd", paddingVertical: 10, justifyContent: "space-around", alignItems: "center", height: 70 },
  navItem: { alignItems: "center" },
  navIcon: { width: 30, height: 30 },
  navText: { fontSize: 14, color: "#888" },
  navTextActive: { fontSize: 14, fontWeight: "bold", color: "green" }
});

export default HomeScreen;
