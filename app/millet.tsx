import React from 'react';
 import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import { Ionicons } from '@expo/vector-icons';
 import { millets } from './data2'; // Import millets data
 
 export default function MilletsScreen() {
   const navigation = useNavigation();
 
   return (
     <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Millets</Text>
       </View>
 
       {/* Banner */}
       <View style={styles.banner}>
         <Text style={styles.bannerText}>Healthy Millets for You!</Text>
         <Image source={require('../assets/images/veg.png')} style={styles.bannerImage} />
       </View>
 
       {/* Section Title */}
       <Text style={styles.sectionTitle}>Buy Nutritious Millets Directly!</Text>
 
       {/* Product List */}
       <FlatList
         data={millets}
         keyExtractor={(item) => item.id}
         numColumns={2}
         renderItem={({ item }) => (
           <View style={styles.card}>
             <View style={styles.topRow}>
               <Text style={styles.productName}>{item.name}</Text>
               <Image source={item.image} style={styles.productImage} />
             </View>
             <View style={styles.bottomRow}>
               <Text style={styles.productInfo}>Available: {item.quantity}</Text>
               <Text style={styles.productPrice}>Price: ₹{item.price}</Text>
             </View>
           </View>
         )}
         contentContainerStyle={styles.listContainer}
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
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