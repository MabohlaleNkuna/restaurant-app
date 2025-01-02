import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { fetchReservations, cancelReservation } from '../utils/Api';
import PushNotification from 'react-native-push-notification';

const setNotification = (reservation) => {
    const notificationTime = new Date(reservation.date + ' ' + reservation.time).getTime() - (24 * 60 * 60 * 1000); 
  
    PushNotification.localNotificationSchedule({
      message: `Your reservation at ${reservation.restaurant.name} is tomorrow!`,
      date: new Date(notificationTime),
    });
  };

const ManageReservations = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserReservations = async () => {
      setLoading(true);
      try {
        const response = await fetchReservations();
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReservations();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelReservation(id);
      setReservations(reservations.filter(reservation => reservation._id !== id)); // Remove canceled reservation
      alert('Reservation canceled successfully');
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  const handleEdit = (reservationId) => {
    navigation.navigate('Reservation', { reservationId });
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
              <TouchableOpacity onPress={() => handleEdit(item._id)}>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ff6347',
      marginBottom: 20,
    },
    reservationCard: {
      backgroundColor: '#f8f8f8',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    reservationDetails: {
      fontSize: 16,
      marginBottom: 10,
    },
  });

export default ManageReservations;
