import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import api from './api'; 

const MyReservations = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/reservations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      Alert.alert('Error', 'Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    Alert.alert(
      'Cancel Reservation',
      'Are you sure you want to cancel this reservation?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await api.put(
                `/api/reservations/${reservationId}`,
                { status: 'Cancelled' },
                { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } }
              );
              if (response.status === 200) {
                setReservations((prev) =>
                  prev.map((res) =>
                    res._id === reservationId ? { ...res, status: 'Cancelled' } : res
                  )
                );
                Alert.alert('Success', 'Reservation cancelled successfully');
              }
            } catch (error) {
              console.error('Error canceling reservation:', error);
              Alert.alert('Error', 'Failed to cancel reservation');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Reservations</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : reservations.length === 0 ? (
        <Text>No reservations found.</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.reservation}>
              <Text style={styles.restaurantName}>{item.restaurant?.name}</Text>
              <Text>{new Date(item.date).toLocaleDateString()} at {item.time}</Text>
              <Text>Party Size: {item.partySize}</Text>
              <Text>Status: <Text style={{ color: item.status === 'Cancelled' ? 'red' : 'green' }}>{item.status}</Text></Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Reservations', { reservationId: item._id })}
                  style={styles.editButton}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <Button
                  title="Cancel"
                  color="red"
                  onPress={() => handleCancel(item._id)}
                  disabled={item.status === 'Cancelled'}
                />
              </View>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservation: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default MyReservations;
