import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";

const OfferScreen = () => {
  const products = [
    {
      id: 1,
      name: "Barnyard",
      subName: "Kuthiraivali",
      rating: 4.3,
      weight: "215kg",
      originalPrice: "₹110",
      discountedPrice: "₹55",
      discountText: "50% Off",
      image: require("../assets/images/barnyard.png"),
    },
    {
      id: 2,
      name: "Foxtail",
      subName: "Thinai",
      rating: 4.5,
      weight: "200kg",
      originalPrice: "₹150",
      discountedPrice: "₹75",
      discountText: "50% Off",
      image: require("../assets/images/foxtail.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for all Product"
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        {/* Best Offer Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/images/farmer.png")}
            style={styles.bannerImage}
          />
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bestOfferText}>BEST OFFER</Text>
          </View>
        </View>

        {/* Category Filters */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
         {["Vegetables", "Fruits", "Flowers", "Millets"].map((item, index) => (
           <TouchableOpacity key={index} style={styles.categoryButton}>
             <Text style={styles.categoryText}>{item}</Text>
           </TouchableOpacity>
         ))}
       </ScrollView> */}

        {/* Product List */}
        {products.map((item) => (
          <View style={styles.productCard} key={item.id}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>
                {item.name}-<Text style={styles.subName}>{item.subName}</Text>
              </Text>
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={16} color="#f4b400" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <Text style={styles.productWeight}>{item.weight}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                <Text style={styles.discountedPrice}>
                  {item.discountedPrice}
                </Text>
                <Text style={styles.discountText}>{item.discountText}</Text>
              </View>
              <TouchableOpacity style={styles.addToBagButton}>
                <Text style={styles.addToBagText}>Add to Bag</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Feather name="home" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pricetags-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="shopping-cart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Pushes image to the right
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#DBFFD4",
    padding: 10,
  },
  bannerImage: {
    width: "70%",
    height: 200,
    resizeMode: "cover",
    alignSelf: "flex-end", // Ensures it aligns to the right within the container
  },
  bannerTextContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#ff9800",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bestOfferText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  categoryButton: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    height: 35, // Reduced height
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    marginTop: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    flexShrink: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subName: {
    fontSize: 14,
    color: "#888",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
  },
  productWeight: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#888",
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#27ae60",
  },
  discountText: {
    fontSize: 14,
    color: "#d32f2f",
    marginLeft: 5,
  },
  addToBagButton: {
    marginTop: 10,
    backgroundColor: "green",
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  addToBagText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default OfferScreen;
