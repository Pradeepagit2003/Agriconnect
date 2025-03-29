import React, { useState } from "react";
 import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
 import Icon from "react-native-vector-icons/MaterialCommunityIcons";
 
 const ProductView = () => {
   const [quantity, setQuantity] = useState(20);
 
   return (
     <ScrollView style={styles.container}>
       {/* Product Image */}
       <Image source={require("../assets/images/tomato.png")} style={styles.productImage} />
 
 
       {/* Product Info */}
       <View style={styles.productDetails}>
         <Text style={styles.title}>Tomato</Text>
         <Text style={styles.subtitle}>Desi Varieties</Text>
         <Text style={styles.marketPrice}>Market Price: <Text style={styles.strikeThrough}>₹30</Text> <Text style={styles.discount}>20% Off</Text></Text>
         <Text style={styles.price}>Your Price: ₹24</Text>
         <Text style={styles.priceDrop}>Price Dropped by ₹6</Text>
 
         {/* Quantity Selector */}
         <View style={styles.quantityContainer}>
           <Text style={styles.quantityLabel}>Quantity:</Text>
           <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
             <Icon name="minus-circle" size={24} color="#888" />
           </TouchableOpacity>
           <TextInput style={styles.quantityInput} value={String(quantity)} editable={false} />
           <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
             <Icon name="plus-circle" size={24} color="#888" />
           </TouchableOpacity>
         </View>
 
         {/* About the Product */}
         <Text style={styles.sectionTitle}>About the Product</Text>
         <Text style={styles.description}>
           The tomato is a nutrient-rich fruit used as a vegetable, packed with vitamins and antioxidants.
           It’s versatile, eaten raw or cooked in various dishes worldwide.
         </Text>
         <TouchableOpacity>
           <Text style={styles.readMore}>Read More &gt;</Text>
         </TouchableOpacity>
 
         {/* Delivery Info */}
         <View style={styles.deliveryContainer}>
           <Icon name="truck-delivery" size={24} color="black" />
           <Text style={styles.deliveryText}>Delivery to 639110, Kulithalai</Text>
           <TouchableOpacity>
             <Text style={styles.changeText}>Change</Text>
           </TouchableOpacity>
         </View>
 
         {/* Rating & Review */}
         <View style={styles.ratingContainer}>
           <Text style={styles.rating}>⭐ 4.3/5</Text>
           <Text style={styles.ratingText}>Overall Rating</Text>
           <TouchableOpacity>
             <Text style={styles.rateNow}>Rate</Text>
           </TouchableOpacity>
         </View>
 
         {/* User Review */}
         <View style={styles.reviewContainer}>
           <Text style={styles.reviewTitle}>Most Useful Review</Text>
           <View style={styles.userContainer}>
             <Icon name="account-circle" size={40} color="#888" />
             <View>
               <Text style={styles.userName}>Dayalan</Text>
               <Text style={styles.verified}>✔ Verified Buyer - 12/03/2023</Text>
             </View>
           </View>
           <Text style={styles.reviewText}>
             Absolutely delicious! The tomatoes were fresh, tangy, and had the perfect balance of sweetness and acidity.
             Great for both raw consumption and cooking.
           </Text>
           <TouchableOpacity>
             <Text style={styles.readMore}>Read All Reviews &gt;</Text>
           </TouchableOpacity>
         </View>
 
         {/* Add to Bag */}
         <TouchableOpacity style={styles.addToBagButton}>
           <Text style={styles.addToBagText}>Add to Bag</Text>
         </TouchableOpacity>
       </View>
     </ScrollView>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
   },
   productImage: {
     width: "90%",
     height: 170,
     resizeMode: "contain",
   },
   productDetails: {
     padding: 25,
   },
   title: {
     fontSize: 22,
     fontWeight: "bold",
   },
   subtitle: {
     fontSize: 16,
     color: "#666",
     marginVertical: 10,
   },
   marketPrice: {
     fontSize: 14,
     color: "#666",
     marginVertical: 15,
   },
   strikeThrough: {
     textDecorationLine: "line-through",
     color: "#888",
   },
   discount: {
     color: "green",
     fontWeight: "bold",
   },
   price: {
     fontSize: 18,
     fontWeight: "bold",
     marginTop: 10,
   },
   priceDrop: {
     color: "green",
     marginTop: 4,
   },
   quantityContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginTop: 10,
   },
   quantityLabel: {
     fontSize: 16,
     marginRight: 10,
   },
   quantityInput: {
     borderWidth: 1,
     borderColor: "#ddd",
     padding: 8,
     marginHorizontal: 8,
     width: 50,
     textAlign: "center",
     borderRadius: 5,
   },
   sectionTitle: {
     fontSize: 18,
     fontWeight: "bold",
     marginTop: 20,
   },
   description: {
     fontSize: 14,
     color: "#666",
     marginTop: 8,
   },
   readMore: {
     color: "green",
     marginTop: 5,
   },
   deliveryContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginTop: 20,
   },
   deliveryText: {
     marginLeft: 8,
     fontSize: 16,
   },
   changeText: {
     color: "orange",
     marginLeft: "auto",
   },
   ratingContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginTop: 20,
   },
   rating: {
     fontSize: 18,
     fontWeight: "bold",
   },
   ratingText: {
     marginLeft: 8,
     fontSize: 16,
   },
   rateNow: {
     color: "green",
     marginLeft: "auto",
   },
   reviewContainer: {
     marginTop: 20,
   },
   reviewTitle: {
     fontSize: 18,
     fontWeight: "bold",
   },
   userContainer: {
     flexDirection: "row",
     alignItems: "center",
     marginTop: 10,
   },
   userName: {
     fontSize: 16,
     fontWeight: "bold",
   },
   verified: {
     color: "green",
     fontSize: 12,
   },
   reviewText: {
     fontSize: 14,
     color: "#666",
     marginTop: 8,
   },
   addToBagButton: {
     backgroundColor: "green",
     padding: 16,
     borderRadius: 8,
     alignItems: "center",
     marginTop: 20,
   },
   addToBagText: {
     color: "#fff",
     fontSize: 18,
     fontWeight: "bold",
   },
 });
 
 export default ProductView;