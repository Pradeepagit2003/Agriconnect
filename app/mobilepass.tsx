import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
 import { useRouter } from 'expo-router';
 
 export default function ChangePassword() {
   const router = useRouter();
 
   return (
     <View style={styles.container}>
       {/* Back Button */}
       <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
         <Text style={styles.backText}>&#x2039; Change Password</Text>
       </TouchableOpacity>
       
       {/* Lock Icon */}
       <View style={styles.iconContainer}>
         <Image source={require('@/assets/images/pass.png')} style={styles.icon} />
       </View>
       
       {/* Instruction Text */}
       <Text style={styles.instructionText}>
         Please Enter Your Phone Number To Receive an OTP
       </Text>
       
       {/* Mobile Number Input */}
       <View style={styles.inputContainer}>
         <TextInput placeholder="Mobile number" keyboardType="phone-pad" style={styles.input} />
       </View>
       
       {/* Alternative Option */}
       <TouchableOpacity style={styles.alternativeOption}>
         <Text style={styles.alternativeText}>Try another Way</Text>
       </TouchableOpacity>
       
       {/* Submit Button */}
       <TouchableOpacity style={styles.submitButton}>
         <Text style={styles.submitText}>Send</Text>
       </TouchableOpacity>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
     alignItems: 'center',
     padding: 20,
   },
   backButton: {
     alignSelf: 'flex-start',
     marginTop: 20,
   },
   backText: {
     fontSize: 18,
     fontWeight: 'bold',
   },
   iconContainer: {
     marginTop: 40,
     marginBottom: 20,
   },
   icon: {
     width: 96,
     height: 96,
   },
   instructionText: {
     textAlign: 'center',
     color: 'gray',
     paddingHorizontal: 20,
     fontSize: 16,
   },
   inputContainer: {
     borderWidth: 1,
     borderColor: 'green',
     marginTop: 20,
     borderRadius: 10,
     width: '100%',
     padding: 10,
   },
   input: {
     fontSize: 16,
     color: 'black',
   },
   alternativeOption: {
     marginTop: 10,
   },
   alternativeText: {
     color: 'green',
     textDecorationLine: 'underline',
     fontSize: 16,
   },
   submitButton: {
     marginTop: 20,
     backgroundColor: 'green',
     paddingVertical: 12,
     paddingHorizontal: 40,
     borderRadius: 10,
   },
   submitText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
 });