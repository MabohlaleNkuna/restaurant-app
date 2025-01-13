import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import AdminDashboardScreen from './screens/Admin/AdminDashboardScreen';
import AddRestaurantScreen from './screens/Admin/AddRestaurantScreen';
import ManageRestaurantsScreen from './screens/Admin/ManageRestaurantsScreen';
import EditRestaurantScreen from './screens/Admin/EditRestaurantScreen';
import ReservationScreen from './screens/User/reservations';
import HomeScreen from './screens/Home';
import ManageReservations from './screens/User/manageReservations';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        {/* Commented out Login and Register screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ManageRestaurants" component={ManageRestaurantsScreen} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} />
        <Stack.Screen name="ManageReservations" component={ManageReservations} />
        <Stack.Screen name="Reservations" component={ReservationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
