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
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3022/3022513.png' }} 
              style={styles.miniLogo} 
            />
            <Text style={styles.logoText}>Simba Mart</Text>
          </View>

          <View style={styles.imageWrapper}>
            <View style={styles.orbitCircle}>
              {/* Floating Sushi */}
              <View style={[styles.miniCircle, { top: -10, right: 10 }]}>
                <Image source={{ uri: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=300' }} style={styles.miniImg} />
              </View>
              {/* Floating Burger */}
              <View style={[styles.miniCircle, { bottom: 40, right: -15 }]}>
                <Image source={{ uri: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=300' }} style={styles.miniImg} />
              </View>
              {/* Empty Space for the White circle in screenshot */}
              <View style={[styles.miniCircle, { top: '50%', left: -30, backgroundColor: '#FFFFFF' }]} />
              
              <View style={styles.mainCircleWrapper}>
                <View style={styles.mainCircle}>
                  <Image 
                    source={{ uri: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
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
    width: width * 0.75,
    height: width * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: width * 0.375,
  },
  orbitCircle: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.375,
    backgroundColor: '#F8FBFF', // Subtle blue tint like screenshot
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

