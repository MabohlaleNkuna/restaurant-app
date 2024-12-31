import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ReusableButton from '../components/ReusableButton';
import api from '../utils/Api';  

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!password.trim()) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post('/auth/login', { email, password });
      Alert.alert('Success', 'Login successful!');
      // Navigate to next screen or dashboard
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
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
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
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
    marginBottom: 10,
    padding: 10,
    color: '#4F4F4F',
  },
  error: { color: 'red', fontSize: 12, marginBottom: 10, alignSelf: 'flex-start' },
  link: { 
    color: '#004AAD', 
    marginTop: 15, 
    fontSize: 14, 
    textDecorationLine: 'underline', 
  },
});

export default Login;
