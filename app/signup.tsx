import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";

const SignUpScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [category, setCategory] = useState("");

  const handleSignUp = () => {
    if (!username || !email || !mobile || !password || !confirmPassword || !category) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>AgriConnect</Text>
      </View>

      <Text style={styles.subtitle}>
        <Text style={{ color: "green" }}>Register</Text> your account
      </Text>

      <TextInput style={styles.input} placeholder="User name" placeholderTextColor="#999" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mobile number" placeholderTextColor="#999" value={mobile} onChangeText={setMobile} />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#999" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="Category (Farmer or Customer)" placeholderTextColor="#999" value={category} onChangeText={setCategory} />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account? 
        <Text style={{ color: "green" }} onPress={() => router.push("/login")}>
          Sign in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 10,
    marginTop: -75,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
});

export default SignUpScreen;
