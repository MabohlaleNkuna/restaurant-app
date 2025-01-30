// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.menuItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ManageReservations')}>
        <Text style={styles.menuItem}>Manage Reservations</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Text style={styles.menuItem}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
        <Text style={styles.profileLink}>Go to Profile</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',  // Keep the menu at the top
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for the menu
    padding: 10,
    zIndex: 1,  // Ensure menu is always on top
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navbar;
