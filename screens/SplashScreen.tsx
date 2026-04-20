import React, { useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const RING_SIZE = width * 0.58;

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;
type Props = { navigation: SplashScreenNavigationProp };

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const spinValue = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const loadingOpacity = useSharedValue(0);

  useEffect(() => {
    // Fade in content
    contentOpacity.value = withTiming(1, { duration: 600 });

    // Spin the arc continuously
    spinValue.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );

    // Fade loading text in after 600ms
    loadingOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));

    const timer = setTimeout(() => {
      navigation.replace('Onboarding1');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const loadingStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B01" />

      <Animated.View style={[styles.centerContent, contentStyle]}>
        {/* Ring track (faint white) */}
        <View style={styles.ringTrack}>
          {/* Spinning white arc on top */}
          <Animated.View style={[styles.spinnerArc, spinStyle]} />

          {/* Inner logo circle (White) */}
          <View style={styles.innerCircle}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.logoImg}
            />
            <Text style={styles.brandName}>Simba</Text>
            <Text style={styles.brandSub}>Supermarket</Text>
          </View>
        </View>

        {/* LOADING text (White) */}
        <Animated.View style={[styles.loadingRow, loadingStyle]}>
          {['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'].map((char, i) => (
            <Text key={i} style={styles.loadingChar}>{char}</Text>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B01',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    gap: 50,
  },
  // Outer faint ring (track)
  ringTrack: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Spinning arc — white
  spinnerArc: {
    position: 'absolute',
    width: RING_SIZE + 10,
    height: RING_SIZE + 10,
    borderRadius: (RING_SIZE + 10) / 2,
    borderWidth: 5,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
  },
  innerCircle: {
    width: RING_SIZE * 0.76,
    height: RING_SIZE * 0.76,
    borderRadius: (RING_SIZE * 0.76) / 2,
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  logoImg: {
    width: RING_SIZE * 0.34,
    height: RING_SIZE * 0.34,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 18,
    color: '#FF6B01', // Orange on White circle
    fontFamily: 'Jost-Black',
    letterSpacing: 1,
    marginTop: 4,
  },
  brandSub: {
    fontSize: 12,
    color: '#FF6B01',
    fontFamily: 'Jost-Medium',
    letterSpacing: 0.5,
    opacity: 0.85,
  },
  loadingRow: {
    flexDirection: 'row',
    gap: 4,
  },
  loadingChar: {
    fontSize: 15,
    color: '#FFFFFF', // White text on Orange bg
    fontFamily: 'Jost-Bold',
    letterSpacing: 3,
  },
});

export default SplashScreen;
