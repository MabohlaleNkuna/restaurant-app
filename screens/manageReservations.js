import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { fetchReservations, cancelReservation } from '../utils/Api';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const loadReservations = async () => {
      const response = await fetchReservations();
      setReservations(response.data);
    };
    loadReservations();
  }, []);

  const handleCancel = async (id) => {
    await cancelReservation(id);
    setReservations(reservations.filter((res) => res._id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.reservation}>
            <Text>{item.restaurant.name}</Text>
            <Text>{item.date}</Text>
            <Text>{item.time}</Text>
            <Button title="Cancel" onPress={() => handleCancel(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  reservation: { marginBottom: 20, padding: 15, backgroundColor: '#f9f9f9' },
});

export default ManageReservations;
