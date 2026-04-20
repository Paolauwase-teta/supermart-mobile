import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../types/navigation';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'Login'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
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
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back, login to your account</Text>

        <View style={styles.form}>
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
            <TouchableOpacity 
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('Verification', { email })}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or login with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <MaterialCommunityIcons name="google" size={24} color="#EA4335" />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <MaterialCommunityIcons name="apple" size={24} color="#000000" />
            <Text style={styles.socialBtnText}>Apple</Text>
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
    fontFamily: 'Jost-Bold',
  },
  input: {
    backgroundColor: '#F9F9F9',
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Medium',
    borderWidth: 0,
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
    fontFamily: 'Jost-Medium',
    height: 56,
    paddingHorizontal: 16,
    margin: 0,
    borderRadius: 14,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: '#FF6B01',
    fontSize: 13,
    fontFamily: 'Jost-Bold',
  },
  loginButton: {
    backgroundColor: '#FF6B01',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Black',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  signUpText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Jost-Regular',
  },
  signUpLink: {
    color: '#FF6B01',
    fontSize: 14,
    fontFamily: 'Jost-Black',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 25,
    gap: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  dividerText: {
    color: '#999',
    fontSize: 13,
    fontFamily: 'Jost-Medium',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 15,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  socialBtnText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
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

export default LoginScreen;

