import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.195:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add JWT token to all requests if it exists
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    console.log('JWT Token:', token); // Log the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

export const fetchReservations = () => api.get('/reservations/user');
export const createReservation = (data) => api.post('/reservations', data);
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const cancelReservation = (id) => api.delete(`/reservations/${id}`);

export default api;
