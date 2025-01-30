import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.50.85.11:5000/api',
  headers: { 'Content-Type': 'application/json' },
   
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
      
    }
    return Promise.reject(error);
  }
);

export const fetchReservations = () => api.get('/reservations/');
export const createReservation = (data) => api.post('/reservations', data);
export const updateReservation = (id, data) => api.put(`/reservations/${id}`, data);
export const cancelReservation = (id) => api.delete(`/reservations/${id}`);

export const fetchPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const response = await api.post('/payments/create-payment-intent', {
      amount,
      currency,
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error fetching payment intent:', error.response?.data || error.message);
    throw new Error('Unable to fetch payment intent');
  }
};



export default api;
