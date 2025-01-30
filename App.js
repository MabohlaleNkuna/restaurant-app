import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import AvailableRestaurantsScreen from './screens/User/availableRestaurants';
import ReservationScreen from './screens/User/reservations';
import { StripeProvider } from '@stripe/stripe-react-native';
import HomeScreen from './screens/Home';
import Notifications from './screens/User/notifications';
import CheckoutScreen from './screens/Checkout';
import ManageReservations from './screens/User/manageReservations';
import UserProfile from './screens/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a token stored in AsyncStorage to maintain login state
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('token');
      if (userToken) {
        setIsLoggedIn(true); // User is logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51PyWUREMz50nif55fK8C9cxOdEly9YE9oI3FSiPamkRbdehoxGezQa8sunPYYuqKDmwZPKhsmqZDeBOSmgkZPhhg00hcETCYXE">
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Login'} // Decide initial route based on login status
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ManageReservations" component={ManageReservations} />
          <Stack.Screen name="Reservations" component={ReservationScreen} />
          <Stack.Screen name="AvailableRestaurants" component={AvailableRestaurantsScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
