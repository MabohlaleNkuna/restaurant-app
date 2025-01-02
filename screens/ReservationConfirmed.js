import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ReservationConfirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thank you for your reservation!</Text>
      <Text style={styles.subHeader}>We look forward to serving you at The Gourmet Bistro.</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} color="#ff6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
});

export default ReservationConfirmation;
