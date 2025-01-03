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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <View style={styles.imageContainer}>
              {/* Display Image if available */}
              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.restaurantImage} />
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
                    restaurantId: item._id,
                    updateRestaurant: updateRestaurantInState,
                  })
                }
              >
                <Text style={styles.buttonText}>Update</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#241D10',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4C561',
    marginBottom: 20,
    textAlign: 'center',
  },
  restaurantCard: {
    backgroundColor: '#F4C561',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  restaurantImage: {
    width: 60, 
    height: 60, 
    borderRadius: 8,
    marginRight: 10, 
    resizeMode: 'cover',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#241D10',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#241D10',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F4C561',
  },
});

export default ManageRestaurantsScreen;
