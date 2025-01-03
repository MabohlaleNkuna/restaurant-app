import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AdminDashboardScreen from './screens/Admin/AdminDashboardScreen';
import AddRestaurantScreen from './screens/Admin/AddRestaurantScreen';
import ManageRestaurantsScreen from './screens/Admin/ManageRestaurantsScreen';
import EditRestaurantScreen from './screens/Admin/EditRestaurantScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AdminDashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} />
        <Stack.Screen name="ManageRestaurants" component={ManageRestaurantsScreen} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
