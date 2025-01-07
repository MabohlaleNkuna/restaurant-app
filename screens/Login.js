/*import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ReusableButton from '../components/ReusableButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/Api';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
  
      // Save token to AsyncStorage
      await AsyncStorage.setItem('token', token);
  
      console.log('Login successful:', response.data);
      
      // Navigate to ReservationScreen on successful login
      navigation.navigate('Home'); 
    } catch (error) {
      // Extract meaningful error information
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Login failed:', error.response.data.message || error.response.data);
      } else if (error.request) {
        // No response was received
        console.error('No response from server:', error.request);
      } else {
        // Error setting up the request
        console.error('Error setting up login request:', error.message);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <ReusableButton title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#241D10', marginBottom: 20 },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    fontSize: 16,
    marginBottom: 20,
    padding: 10,
    color: '#4F4F4F',
  },
  link: { color: '#A9A9A9', marginTop: 15, fontSize: 14 },
});

export default Login;*/