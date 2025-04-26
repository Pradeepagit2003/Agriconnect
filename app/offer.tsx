import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/api";

// Define product type
type Product = {
  id: number | string;
  name: string;
  price: number;
  availableQuantity: number;
  img: string;
  userName: string;
  empty?: boolean;
};

const OfferScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}product/offers`);
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const formattedProducts =
    products.length % 2 !== 0
      ? [...products, { id: "dummy", empty: true } as Product]
      : products;

  return (
    <View style={styles.container}>
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

        {/* Product List */}
        <FlatList
          data={formattedProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => {
            if (item.empty) {
              return (
                <View
                  style={[
                    styles.card,
                    { backgroundColor: "transparent", elevation: 0 },
                  ]}
                />
              );
            }

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  router.push({
                    pathname: "/product",
                    params: { data: JSON.stringify(item.id) },
                  });
                }}
              >
                <View style={styles.topRow}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Image
                    source={{ uri: item.img }}
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.farmerName}>{item.userName}</Text>
                  <Text style={styles.productInfo}>
                    Available: {item.availableQuantity} kg
                  </Text>
                  <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.listContainer}
        />
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
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    height: 150,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomRow: {
    flexDirection: "column",
    marginTop: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textTransform: "capitalize",
  },
  farmerName: {
    fontSize: 14,
    color: "#a9a9a9",
    marginVertical: 2,
  },
  productInfo: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#DBFFD4",
    padding: 10,
  },
  bannerImage: {
    width: "70%",
    height: 200,
    resizeMode: "cover",
    alignSelf: "flex-end",
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5, // Reduced height
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default OfferScreen;
