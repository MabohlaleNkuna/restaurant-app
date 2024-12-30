import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO.... add backend API
    console.log('Logging in:', { email, password });
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#F4C561',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  link: { color: '#A9A9A9', marginTop: 15, fontSize: 14 },
});

export default Login;
