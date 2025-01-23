import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native'; 
import { fetchPaymentIntent } from '../utils/Api'; 

const CheckoutScreen = ({ route }) => {
  const { amount } = route.params; 
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation(); 

  const initializePaymentSheet = async () => {
    try {
      // Fetch the clientSecret for the reservation amount
      const clientSecret = await fetchPaymentIntent(amount);
      console.log('Client secret received:', clientSecret);

      // Initialize the payment sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Your Restaurant Name', 
      });

      if (error) {
        console.error('Error initializing payment sheet:', error.message);
        Alert.alert('Error', error.message);
      }
    } catch (error) {
      console.error('Error initializing payment sheet:', error.message);
      Alert.alert('Error initializing payment sheet.');
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else {
        Alert.alert('Payment Successful', 'Thank you for your payment!', [
          {
            text: 'OK',
            onPress: () => {
              
              navigation.navigate('AvailableRestaurants');
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error presenting payment sheet:', error.message);
      Alert.alert('Error completing payment.');
    }
  };

  React.useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Pay Now" onPress={openPaymentSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CheckoutScreen;
