import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Dropdown from '../components/Dropdown';
import { createReservation } from '../utils/Api';

const ReservationScreen = () => {
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleReservation = async () => {
    if (!restaurant || !date || !time || !partySize) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await createReservation({
        restaurant,
        date,
        time,
        partySize: parseInt(partySize),
      });
      alert('Reservation created successfully!');
    } catch (error) {
      alert('Error creating reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Restaurant</Text>
      <Dropdown
        selectedValue={restaurant}
        onValueChange={(itemValue) => setRestaurant(itemValue)}
        items={restaurants}
      />

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

      <Button title={loading ? 'Saving...' : 'Reserve'} onPress={handleReservation} disabled={loading} />
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
