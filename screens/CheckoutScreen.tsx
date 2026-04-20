import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, BottomTabParamList, RootStackParamList } from '../types/navigation';
import { ChevronLeft, MapPin, CreditCard, Clock, CheckCircle2 } from 'lucide-react-native';

type CheckoutScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Checkout'>,
  BottomTabNavigationProp<BottomTabParamList>
>;

type Props = {
  navigation: CheckoutScreenNavigationProp;
};

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const [addressType, setAddressType] = useState('Home');
  const [paymentType, setPaymentType] = useState('Card');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proceed to Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>Order Will Be Delivered To</Text>
        <View style={styles.addressContainer}>
          <TouchableOpacity 
            style={[styles.addressCard, addressType === 'Home' && styles.selectedCard]}
            onPress={() => setAddressType('Home')}
          >
            <View style={styles.addressLeft}>
              <View style={[styles.radio, addressType === 'Home' && styles.radioActive]}>
                {addressType === 'Home' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressLabel}>Home</Text>
                <Text style={styles.addressText}>52 Riverside St, Norcross</Text>
              </View>
            </View>
            <TouchableOpacity><Text style={styles.editText}>Edit</Text></TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.addressCard, addressType === 'Office' && styles.selectedCard]}
            onPress={() => setAddressType('Office')}
          >
            <View style={styles.addressLeft}>
              <View style={[styles.radio, addressType === 'Office' && styles.radioActive]}>
                {addressType === 'Office' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.addressInfo}>
                <Text style={styles.addressLabel}>Office</Text>
                <Text style={styles.addressText}>12 Business Ave, Nairobi</Text>
              </View>
            </View>
            <TouchableOpacity><Text style={styles.editText}>Edit</Text></TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentContainer}>
          <TouchableOpacity 
            style={[styles.paymentCard, paymentType === 'Card' && styles.selectedCard]}
            onPress={() => setPaymentType('Card')}
          >
            <View style={styles.paymentLeft}>
              <View style={styles.iconBox}>
                <CreditCard size={20} color="#FF6B01" />
              </View>
              <Text style={styles.paymentText}>Credit Card</Text>
            </View>
            <View style={[styles.radio, paymentType === 'Card' && styles.radioActive]}>
              {paymentType === 'Card' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentCard, paymentType === 'Paypal' && styles.selectedCard]}
            onPress={() => setPaymentType('Paypal')}
          >
            <View style={styles.paymentLeft}>
              <View style={styles.iconBox}>
                <Text style={styles.paypalIcon}>P</Text>
              </View>
              <Text style={styles.paymentText}>PayPal</Text>
            </View>
            <View style={[styles.radio, paymentType === 'Paypal' && styles.radioActive]}>
              {paymentType === 'Paypal' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Card Details */}
        {paymentType === 'Card' && (
          <View style={styles.cardEntryContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
              <CreditCard size={20} color="#FF6B01" />
            </View>
            
            <View style={styles.cardPreview}>
              <View style={styles.cardPreviewHdr}>
                <Text style={styles.cardBrand}>VISA</Text>
                <View style={styles.chip} />
              </View>
              <Text style={styles.cardNumberText}>**** **** **** 4242</Text>
              <View style={styles.cardPreviewBottom}>
                <Text style={styles.cardHolder}>Akinremi</Text>
                <Text style={styles.cardExpiry}>12/26</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View style={styles.inputBox}>
                <CreditCard size={18} color="#999" />
                <Text style={styles.placeholderText}>**** **** **** 4242</Text>
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Expiry</Text>
                <View style={styles.inputBox}>
                  <Clock size={18} color="#999" />
                  <Text style={styles.placeholderText}>12/26</Text>
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <View style={styles.inputBox}>
                  <CheckCircle2 size={18} color="#999" />
                  <Text style={styles.placeholderText}>***</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Summary */}
        <View style={styles.totalsCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Charge</Text>
            <Text style={styles.totalValue}>$2.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>$5.30</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.grandLabel}>Total</Text>
            <Text style={styles.grandValue}>$7.30</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.checkoutBtn} 
          onPress={() => navigation.navigate('Receipt', { 
            orderData: { total: '$7.30', date: new Date().toLocaleDateString() } 
          })}
        >
          <Text style={styles.checkoutBtnText}>Confirm and Pay</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 130,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
    fontFamily: 'Jost-Bold',
  },
  addressContainer: {
    gap: 15,
    marginBottom: 35,
  },
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: 'rgba(255, 107, 1, 0.2)',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  radioActive: {
    borderColor: '#FF6B01',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B01',
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  addressText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontFamily: 'Jost-Regular',
  },
  editText: {
    color: '#FF6B01',
    fontSize: 13,
    fontFamily: 'Jost-Bold',
  },
  paymentContainer: {
    gap: 15,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  paymentText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Medium',
  },
  paypalIcon: {
    fontSize: 18,
    color: '#003087',
    fontFamily: 'Jost-Black',
  },
  totalsCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 24,
    padding: 20,
    marginTop: 40,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Jost-Regular',
  },
  totalValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
  grandLabel: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  grandValue: {
    fontSize: 22,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 20,
  },
  checkoutBtn: {
    backgroundColor: '#FF6B01',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Bold',
  },
  cardEntryContainer: {
    marginTop: 10,
    marginBottom: 30,
    gap: 15,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  inputBox: {
    height: 54,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputRow: {
    flexDirection: 'row',
  },
  placeholderText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Medium',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardPreview: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    height: 160,
    justifyContent: 'space-between',
  },
  cardPreviewHdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Jost-Black',
    fontStyle: 'italic',
  },
  chip: {
    width: 35,
    height: 25,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    opacity: 0.8,
  },
  cardNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: 'Jost-Medium',
  },
  cardPreviewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolder: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
    textTransform: 'uppercase',
  },
  cardExpiry: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
});

export default CheckoutScreen;
