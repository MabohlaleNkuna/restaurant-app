import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createReservation } from '../utils/Api';

const ReservationScreen = () => {
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReservation = async () => {
    if (!restaurant || !date || !time || !partySize) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await createReservation({
        restaurant,
        date, // Ensure this is a valid Date string
        time,
        partySize: parseInt(partySize), // Convert to a number
      });
      alert('Reservation created successfully!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Bad Request: Check the data you are sending.');
      } else {
        alert('Error creating reservation');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Restaurant</Text>
      <TextInput style={styles.input} value={restaurant} onChangeText={setRestaurant} />
      
      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />
      
      <Text style={styles.label}>Time</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} />
      
      <Text style={styles.label}>Party Size</Text>
      <TextInput
        style={styles.input}
        value={partySize}
        onChangeText={setPartySize}
        keyboardType="numeric"
      />
      
      <Button title={loading ? "Saving..." : "Reserve"} onPress={handleReservation} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 16 },
});

export default ReservationScreen;
