import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditRestaurantScreen = ({ route, navigation }) => {
  const { restaurantId, updateRestaurant } = route.params;
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [availableSlots, setAvailableSlots] = useState('');

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`);
      const data = await response.json();
      setName(data.name);
      setLocation(data.location);
      setCuisine(data.cuisine);
      setAvailableSlots(data.availableSlots.join(', '));
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };

  const handleUpdateRestaurant = async () => {
    if (!name || !location || !cuisine || !availableSlots) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          cuisine,
          availableSlots: availableSlots.split(',').map((slot) => new Date(slot.trim())),
        }),
      });
  
      if (response.ok) {
        const updatedRestaurant = await response.json();
        updateRestaurant(updatedRestaurant); // Update state in ManageRestaurantsScreen
        Alert.alert('Success', `Restaurant "${updatedRestaurant.name}" updated successfully!`);
        navigation.goBack(); // Go back to ManageRestaurantsScreen
      } else {
        Alert.alert('Error', 'Failed to update restaurant.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };
  

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Edit Restaurant</Text>
  <TextInput
    style={styles.input}
    placeholder="Name"
    value={name}
    onChangeText={setName}
  />
  <TextInput
    style={styles.input}
    placeholder="Location"
    value={location}
    onChangeText={setLocation}
  />
  <TextInput
    style={styles.input}
    placeholder="Cuisine"
    value={cuisine}
    onChangeText={setCuisine}
  />
  <TextInput
    style={styles.input}
    placeholder="Available Slots (comma-separated)"
    value={availableSlots}
    onChangeText={setAvailableSlots}
  />
  {/* Display image if it exists */}
  {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
  <TouchableOpacity style={styles.button} onPress={handleUpdateRestaurant}>
    <Text style={styles.buttonText}>Update</Text>
  </TouchableOpacity>
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
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F4C561',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#241D10',
  },
});

export default EditRestaurantScreen;
