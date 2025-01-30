import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/Api';
import Navbar from '../../components/Navigation';

const AvailableRestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const navigateToReservation = (restaurant) => {
    navigation.navigate('Reservations', { restaurant });
  };

  return (
    <ImageBackground source={require('../../assets/restaurant.jpeg')} style={styles.background}>
      <Navbar/>
      <View style={styles.overlay}>
        <Text style={styles.title}></Text>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigateToReservation(item)}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text>{item.cuisine}</Text>
              <Text>{item.location}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  restaurantName: { fontSize: 18, fontWeight: 'bold' },
});

export default AvailableRestaurantsScreen;
