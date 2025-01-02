import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import ReservationScreen from './screens/reservation';
import ManageReservations from './screens/manageReservations';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen name="ManageReservations" component={ManageReservations} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
