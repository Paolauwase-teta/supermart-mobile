import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.authLogoContainer}>
          <Image source={require('../assets/icon.png')} style={styles.authLogo} />
        </View>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create account and choose favorite menu</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={22} color="#999" /> : <Eye size={22} color="#999" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => navigation.navigate('Verification', { email })}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.termsWrapper}>
          <Text style={styles.termsText}>
            By clicking Register, you agree to our {'\n'}
            <Text style={styles.termsLink}>Terms and Data Policy</Text>.
          </Text>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 35,
    fontFamily: 'Jost-Regular',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  input: {
    backgroundColor: '#F9F9F9',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Medium',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
    height: 56,
    paddingHorizontal: 16,
    fontFamily: 'Jost-Medium',
  },
  registerButton: {
    backgroundColor: '#FF6B01',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signInText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Jost-Regular',
  },
  signInLink: {
    color: '#FF6B01',
    fontSize: 14,
    fontFamily: 'Jost-Bold',
  },
  termsWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
  termsText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'Jost-Regular',
  },
  termsLink: {
    color: '#FF6B01',
    fontFamily: 'Jost-SemiBold',
  },
  authLogoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  authLogo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
});

export default RegisterScreen;
