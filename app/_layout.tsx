import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false  }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up", headerShown: false  }} />
      <Stack.Screen name="home" options={{ title: "Home Page", headerShown: false  }} />
      <Stack.Screen name="vegetable" options={{ title: "Vegetables", headerShown: false  }} />
      <Stack.Screen name="tomatoview" options={{ title: "Tomato View", headerShown: false  }} />
      <Stack.Screen name="proceed" options={{ title: "Proceed", headerShown: false  }} />
      <Stack.Screen name="payment" options={{ title: "Payment", headerShown: false  }} />
      <Stack.Screen name="address" options={{ title: "Address", headerShown: false  }} />
      <Stack.Screen name="pay" options={{ title: "Pay", headerShown: false  }} />
      <Stack.Screen name="profile" options={{ title: "Profile", headerShown: false  }} />
      <Stack.Screen name="language" options={{ title: "Language", headerShown: false  }} />
      <Stack.Screen name="wishlist" options={{ title: "Wishlist", headerShown: false  }} />
      <Stack.Screen name="order" options={{ title: "order", headerShown: false  }} />
      <Stack.Screen name="user" options={{ title: "user", headerShown: false  }} />
      <Stack.Screen name="password" options={{ title: "password", headerShown: false  }} />
      <Stack.Screen name="account" options={{ title: "account", headerShown: false  }} />
      <Stack.Screen name="orderdetail" options={{ title: "Order Details", headerShown: false  }} />
      <Stack.Screen name="mobilepass" options={{ title: "mobilepass", headerShown: false  }} />
      <Stack.Screen name="msgdetail" options={{ title: "msgdetail", headerShown: false  }} />
      <Stack.Screen name="flower" options={{ title: "flower", headerShown: false  }} />
      <Stack.Screen name="fruit" options={{ title: "fruit", headerShown: false  }} />
      <Stack.Screen name="greenveg" options={{ title: "greenveg", headerShown: false  }} />
      <Stack.Screen name="coconut" options={{ title: "coconut", headerShown: false  }} />
      <Stack.Screen name="spices" options={{ title: "spices", headerShown: false  }} />
      <Stack.Screen name="pulses" options={{ title: "pulses", headerShown: false  }} />


   

    </Stack>
  );
}