import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const AddRestaurantScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [availableSlots, setAvailableSlots] = useState('');
  const [imageUri, setImageUri] = useState(null); 

  const handleSelectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 800, maxHeight: 800, quality: 0.8 }, 
      (response) => {
        if (response.didCancel) {
          console.log('Image selection cancelled');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to select an image.');
        } else {
          const uri = response.assets[0]?.uri;
          setImageUri(uri);
        }
      }
    );
  };

  const handleAddRestaurant = async () => {
    if (!name || !location || !cuisine || !availableSlots || !imageUri) {
      Alert.alert('Error', 'All fields, including an image, are required.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          location,
          cuisine,
          imageUri,
          availableSlots: availableSlots.split(',').map((slot) => new Date(slot.trim())),
        }),
      });
  
      if (response.ok) {
        Alert.alert('Success', `Restaurant "${name}" added successfully!`);
        setName('');
        setLocation('');
        setCuisine('');
        setAvailableSlots('');
        setImageUri(null); 
        navigation.navigate('ManageRestaurants'); 
      } else {
        Alert.alert('Error', 'Failed to add restaurant.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Restaurant</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#A9A9A9"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor="#A9A9A9"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Cuisine"
        placeholderTextColor="#A9A9A9"
        value={cuisine}
        onChangeText={setCuisine}
      />
      <TextInput
        style={styles.input}
        placeholder="Available Slots (comma-separated)"
        placeholderTextColor="#A9A9A9"
        value={availableSlots}
        onChangeText={setAvailableSlots}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>
          {imageUri ? 'Change Image' : 'Select Image'}
        </Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.button} onPress={handleAddRestaurant}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#241D10',
    padding: 20,
    justifyContent: 'center',
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  imageButton: {
    backgroundColor: '#004AAD',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  imagePreview: {
    width: '90%', // Adjust width to fit the container
    height: '4pc', // Responsive height (4% of the viewport height)
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'center', // Center the image in the container
    resizeMode: 'contain', // Preserve aspect ratio
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

export default AddRestaurantScreen;
