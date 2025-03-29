import React from "react";
 import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
 import { useRouter } from "expo-router";
 import Icon from "react-native-vector-icons/MaterialIcons";
 
 // Import images
 const TomatoImage = require("../assets/images/tomato.png");
 const OnionImage = require("../assets/images/onion.png");
 const BarnyardImage = require("../assets/images/barnyard.png");
 
 const orders = [
   {
     id: "AGRI-123456",
     date: "Sun, 16 Mar",
     status: "Shipped",
     deliveryDate: "Wed, 19 Mar",
     items: [{ name: "Tomato", weight: "15 kg", variety: "Desi Varieties", image: TomatoImage }],
   },
   {
     id: "AGRI-654321",
     date: "Fri, 27 Dec",
     status: "Delivered",
     deliveryDate: "Sun, 29 Dec",
     items: [{ name: "Onion", weight: "30 kg", variety: "Small Onion", image: OnionImage }],
   },
 ];
 
 export default function OrdersScreen() {
   const router = useRouter();
 
   return (
     <View style={styles.container}>
       <FlatList
         data={orders}
         keyExtractor={(item) => item.id}
         renderItem={({ item }) => (
           <View style={styles.orderContainer}>
             <Text style={styles.orderId}>Order ID: {item.id}</Text>
 
             {item.items.map((product, index) => (
               <TouchableOpacity
                 key={index}
                 style={styles.productContainer}
                 // onPress={() => router.push({ pathname: "/orderdetail/[id]", params: { id: item.id } })}
                 onPress={() => {
                   console.log("Navigating to:", `/orderdetail/${item.id}`);
                   router.push("/orderdetail");
                 }}
                 
 
               >
                 <Image source={product.image} style={styles.productImage} />
                 <View style={styles.productDetails}>
                   <Text style={styles.productName}>{product.name}</Text>
                   <Text style={styles.productWeight}>{product.weight}</Text>
                 </View>
                 <Icon name="chevron-right" size={24} color="black" />
               </TouchableOpacity>
             ))}
           </View>
         )}
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
   orderContainer: { marginBottom: 20, padding: 10, borderRadius: 8, backgroundColor: "#f9f9f9" },
   orderId: { fontSize: 14, fontWeight: "bold", color: "#000", marginBottom: 10 },
   productContainer: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#fff", borderRadius: 5, marginBottom: 5 },
   productImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
   productDetails: { flex: 1 },
   productName: { fontSize: 14, fontWeight: "bold", color: "#000" },
   productWeight: { fontSize: 12, color: "#777" },
 });