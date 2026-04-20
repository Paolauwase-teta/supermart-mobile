import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { Soup } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding1'>;
};

const Onboarding1: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/icon.png')} style={styles.miniLogo} />
            <Text style={styles.logoText}>Simba Mart</Text>
          </View>

          <View style={styles.imageWrapper}>
            <View style={styles.orbitCircle}>
              <View style={[styles.miniCircle, { top: -20, left: '60%' }]}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200' }} style={styles.miniImg} />
              </View>
              <View style={[styles.miniCircle, { bottom: 20, right: -20 }]}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' }} style={styles.miniImg} />
              </View>
              <View style={[styles.miniCircle, { top: '50%', left: -30 }]}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1546767012-149d679659cd?w=200' }} style={styles.miniImg} />
              </View>
              
              <View style={styles.mainCircleWrapper}>
                <View style={styles.mainCircle}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800' }} 
                    style={styles.mainImg} 
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>All your{'\n'}favorites foods</Text>
            <Text style={styles.subtitle}>
              Order your favorite menu with easy{'\n'}on-demand delivery
            </Text>
            
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={() => navigation.navigate('Onboarding2')}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    minHeight: Dimensions.get('window').height,
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    gap: 12,
  },
  miniLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 22,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  imageWrapper: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'aliceblue',
    borderRadius: width * 0.35,
  },
  orbitCircle: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    borderWidth: 1.5,
    borderColor: 'rgba(255,107,1,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainCircleWrapper: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.3,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  mainCircle: {
    width: width * 0.42,
    height: width * 0.42,
    borderRadius: width * 0.21,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  mainImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  miniCircle: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#FFFFFF',
    padding: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    zIndex: 10,
  },
  miniImg: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  content: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 34,
    fontFamily: 'Jost-Black',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    fontFamily: 'Jost-Regular',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
  },
  activeDot: {
    backgroundColor: '#FF6B01',
    width: 24,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#FFFFFF',
  },
  continueBtn: {
    backgroundColor: '#FF6B01',
    width: '100%',
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Jost-Bold',
  },
  signInText: {
    color: '#FF6B01',
    fontSize: 16,
    fontFamily: 'Jost-SemiBold',
  },
});

export default Onboarding1;

