import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import AdminDashboardScreen from './screens/Admin/AdminDashboardScreen';
import AddRestaurantScreen from './screens/Admin/AddRestaurantScreen';
import ManageRestaurantsScreen from './screens/Admin/ManageRestaurantsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} />
        <Stack.Screen name="ManageRestaurants" component={ManageRestaurantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
