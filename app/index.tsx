import { View, Text, TouchableOpacity } from "react-native";
 import { useRouter } from "expo-router";
 
 export default function HomeScreen() {
   const router = useRouter();
 
   return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Text>Welcome to AgriConnect</Text>
       <TouchableOpacity
         onPress={() => router.push("/login")}  // Use "/login" for absolute path
         style={{ marginTop: 20, padding: 10, backgroundColor: "green" }}
       >
         <Text style={{ color: "#fff" }}>Go to Login</Text>
       </TouchableOpacity>
     </View>
   );
 }