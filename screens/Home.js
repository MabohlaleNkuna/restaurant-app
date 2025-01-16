import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/restaurant.jpeg')} style={styles.background}>
      {/* Top Navigation Menu */}
      <View style={styles.menu}>
        
        <TouchableOpacity onPress={() => navigation.navigate('Reservations')}>
          <Text style={styles.menuItem}> Reserve Table</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManageReservations')}>
          <Text style={styles.menuItem}>Manage Reservations</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.overlay}>
        <Text style={styles.restaurantName}>CodeTribe Dining</Text>
        <Text style={styles.tagline}>Fine Dining, Fine Memories</Text>
        <Button title="View restaurants" onPress={() => navigation.navigate('AvailableRestaurants')} color="#ff6347" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  menu: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
  },
  menuItem: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default HomeScreen;
