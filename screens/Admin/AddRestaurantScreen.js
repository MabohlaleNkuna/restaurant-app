import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
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
          Alert.alert('Notice', 'Image selection cancelled.');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to select an image.');
        } else {
          setImageUri(response.assets[0]?.uri);
        }
      }
    );
  };

  const validateInputs = () => {
    if (!name || !location || !cuisine || !availableSlots) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    const slotsArray = availableSlots.split(',').map((slot) => slot.trim());
    if (!slotsArray.every((slot) => !isNaN(Date.parse(slot)))) {
      Alert.alert('Validation Error', 'Available slots must be valid dates.');
      return false;
    }
    return true;
  };

  const handleAddRestaurant = async () => {
    if (!validateInputs()) return;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('cuisine', cuisine);
  
    // Append each slot as a separate entry
    const slotsArray = availableSlots.split(',').map((slot) => slot.trim());
    slotsArray.forEach((slot) => {
      formData.append('availableSlots', slot);
    });
  
    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'restaurant.jpg',
      });
    }
  
    try {
      const response = await fetch('http://192.168.0.194:5000/api/restaurants', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Restaurant added successfully!');
      } else {
        const error = await response.json();
        console.error('Error:', error.message);
        Alert.alert('Error', error.message);
      }
    } catch (err) {
      console.error('Network Error:', err.message);
      Alert.alert('Error', 'Network Error: ' + err.message);
    }
  };
  

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '20%',
    height: 20,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
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
