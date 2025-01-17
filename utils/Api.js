import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.50.85.10:5000/api',
  headers: { 'Content-Type': 'application/json' },
  // timeout: 10000, 
});

// Add JWT token to all requests if it exists
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle token expiry or unauthorized requests
api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('token');
      console.warn('Session expired. Redirecting to login...');
      // Handle redirection logic here if needed
    }
    return Promise.reject(error);
  }
);

export const fetchReservations = () => api.get('/reservations/');
export const createReservation = (data) => api.post('/reservations', data);
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const cancelReservation = (id) => api.delete(`/reservations/${id}`);


export default api;
