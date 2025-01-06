import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const ReservationCard = ({ reservation, onEdit, onCancel }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{reservation.restaurant.name}</Text>
      <Text>{reservation.date} at {reservation.time}</Text>
      <Text>Party Size: {reservation.partySize}</Text>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    color: '#007BFF',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ReservationCard;