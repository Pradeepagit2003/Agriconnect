import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/api";

interface Order {
  id: number;
  userId: number;
  productId: number;
  farmerId: number;
  quantity: number;
  totalPrice: number;
  date: string;
  status: string;
}

interface UserResponse {
  userId: number;
  userName: string;
  addresses: string[];
}

interface ProductResponse {
  name: string;
  price: number;
  discount: number;
  img: string;
}

const TrackOrderScreen = () => {
  const { t } = useTranslation();
  const { data } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    customerName: "",
    orderNumber: 0,
    address: "",
    productName: "",
    productPrice: 0,
    productImage: "",
    quantity: 0,
    totalPrice: 0,
    status: "",
    orderedDate: "",
  });

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const { data: orderData }: { data: Order } = await axios.get(
          `${baseUrl}order/${data}`
        );
        console.log(orderData);
        const { data: userData }: { data: UserResponse } = await axios.get(
          `${baseUrl}user/${orderData.userId}`
        );
        const { data: productData }: { data: ProductResponse } =
          await axios.get(`${baseUrl}product/${orderData.productId}`);

        setOrder({
          orderNumber: orderData.id,
          customerName: userData.userName,
          address: userData.addresses?.[0] || "N/A",
          productName: productData.name,
          productImage: productData.img,
          productPrice:
            (productData.price * (100 - productData.discount)) / 100,
          quantity: orderData.quantity,
          totalPrice: orderData.totalPrice,
          status: orderData.status,
          orderedDate: new Date(orderData.date).toLocaleDateString(),
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, []);

  if (loading) {
    return (
      <Text style={{ textAlign: "center", marginTop: 40 }}>Loading...</Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Order")}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          {t("customerName")}:{" "}
          <Text style={styles.value}>{order.customerName}</Text>
        </Text>
        <Text style={styles.label}>
          {t("orderNumber")}:{" "}
          <Text style={styles.value}>{order.orderNumber}</Text>
        </Text>
        <Text style={styles.label}>
          {t("orderedDate")}:{" "}
          <Text style={styles.value}>{order.orderedDate}</Text>
        </Text>
        <Text style={styles.label}>
          {t("address")}: <Text style={styles.value}>{order.address}</Text>
        </Text>
      </View>

      <View style={styles.productContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{t(order.productName)}</Text>
          <Text style={styles.detailText}>
            {t("quantity")}: {order.quantity} kg
          </Text>
          <Text style={styles.detailText}>
            {t("price")}: ₹{order.productPrice}/kg
          </Text>
          <Text style={styles.totalPrice}>
            {t("totalPrice")}: ₹{order.totalPrice}
          </Text>
        </View>
        <Image
          source={{ uri: order.productImage }}
          style={styles.productImage}
        />
      </View>

      <Text style={styles.trackTitle}>{t("Status")}</Text>
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineText}>{t(order.status)}</Text>
        </View>
      </View>

      <Text style={styles.paymentText}>{t("cashOnDelivery")}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  value: {
    fontWeight: "normal",
    color: "#555",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  productDetails: {
    flex: 1,
    marginRight: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
  },
  timeline: {
    borderLeftWidth: 2,
    borderLeftColor: "#007bff",
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  timelineText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 10,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  completeButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TrackOrderScreen;
