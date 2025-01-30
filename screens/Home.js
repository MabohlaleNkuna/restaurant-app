// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';
import Navbar from '../components/Navigation';
 

const socket = io("http://192.168.92.198:5000/api"); // Replace with your actual backend URL

const HomeScreen = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Listen for new reservation notifications
    socket.on("newReservation", (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(null), 5000); // Auto-hide after 5s
    });

    return () => {
      socket.off("newReservation"); // Cleanup listener on unmount
    };
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate back to the Login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <ImageBackground source={require('../assets/restaurant.jpeg')} style={styles.background}>
          {/* Notification Banner */}
          {notification && (
            <View style={styles.notification}>
              <Text style={styles.notificationText}>{notification}</Text>
            </View>
          )}

          <View style={styles.overlay}>
            <Text style={styles.restaurantName}>CodeTribe Dining</Text>
            <Text style={styles.tagline}>Fine Dining, Fine Memories</Text>
            <Button title="View restaurants" onPress={() => navigation.navigate('AvailableRestaurants')} color="#ff6347" />
            {/* Logout Button */}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // Make space for the fixed navbar
  },
  notification: {
    position: 'absolute',
    top: 60,
    left: '10%',
    right: '10%',
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  content: {
    flexGrow: 1,  // Ensures content takes the remaining space
    paddingTop: 100,  // Add extra space to avoid navbar overlap
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
