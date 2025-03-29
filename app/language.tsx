import React, { useState } from "react";
 import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
 import { useRouter } from "expo-router";
 import Icon from "react-native-vector-icons/Feather";
 
 const LanguageScreen = () => {
   const router = useRouter();
   const [selectedLanguage, setSelectedLanguage] = useState("English");
 
   return (
     <View style={styles.container}>
       {/* Back Button & Title */}
       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
         <Icon name="arrow-left" size={20} color="#000" />
         <Text style={styles.backText}>Language</Text>
       </TouchableOpacity>
 
       {/* Heading */}
       <Text style={styles.heading}>Choose Your Language</Text>
 
       {/* Language Options */}
       <TouchableOpacity
         style={[
           styles.languageOption,
           selectedLanguage === "English" && styles.selectedOption,
         ]}
         onPress={() => setSelectedLanguage("English")}
       >
         <Text style={styles.languageText}>English</Text>
         <View style={styles.radioCircle}>
           {selectedLanguage === "English" && <View style={styles.selectedDot} />}
         </View>
       </TouchableOpacity>
 
       <TouchableOpacity
         style={[
           styles.languageOption,
           selectedLanguage === "Tamil" && styles.selectedOption,
         ]}
         onPress={() => setSelectedLanguage("Tamil")}
       >
         <Text style={styles.languageText}>தமிழ்</Text>
         <View style={styles.radioCircle}>
           {selectedLanguage === "Tamil" && <View style={styles.selectedDot} />}
         </View>
       </TouchableOpacity>
 
       {/* Info Text */}
       <Text style={styles.infoText}>
         Your Language Preference Can Be Changed at any Time In Settings.
       </Text>
 
       {/* Continue Button */}
       <TouchableOpacity style={styles.continueButton} onPress={() => alert(`Selected: ${selectedLanguage}`)}>
         <Text style={styles.continueText}>Continue</Text>
       </TouchableOpacity>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#FFF",
     paddingHorizontal: 20,
     paddingTop: 40,
     alignItems: "center",
   },
   backButton: {
     flexDirection: "row",
     alignItems: "center",
     alignSelf: "flex-start",
   },
   backText: {
     fontSize: 18,
     marginLeft: 10,
     fontWeight: "bold",
   },
   heading: {
     fontSize: 20,
     fontWeight: "bold",
     marginTop: 40,
     marginBottom: 30,
     color: "#444",
   },
   languageOption: {
     width: "90%",
     paddingVertical: 15,
     borderWidth: 1,
     borderColor: "#4CAF50",
     borderRadius: 25,
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     paddingHorizontal: 20,
     marginBottom: 15,
   },
   selectedOption: {
     backgroundColor: "#E8F5E9",
   },
   languageText: {
     fontSize: 18,
     color: "#000",
   },
   radioCircle: {
     width: 20,
     height: 20,
     borderRadius: 10,
     borderWidth: 2,
     borderColor: "#4CAF50",
     alignItems: "center",
     justifyContent: "center",
   },
   selectedDot: {
     width: 10,
     height: 10,
     borderRadius: 5,
     backgroundColor: "#4CAF50",
   },
   infoText: {
     fontSize: 14,
     color: "#666",
     textAlign: "center",
     marginTop: 20,
     width: "80%",
   },
   continueButton: {
     marginTop: 40,
     backgroundColor: "#4CAF50",
     width: "90%",
     paddingVertical: 15,
     borderRadius: 25,
     alignItems: "center",
   },
   continueText: {
     color: "#FFF",
     fontSize: 18,
     fontWeight: "bold",
   },
 });
 
 export default LanguageScreen;