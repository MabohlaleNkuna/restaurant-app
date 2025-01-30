import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchNotifications, markNotificationAsRead } from '../../utils/Api';
import Navbar from '../../components/Navigation';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await fetchNotifications();
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map(n => (n._id === id ? { ...n, isRead: true } : n)));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <>
      <Navbar />
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRead(item._id)} style={[styles.notification, item.isRead ? styles.read : styles.unread]}>
            <Text>{item.message}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  notification: { padding: 10, marginBottom: 10, borderRadius: 5 },
  unread: { backgroundColor: '#d9f7be' },
  read: { backgroundColor: '#f0f0f0' },
});

export default Notifications;
