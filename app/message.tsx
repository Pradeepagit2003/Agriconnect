import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Import useRouter()

// Import Icons
const backIcon = require("../assets/images/back.png");
const searchIcon = require("../assets/images/search.jpg");
const profileIcon = require("../assets/images/profile.png");
const homeIcon = require("../assets/images/home.png");
const offerIcon = require("../assets/images/offer.png");
const messageIcon = require("../assets/images/message.png");
const cartIcon = require("../assets/images/cart.png");
const userPlaceholder = require("../assets/images/user.jpg");

const messages = [
  { id: 1, name: "Selvam", message: "Hi...", time: "10:00 am", unread: 1 },
  {
    id: 2,
    name: "Arun",
    message: "That’s a bit high. Can you...",
    time: "8:00 am",
    unread: 0,
  },
];

const MessageScreen = () => {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
         <TouchableOpacity onPress={() => router.back()}>
           <Image source={backIcon} style={styles.backIcon} />
         </TouchableOpacity>
         <Text style={styles.title}>Message</Text>
         <TouchableOpacity>
           <Image source={profileIcon} style={styles.profileIcon} />
         </TouchableOpacity>
       </View> */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Messages"
          placeholderTextColor="#888"
        />
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messageList}>
        {messages.map((msg) => (
          <TouchableOpacity
            key={msg.id}
            style={styles.messageItem}
            onPress={() => router.push(`/msgdetail?name=${msg.name}`)} // Navigate with query params
          >
            <Image source={userPlaceholder} style={styles.userIcon} />
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{msg.name}</Text>
              <Text style={styles.messagePreview}>{msg.message}</Text>
            </View>
            <Text style={styles.timestamp}>{msg.time}</Text>
            {msg.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{msg.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/home")}
        >
          <Image source={homeIcon} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/offer")}
        >
          <Image source={offerIcon} style={styles.navIcon} />
          <Text style={styles.navText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeTab]}>
          <Image source={messageIcon} style={styles.navIcon} />
          <Text style={styles.navTextActive}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/cart")}
        >
          <Image source={cartIcon} style={styles.navIcon} />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#E6F4E6",
  },
  backIcon: { width: 20, height: 20 },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  profileIcon: { width: 30, height: 30, borderRadius: 15 },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    margin: 15,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  searchIcon: { width: 18, height: 18, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  // Messages List
  messageList: { flex: 1 },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  userIcon: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  messageContent: { flex: 1 },
  senderName: { fontSize: 16, fontWeight: "bold", color: "#2A7F2A" },
  messagePreview: { fontSize: 14, color: "#777" },
  timestamp: { fontSize: 12, color: "#999", marginRight: 10 },
  unreadBadge: {
    backgroundColor: "green",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadText: { color: "#fff", fontSize: 12, fontWeight: "bold" },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
  },
  navItem: { alignItems: "center" },
  navIcon: { width: 25, height: 25 },
  navText: { fontSize: 12, color: "#888" },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "green" },
  navTextActive: { fontSize: 12, fontWeight: "bold", color: "green" },
});

export default MessageScreen;
