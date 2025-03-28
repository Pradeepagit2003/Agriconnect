import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="home" options={{ title: "Home Page" }} />
      <Stack.Screen name="vegetable" options={{ title: "Vegetables" }} />
      <Stack.Screen name="tomatoview" options={{ title: "Tomato View" }} />
      <Stack.Screen name="proceed" options={{ title: "Proceed" }} />
      <Stack.Screen name="payment" options={{ title: "Payment" }} />
      <Stack.Screen name="address" options={{ title: "Address" }} />
      <Stack.Screen name="pay" options={{ title: "Pay" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen name="language" options={{ title: "Language" }} />
      <Stack.Screen name="wishlist" options={{ title: "Wishlist" }} />
      <Stack.Screen name="order" options={{ title: "order" }} />
      <Stack.Screen name="user" options={{ title: "user" }} />
      <Stack.Screen name="password" options={{ title: "password" }} />
      <Stack.Screen name="account" options={{ title: "account" }} />
      <Stack.Screen name="orderdetail" options={{ title: "Order Details" }} />
      <Stack.Screen name="mobilepass" options={{ title: "mobilepass" }} />
      <Stack.Screen name="msgdetail" options={{ title: "msgdetail" }} />

    </Stack>
  );
}
