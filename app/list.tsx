import React from 'react';
 import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
 import { useNavigation, NavigationProp } from '@react-navigation/native';
 import { Ionicons } from '@expo/vector-icons';
 import { productData, vegetables } from './data.js';
 import { farmerData } from './data.js'
import { router, useLocalSearchParams } from 'expo-router';
 
 // Define the navigation type to properly type-check the navigation params
 type RootStackParamList = {
   tomatoview: { product: any }; // Define expected params for tomatoview
 };
 
 export default function List() {
   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
     const { data } = useLocalSearchParams(); // Get the passed product name
     const selected = Array.isArray(data) ? JSON.parse(data[0]) : JSON.parse(data);
     
        // **Handle case where product is not found**
     if (!selected) {
       return (
         <View style={styles.errorContainer}>
           <Text style={styles.errorText}>Product not found</Text>
         </View>
       );
     }

     const getSearchResult = (query: any) => {
        return productData.find((product) => product.name === query)
       };
       
   return (
     <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>
         <Text style={styles.headerTitle}>{selected.name}</Text>
       </View>
 
       {/* Banner */}
       <View style={styles.banner}>
         <Text style={styles.bannerText}>Fresh Products are ready!</Text>
         <Image source={require('../assets/images/veg.png')} style={styles.bannerImage} />
       </View>
 
       {/* Section Title */}
       <Text style={styles.sectionTitle}>Buy Your Products Directly!</Text>
 
       {/* Product List */}
       <FlatList
         data={selected.products}
         keyExtractor={(item) => item.id}
         numColumns={2}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.card}
             onPress={() =>{
                const searchResult = getSearchResult(item.name);
                router.push({ pathname: "/product", params: { data: JSON.stringify(searchResult) } })// Navigate to tomatoview with product data
             }
            }   
           >
             <View style={styles.topRow}>
               <Text style={styles.productName}>{item.name}</Text>
               <Image source={item.image} style={styles.productImage} />
             </View>
             <View style={styles.bottomRow}>
               <Text style={styles.productInfo}>Available: {item.quantity}</Text>
               <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
             </View>
           </TouchableOpacity>
         )}
         contentContainerStyle={styles.listContainer}
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
   errorText: { fontSize: 18, color: "red" }, 
   container: { flex: 1, backgroundColor: 'white' },
   header: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'green', paddingVertical: 15, paddingHorizontal: 20, height: 80 },
   headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 20 },
   banner: { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 15, flexDirection: 'row', alignItems: 'center', elevation: 5 },
   bannerText: { fontSize: 20, flex: 1 },
   bannerImage: { width: 150, height: 100, resizeMode: 'contain' },
   sectionTitle: { fontSize: 18, marginLeft: 20, marginBottom: 10 },
   listContainer: { paddingHorizontal: 10, paddingBottom: 80 },
   card: { flex: 1, backgroundColor: 'white', margin: 10, borderRadius: 10, padding: 10, elevation: 5, height: 150 },
   topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
   productName: { fontSize: 20, fontWeight: 'bold', flex: 1 },
   productImage: { width: 50, height: 50, resizeMode: 'contain' },
   bottomRow: { flexDirection: 'column', width: '100%', marginTop: 5 },
   productInfo: { fontSize: 16 },
   productPrice: { fontSize: 16 },
 });