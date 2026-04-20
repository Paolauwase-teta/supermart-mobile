import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainStack from './navigation/MainStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { 
  Jost_400Regular, 
  Jost_500Medium, 
  Jost_600SemiBold, 
  Jost_700Bold, 
  Jost_900Black 
} from '@expo-google-fonts/jost';
import { View } from 'react-native';

import { CartProvider } from './context/CartContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Jost_400Regular,
          Jost_500Medium,
          Jost_600SemiBold,
          Jost_700Bold,
          Jost_900Black,
          'Jost-Regular': Jost_400Regular,
          'Jost-Medium': Jost_500Medium,
          'Jost-SemiBold': Jost_600SemiBold,
          'Jost-Bold': Jost_700Bold,
          'Jost-Black': Jost_900Black,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we need this to
      // remain visible until some other condition is met, we can remove this
      // and call it manually.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer>
            <MainStack />
            <StatusBar style="dark" />
          </NavigationContainer>
        </CartProvider>
      </SafeAreaProvider>
    </View>
  );
}

