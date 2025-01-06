import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { fetchReservations, cancelReservation } from '../../utils/Api';
import LoadingIndicator from '../../components/LoadingIndicator';
import ReservationCard from '../../components/ReservationCard';

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
      setReservations(reservations.filter((reservation) => reservation._id !== id));
      alert('Reservation canceled successfully');
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReservationCard
              reservation={item}
              onEdit={() => navigation.navigate('Reservation', { reservationId: item._id })}
              onCancel={() => handleCancel(item._id)}
            />
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
});

export default ManageReservations;