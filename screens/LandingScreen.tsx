import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type LandingScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

type Props = {
  navigation: LandingScreenNavigationProp;
};

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.title}>SimbaMart</Text>
          <Text style={styles.subtitle}>Your Favorite Snacks,{"\n"}Delivered Fast!</Text>
        </View>

        <View style={styles.imageSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800' }} 
            style={styles.heroImage} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#FF5F1F',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#FF5F1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Jost-Bold',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textSection: {
    paddingHorizontal: 30,
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: '#FF5F1F',
    letterSpacing: -1,
    fontFamily: 'Jost-Black',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'Jost-Medium',
  },
  imageSection: {
    width: width,
    height: width * 1.0,
    justifyContent: 'flex-end',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default LandingScreen;

