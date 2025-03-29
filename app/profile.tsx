import React from "react";
 import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
 import Icon from "react-native-vector-icons/FontAwesome";
 import { useNavigation } from "@react-navigation/native";
 
 const ProfileScreen = () => {
   const navigation = useNavigation();
 
   return (
     <View style={styles.container}>
       {/* Back Button */}
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
         <Icon name="arrow-left" size={20} color="black" />
         <Text style={styles.profileText}>Profile</Text>
       </TouchableOpacity>
 
       {/* Profile Image */}
       <View style={styles.imageContainer}>
         <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.profileImage} />
         <TouchableOpacity style={styles.cameraIcon}>
           <Icon name="camera" size={16} color="white" />
         </TouchableOpacity>
       </View>
 
       {/* Profile Details */}
       <View style={styles.detailsContainer}>
         <View style={styles.detailRow}>
           <Icon name="user" size={18} color="black" />
           <View style={styles.detailTextContainer}>
             <Text style={styles.label}>Name</Text>
             <TextInput style={styles.value} defaultValue="Sekar" />
           </View>
         </View>
 
         <View style={styles.detailRow}>
           <Icon name="venus-mars" size={18} color="black" />
           <View style={styles.detailTextContainer}>
             <Text style={styles.label}>Gender</Text>
             <TextInput style={styles.value} defaultValue="Male" />
           </View>
         </View>
 
         <View style={styles.detailRow}>
           <Icon name="envelope" size={18} color="black" />
           <View style={styles.detailTextContainer}>
             <Text style={styles.label}>Email</Text>
             <TextInput style={styles.value} defaultValue="xxxxx@gmail.com" />
           </View>
         </View>
 
         <View style={styles.detailRow}>
           <Icon name="phone" size={18} color="black" />
           <View style={styles.detailTextContainer}>
             <Text style={styles.label}>Phone</Text>
             <TextInput style={styles.value} defaultValue="+91 xxxxxxxxxx" />
           </View>
         </View>
       </View>
 
       {/* Save Button */}
       <TouchableOpacity style={styles.saveButton}>
         <Text style={styles.saveText}>Save</Text>
       </TouchableOpacity>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
   backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
   profileText: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
   imageContainer: { alignItems: "center", marginBottom: 20 },
   profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#ddd" },
   cameraIcon: { position: "absolute", bottom: 0, right: 20, backgroundColor: "green", padding: 5, borderRadius: 20 },
   detailsContainer: { marginBottom: 30 },
   detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
   detailTextContainer: { marginLeft: 10, flex: 1, borderBottomWidth: 1, borderBottomColor: "#ddd" },
   label: { fontSize: 14, color: "black", fontWeight: "bold" },
   value: { fontSize: 14, color: "#555", paddingVertical: 5 },
   saveButton: { backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center" },
   saveText: { color: "white", fontSize: 16, fontWeight: "bold" },
 });
 
 export default ProfileScreen;