import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AddRestaurant')}
      >
        <Text style={styles.buttonText}>Add Restaurant</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ManageRestaurants')}
      >
        <Text style={styles.buttonText}>Manage Restaurants</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241D10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F4C561',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F4C561',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#241D10',
  },
});

export default AdminDashboardScreen;