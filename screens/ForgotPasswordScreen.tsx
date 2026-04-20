import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { ChevronLeft, Mail, Phone } from 'lucide-react-native';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

type Props = {
  navigation: ForgotPasswordScreenNavigationProp;
};

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState<'Email' | 'Phone'>('Email');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Select which contact details should we use to {'\n'} reset your password
        </Text>

        <View style={styles.methodsWrapper}>
          <TouchableOpacity 
            style={[styles.methodCard, selectedMethod === 'Email' && styles.methodCardActive]}
            onPress={() => setSelectedMethod('Email')}
          >
            <View style={[styles.iconCircle, selectedMethod === 'Email' ? styles.iconCircleActive : styles.iconCircleInactive]}>
              <Mail size={20} color={selectedMethod === 'Email' ? '#FFFFFF' : '#CCC'} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>Email</Text>
              <Text style={styles.methodDesc}>Send to your email</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.methodCard, selectedMethod === 'Phone' && styles.methodCardActive]}
            onPress={() => setSelectedMethod('Phone')}
          >
            <View style={[styles.iconCircle, selectedMethod === 'Phone' ? styles.iconCircleActive : styles.iconCircleInactive]}>
              <Phone size={20} color={selectedMethod === 'Phone' ? '#FFFFFF' : '#CCC'} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>Phone Number</Text>
              <Text style={styles.methodDesc}>Send to your phone number</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.continueBtn}
          onPress={() => navigation.navigate('Congratulations')}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    marginBottom: 12,
    fontFamily: 'Jost-Black',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 35,
    fontFamily: 'Jost-Regular',
  },
  methodsWrapper: {
    gap: 20,
    marginBottom: 40,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#F9F9F9',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardActive: {
    borderColor: '#FF6B01',
    backgroundColor: '#FFFFFF',
    elevation: 10,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleInactive: {
    backgroundColor: '#FFFFFF',
  },
  iconCircleActive: {
    backgroundColor: '#FF6B01',
  },
  methodInfo: {
    marginLeft: 20,
  },
  methodLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  methodDesc: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
    fontFamily: 'Jost-Medium',
  },
  continueBtn: {
    backgroundColor: '#FF6B01',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Bold',
  },
});

export default ForgotPasswordScreen;
