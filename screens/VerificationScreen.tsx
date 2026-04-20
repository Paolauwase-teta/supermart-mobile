import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { ChevronLeft, Delete } from 'lucide-react-native';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Verification'>;
  route: any;
};

const VerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { email } = route.params || { email: 'rilfqyauxxx@gmail.com' };
  const [code, setCode] = useState(['', '', '', '']);

  const handleKeyPress = (val: string) => {
    const newCode = [...code];
    const firstEmptyIndex = newCode.findIndex(c => c === '');
    if (firstEmptyIndex !== -1) {
      newCode[firstEmptyIndex] = val;
      setCode(newCode);
    }
  };

  const handleBackspace = () => {
    const newCode = [...code];
    const lastFilledIndex = [...newCode].reverse().findIndex(c => c !== '');
    if (lastFilledIndex !== -1) {
      const actualIndex = 3 - lastFilledIndex;
      newCode[actualIndex] = '';
      setCode(newCode);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Verification Email</Text>
        <Text style={styles.subtitle}>
          Please enter the code we just sent to email {'\n'}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {code.map((digit, i) => (
            <View key={i} style={[styles.otpBox, digit !== '' && styles.otpBoxFilled]}>
              <Text style={styles.otpText}>{digit}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.resendRow}>
          <Text style={styles.resendNormal}>If you didn't receive a code? </Text>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Keypad */}
      <View style={styles.keypad}>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['.', '0', 'delete'],
        ].map((row, i) => (
          <View key={i} style={styles.keypadRow}>
            {row.map(key => (
              <TouchableOpacity 
                key={key} 
                style={styles.key}
                onPress={() => key === 'delete' ? handleBackspace() : handleKeyPress(key)}
              >
                {key === 'delete' ? (
                  <Delete size={24} color="#1A1A1A" />
                ) : (
                  <Text style={styles.keyText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
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
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Jost-Black',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    fontFamily: 'Jost-Regular',
  },
  emailText: {
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 30,
  },
  otpBox: {
    width: 65,
    height: 65,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpBoxFilled: {
    borderColor: '#FF6B01',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  otpText: {
    fontSize: 24,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  resendRow: {
    flexDirection: 'row',
    marginBottom: 35,
  },
  resendNormal: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  resendLink: {
    color: '#FF6B01',
    fontSize: 14,
    fontFamily: 'Jost-Black',
  },
  continueButton: {
    backgroundColor: '#FF6B01',
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Bold',
  },
  keypad: {
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  key: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 26,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
});

export default VerificationScreen;
