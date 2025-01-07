import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image } from 'react-native';

const ManageRestaurantsScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
        );
        Alert.alert('Success', 'Restaurant deleted successfully!');
      } else {
        Alert.alert('Error', 'Failed to delete restaurant.');
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      Alert.alert('Error', 'Failed to delete restaurant.');
    }
  };

  const handleDeleteAllRestaurants = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/all`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRestaurants([]);
        Alert.alert('Success', 'All restaurants deleted successfully!');
      } else {
        Alert.alert('Error', 'Failed to delete all restaurants.');
      }
    } catch (error) {
      console.error('Error deleting all restaurants:', error);
      Alert.alert('Error', 'Failed to delete all restaurants.');
    }
  };

  const updateRestaurantInState = (updatedRestaurant) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
      )
    );
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Restaurants</Text>
      <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAllRestaurants}>
        <Text style={styles.buttonText}>Delete All Restaurants</Text>
      </TouchableOpacity>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <View style={styles.imageContainer}>
              {item.image && (
                <Image source={{ uri: `http://localhost:5000/${item.image}` }} style={styles.restaurantImage} />
              )}
              <Text style={styles.restaurantName}>{item.name}</Text>
            </View>
            <Text>{item.location}</Text>
            <Text>{item.cuisine}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('EditRestaurant', {
                    restaurant: item,
                    updateRestaurantInState,
                  })
                }
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteRestaurant(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold' },
  deleteAllButton: { marginVertical: 10, padding: 10, backgroundColor: '#f44336' },
  buttonText: { color: 'white', textAlign: 'center' },
  restaurantCard: { padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0' },
  imageContainer: { flexDirection: 'row', alignItems: 'center' },
  restaurantImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  restaurantName: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { padding: 10, backgroundColor: '#4caf50' },
});

export default ManageRestaurantsScreen;
