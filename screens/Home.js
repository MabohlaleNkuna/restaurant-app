import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/restaurant.jpeg')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.restaurantName}>CodeTribe Dining</Text>
        <Text style={styles.tagline}>Fine Dining, Fine Memories</Text>
        <Button title="Reserve a Table" onPress={() => navigation.navigate('Reservation')} color="#ff6347" />
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
