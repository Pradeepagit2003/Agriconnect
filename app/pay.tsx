import React, { useState } from "react";
 import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
 import Icon from "react-native-vector-icons/MaterialCommunityIcons";
 
 const PaymentScreen = () => {
   const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
 
   return (
     <View style={styles.container}>
       {/* Header */}
       <Text style={styles.header}>Payment ₹7560</Text>
 
       {/* Address Section */}
       <View style={styles.addressContainer}>
         <Text style={styles.addressText}>
           210(1), Tamisolai, Nangavaram, Tamisolai, Kulithalai - 639110
         </Text>
         <Icon name="map-marker" size={24} color="black" />
       </View>
 
       {/* Choose Payment */}
       <Text style={styles.chooseText}>Choose your Payment</Text>
 
       {/* Payment Options */}
       {["UPI", "COD"].map((method, index) => (
         <TouchableOpacity
           key={method}
           style={styles.paymentOption}
           onPress={() => setSelectedPayment(method)}
         >
           <View style={styles.radioButton}>
             {selectedPayment === method && <View style={styles.radioSelected} />}
           </View>
           <View>
             <Text style={styles.paymentMethod}>
               {method === "UPI" ? "UPI" : "Cash on Delivery"}
             </Text>
             <Text style={styles.paymentDetail}>
               {method === "UPI" ? "Google" : "Pay at doorstep"}
             </Text>
           </View>
         </TouchableOpacity>
       ))}
 
       {/* Place Order Button */}
       <TouchableOpacity
         style={[
           styles.placeOrderButton,
           { backgroundColor: selectedPayment ? "#FFD700" : "#ccc" },
         ]}
         disabled={!selectedPayment}
       >
         <Text style={styles.placeOrderText}>Place Order</Text>
       </TouchableOpacity>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     padding: 16,
   },
   header: {
     fontSize: 20,
     fontWeight: "bold",
     marginBottom: 16,
   },
   addressContainer: {
     flexDirection: "row",
     alignItems: "center",
     backgroundColor: "#FFF3CD",
     padding: 12,
     borderRadius: 8,
     marginBottom: 16,
   },
   addressText: {
     flex: 1,
     fontSize: 14,
     color: "#333",
   },
   chooseText: {
     fontSize: 16,
     color: "#888",
     marginBottom: 10,
   },
   paymentOption: {
     flexDirection: "row",
     alignItems: "center",
     paddingVertical: 12,
     borderBottomWidth: 1,
     borderBottomColor: "#ddd",
   },
   radioButton: {
     width: 22,
     height: 22,
     borderRadius: 11,
     borderWidth: 2,
     borderColor: "#888",
     justifyContent: "center",
     alignItems: "center",
     marginRight: 12,
   },
   radioSelected: {
     width: 12,
     height: 12,
     borderRadius: 6,
     backgroundColor: "#000",
   },
   paymentMethod: {
     fontSize: 16,
     fontWeight: "bold",
   },
   paymentDetail: {
     fontSize: 14,
     color: "#666",
   },
   placeOrderButton: {
     padding: 14,
     borderRadius: 8,
     alignItems: "center",
     marginTop: 20,
   },
   placeOrderText: {
     fontSize: 16,
     fontWeight: "bold",
   },
 });
 
 export default PaymentScreen;