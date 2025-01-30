import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/Api'; // Adjust based on your API utility

const UserProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from AsyncStorage or API
    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          // Fetch user data from API or local storage
          const response = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login'); // Redirect to login after logging out
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.label}>Name: {userData.name}</Text>
          <Text style={styles.label}>Email: {userData.email}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#241D10', marginBottom: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  logoutButtonText: { color: '#fff', fontSize: 18 },
});

export default UserProfile;
