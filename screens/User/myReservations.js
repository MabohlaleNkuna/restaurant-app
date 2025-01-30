import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import api from './api';  // Your axios instance or API handler

const MyReservations = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/reservations/');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const response = await api.put(`/api/reservations/${reservationId}/cancel`);
      if (response.status === 200) {
        // Optimistically remove the cancelled reservation from the list
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation._id !== reservationId)
        );
        alert('Reservation canceled successfully');
      }
    } catch (error) {
      console.error('Error canceling reservation:', error);
      alert('Failed to cancel reservation');
    }
  };

  const handleApprove = async (reservationId) => {
    try {
      const response = await api.put(`/api/reservations/${reservationId}/approve`);
      if (response.status === 200) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === reservationId ? { ...reservation, status: 'Approved' } : reservation
          )
        );
        alert('Reservation approved successfully');
      }
    } catch (error) {
      console.error('Error approving reservation:', error);
      alert('Failed to approve reservation');
    }
  };

  const handleConfirm = async (reservationId) => {
    try {
      const response = await api.put(`/api/reservations/${reservationId}/confirm`);
      if (response.status === 200) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation._id === reservationId ? { ...reservation, status: 'Confirmed' } : reservation
          )
        );
        alert('Reservation confirmed successfully');
      }
    } catch (error) {
      console.error('Error confirming reservation:', error);
      alert('Failed to confirm reservation');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.reservation}>
              <Text>{item.restaurant.name}</Text>
              <Text>{item.date} at {item.time}</Text>
              <Text>Party Size: {item.partySize}</Text>
              <Text>Status: {item.status}</Text> {/* Show reservation status */}

              
              <TouchableOpacity onPress={() => navigation.navigate('Reservation', { reservationId: item._id })}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <Button title="Cancel" onPress={() => handleCancel(item._id)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  reservation: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
};

export default MyReservations;
