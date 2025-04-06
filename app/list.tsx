import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/api";
import { productData } from "./data.js";

// Define product type
type Product = {
  id: number | string;
  name: string;
  price: number;
  availableQuantity: number;
  img: string;
  empty?: boolean;
};

// Define navigation type
type RootStackParamList = {
  tomatoview: { product: any };
};

export default function List() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data } = useLocalSearchParams();

  const selected = Array.isArray(data) ? JSON.parse(data[0]) : JSON.parse(data);
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        baseUrl + "product/category/" + selected.id
      );
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
    console.log(selected);
    getProducts();
  }, []);

  if (!selected) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  const getSearchResult = (query: any) => {
    return productData.find((product) => product.name === query);
  };

  // Add dummy product if product count is odd
  const formattedProducts =
    products.length % 2 !== 0
      ? [...products, { id: "dummy", empty: true } as Product]
      : products;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{selected.name}</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Fresh Products are ready!</Text>
        <Image source={{ uri: selected.img }} style={styles.bannerImage} />
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Buy Your Products Directly!</Text>

      {/* Empty State */}
      {products.length === 0 && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: "gray" }}>
            No products found in this category.
          </Text>
        </View>
      )}

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
                  {
                    backgroundColor: "transparent",
                    elevation: 0,
                    flex: 1,
                  },
                ]}
              />
            );
          }

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                const searchResult = getSearchResult(item.name);
                router.push({
                  pathname: "/product",
                  params: { data: JSON.stringify(searchResult) },
                });
              }}
            >
              <View style={styles.topRow}>
                <Text style={styles.productName}>{item.name}</Text>
                <Image source={{ uri: item.img }} style={styles.productImage} />
              </View>
              <View style={styles.bottomRow}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 18, color: "red" },
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: 80,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
  banner: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  bannerText: { fontSize: 20, flex: 1 },
  bannerImage: { width: 150, height: 100, resizeMode: "contain" },
  sectionTitle: { fontSize: 18, marginLeft: 20, marginBottom: 10 },
  listContainer: { paddingHorizontal: 10, paddingBottom: 80 },
  card: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    height: 150,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productName: { fontSize: 20, fontWeight: "bold", flex: 1 },
  productImage: { width: 50, height: 50, resizeMode: "contain" },
  bottomRow: { flexDirection: "column", width: "100%", marginTop: 5 },
  productInfo: { fontSize: 16 },
  productPrice: { fontSize: 16 },
});
