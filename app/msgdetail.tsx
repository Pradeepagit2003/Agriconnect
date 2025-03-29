import React from 'react';
 import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
 import { useRouter } from 'expo-router';
 
 const userIcon = require('@/assets/images/user.jpg');
 const backIcon = require('@/assets/images/back.png');
 const callIcon = require('@/assets/images/call.png');
 const sendIcon = require('@/assets/images/send.png');
 const cameraIcon = require('@/assets/images/camera.png');
 
 const ChatScreen = () => {
   const router = useRouter();
 
   return (
     <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>
         <TouchableOpacity onPress={() => router.back()}>
           <Image source={backIcon} style={styles.icon} />
         </TouchableOpacity>
         <Image source={userIcon} style={styles.userIcon} />
         <Text style={styles.userName}>Selvam</Text>
         <TouchableOpacity>
           <Image source={callIcon} style={styles.icon} />
         </TouchableOpacity>
       </View>
       
       {/* Messages */}
       <ScrollView contentContainerStyle={styles.chatContainer}>
         <View style={styles.receivedMessage}>
           <Text style={styles.receivedText}>Hii sir</Text>
           <Text style={styles.timestamp}>9:03 am</Text>
         </View>
         <View style={styles.sentMessage}>
           <Text style={styles.sentText}>Hii...</Text>
           <Text style={styles.timestamp}>10:00 am</Text>
         </View>
       </ScrollView>
       
       {/* Input Field */}
       <View style={styles.inputContainer}>
         <TouchableOpacity>
           <Image source={cameraIcon} style={styles.cameraIcon} />
         </TouchableOpacity>
         <TextInput style={styles.input} placeholder="Text message" placeholderTextColor="#888" />
         <TouchableOpacity>
           <Image source={sendIcon} style={styles.sendIcon} />
         </TouchableOpacity>
       </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: 'white' },
   header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', elevation: 2 },
   icon: { width: 24, height: 24, marginHorizontal: 10 },
   userIcon: { width: 35, height: 35, borderRadius: 17.5 },
   userName: { fontSize: 18, fontWeight: 'bold', flex: 1 },
   chatContainer: { flexGrow: 1, padding: 15 },
   receivedMessage: { alignSelf: 'flex-start', backgroundColor: '#F2F2F2', padding: 10, borderRadius: 10, marginVertical: 5 },
   receivedText: { fontSize: 16, color: '#333' },
   sentMessage: { alignSelf: 'flex-end', backgroundColor: '#DFFFD6', padding: 10, borderRadius: 10, marginVertical: 5 },
   sentText: { fontSize: 16, color: '#333' },
   timestamp: { fontSize: 12, color: '#888', alignSelf: 'flex-end', marginTop: 2 },
   inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderTopWidth: 1, borderColor: '#ddd' },
   cameraIcon: { width: 24, height: 24, marginHorizontal: 10 },
   input: { flex: 1, fontSize: 16, paddingHorizontal: 10 },
   sendIcon: { width: 40, height: 40 },
 });
 
 export default ChatScreen;