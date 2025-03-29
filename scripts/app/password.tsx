import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ChangePasswordScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>{'<'} Back</Text>
      </TouchableOpacity>

      <Image source={require('@/assets/images/pass.png')} style={styles.lockIcon} />

      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>Please Enter Your Email Address To Receive a Verification Code</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#777" />

      {/* Navigation to the phone number entry screen */}
      <TouchableOpacity onPress={() => router.push('/mobilepass')}>
        <Text style={styles.tryAnotherWay}>Try another Way</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: 'black',
  },
  lockIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tryAnotherWay: {
    color: 'green',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  sendText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
