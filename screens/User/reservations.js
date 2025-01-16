import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dropdown from '../../components/Dropdown';
import { createReservation } from '../../utils/Api';

const ReservationScreen = ({ route }) => {
  const { restaurant } = route.params; // Get selected restaurant
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurant ? restaurant._id : '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');

  const handleReservation = async () => {
    if (!selectedRestaurant || !date || !time || !partySize) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await createReservation({
        restaurant: selectedRestaurant,
        date,
        time,
        partySize: parseInt(partySize, 10),
      });
      alert('Reservation created successfully!');
    } catch (error) {
      alert('Error creating reservation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Restaurant</Text>
      <Text style={styles.value}>{restaurant?.name || 'Select a restaurant'}</Text>

      <Text style={styles.label}>Choose a Date</Text>
      <Calendar
        onDayPress={(day) => setDate(day.dateString)}
        markedDates={{ [date]: { selected: true, selectedColor: '#ff6347' } }}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput style={styles.input} value={time} onChangeText={setTime} placeholder="Select Time" />

      <Text style={styles.label}>Party Size</Text>
      <TextInput
        style={styles.input}
        value={partySize}
        onChangeText={setPartySize}
        keyboardType="numeric"
      />

      <Button title="Reserve" onPress={handleReservation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 10,
    fontSize: 16,
  },
});

export default ReservationScreen;