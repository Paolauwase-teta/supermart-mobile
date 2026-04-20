import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Congratulations'>;
};

import { MaterialCommunityIcons } from '@expo/vector-icons';

const CongratulationsScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconCircle}>
          <Image source={require('../assets/icon.png')} style={styles.congratsLogo} />
        </View>

        <Text style={styles.title}>Congratulation!</Text>
        <Text style={styles.subtitle}>
          Your account is complete, please enjoy the {'\n'} best menu from us.
        </Text>

        <TouchableOpacity 
          style={styles.btn}
          onPress={() => navigation.navigate('Main' as any)}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 40,
    overflow: 'hidden',
  },
  congratsLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Jost-Black',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50,
    fontFamily: 'Jost-Regular',
  },
  btn: {
    backgroundColor: '#FF6B01',
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Black',
  },
});

export default CongratulationsScreen;
