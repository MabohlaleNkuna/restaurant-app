import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ReusableButton from '../components/ReusableButton'; 
import api from '../utils/Api'; 

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    
    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (!isNaN(username)) {
      newErrors.username = 'Username must not be a number.';
    } else if (username.length < 4) {
      newErrors.username = 'Username must have at least 4 characters.';
    }
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    
    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post('/auth/register', { 
        name: username,  
        email, 
        password 
      });
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A9A9A9"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}
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
      <ReusableButton title="Register" onPress={handleRegister} />  
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default Register;
