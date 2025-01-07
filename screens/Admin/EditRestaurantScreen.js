import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet } from 'react-native';

const EditRestaurantScreen = ({ route, navigation }) => {
  const { restaurant, updateRestaurantInState } = route.params;
  const [name, setName] = useState(restaurant.name);
  const [location, setLocation] = useState(restaurant.location);
  const [cuisine, setCuisine] = useState(restaurant.cuisine);
  const [imageUri, setImageUri] = useState(restaurant.image);

  useEffect(() => {
    setName(restaurant.name);
    setLocation(restaurant.location);
    setCuisine(restaurant.cuisine);
    setImageUri(restaurant.image);
  }, [restaurant]);

  const handleUpdateRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants/${restaurant._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, cuisine, image: imageUri }),
      });
      if (response.ok) {
        const updatedRestaurant = await response.json();
        updateRestaurantInState(updatedRestaurant);
        Alert.alert('Success', 'Restaurant updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to update restaurant.');
      }
    } catch (error) {
      console.error('Error updating restaurant:', error);
      Alert.alert('Error', 'Failed to update restaurant.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Restaurant</Text>
      {imageUri && <Image source={{ uri: `http://localhost:5000/${imageUri}` }} style={styles.image} />}
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
        placeholder="Image URL"
        value={imageUri}
        onChangeText={setImageUri}
      />
      <Button title="Update Restaurant" onPress={handleUpdateRestaurant} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 10 },
  image: { width: 100, height: 100, marginBottom: 10 },
});

export default EditRestaurantScreen;
