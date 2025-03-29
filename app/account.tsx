import React from "react";
 import {
   View,
   Text,
   Image,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
 } from "react-native";
 import { useRouter } from "expo-router";
 import Icon from "react-native-vector-icons/Feather";
 import { LinearGradient } from "expo-linear-gradient";
 
 const AccountScreen = () => {
   const router = useRouter();
 
   // Define menu items with correct routes
   const menuItems = [
     { title: "Orders", subtitle: "Check your order status", icon: "clipboard", route: "/order" },
     { title: "Wishlist", subtitle: "Buy from items saved in wishlist", icon: "heart", route: "/wishlist" },
     { title: "Addresses", subtitle: "Manage your saved addresses", icon: "map-pin", route: "/address" },
     { title: "Profile", subtitle: "Edit/update your profile details", icon: "user", route: "/profile" },
     { title: "Language", subtitle: "Choose your Language", icon: "globe", route: "/language" },
     { title: "Help & Support", subtitle: "Get your Help", icon: "help-circle", route: "/help" },
     { title: "Password", subtitle: "Manage your Password", icon: "lock", route: "/password" },
   ];
 
   return (
     <ScrollView style={styles.container}>
       {/* Header Section with Gradient */}
       <LinearGradient colors={["#FFDEE9", "#B5FFFC"]} style={styles.header}>
         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <Icon name="arrow-left" size={24} color="#000" />
         </TouchableOpacity>
         <Text style={styles.greeting}>Hey Agri {"\n"} User!</Text>
         <Image source={require("../assets/images/farmer.png")} style={styles.profileImage} />
       </LinearGradient>
 
       {/* Menu Items */}
       {menuItems.map((item, index) => (
         <TouchableOpacity
           key={index}
           style={styles.menuItem}
           onPress={() => router.push(item.route)}
         >
           <Icon name={item.icon} size={22} color="#000" style={styles.icon} />
           <View style={styles.textContainer}>
             <Text style={styles.menuTitle}>{item.title}</Text>
             <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
           </View>
         </TouchableOpacity>
       ))}
     </ScrollView>
   );
 };
 
 // Define styles
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
   },
   header: {
     padding: 20,
     alignItems: "center",
     borderBottomLeftRadius: 20,
     borderBottomRightRadius: 20,
   },
   backButton: {
     position: "absolute",
     left: 15,
     top: 15,
   },
   greeting: {
     fontSize: 18,
     fontWeight: "bold",
     textAlign: "center",
     marginTop: 10,
   },
   profileImage: {
     width: 100,
     height: 100,
     borderRadius: 50,
     marginTop: 10,
   },
   menuItem: {
     flexDirection: "row",
     alignItems: "center",
     padding: 15,
     borderBottomWidth: 1,
     borderBottomColor: "#ddd",
   },
   icon: {
     marginRight: 15,
   },
   textContainer: {
     flex: 1,
   },
   menuTitle: {
     fontSize: 16,
     fontWeight: "bold",
   },
   menuSubtitle: {
     fontSize: 12,
     color: "#666",
   },
 });
 
 export default AccountScreen;