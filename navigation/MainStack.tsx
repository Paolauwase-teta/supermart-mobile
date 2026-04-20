import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AuthStack from './AuthStack';
import BottomTabs from './BottomTabs';
import CheckoutScreen from '../screens/CheckoutScreen';
import LocationScreen from '../screens/LocationScreen';
import ReceiptScreen from '../screens/ReceiptScreen';

import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
