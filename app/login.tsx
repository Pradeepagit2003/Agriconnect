import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { baseUrl } from "@/constants/api";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(baseUrl + "user/login", {
        email,
        password,
      });
      if (response.status === 200) {
        // await AsyncStorage.setItem("user", JSON.stringify(response.data.id));
        Alert.alert("Success", "Login successful!");
        router.push("/home");
      } else {
        Alert.alert("Error", "Invalid credentials. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>AgriConnect</Text>
      </View>

      <Text style={styles.subtitle}>
        <Text style={{ color: "green" }}>Log in</Text> to your account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleAuthLogin}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?
        <Text style={{ color: "green" }} onPress={() => router.push("/signup")}>
          Sign up
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
    paddingHorizontal: 10,
  },
  logoContainer: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
    paddingVertical: 90,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 50,
    marginTop: -100,
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
  forgotPassword: {
    alignSelf: "flex-end",
    color: "green",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
});

export default LoginScreen;
