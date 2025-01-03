import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import api from '../api'; 

const ManageRestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants'); 
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Restaurants</Text>
      {restaurants.map((restaurant) => (
        <View key={restaurant.id}>
          <Text>{restaurant.name}</Text>
        </View>
      ))}
      <Button title="Add Restaurant" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ManageRestaurantsScreen;
