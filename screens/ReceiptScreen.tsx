import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { CheckCircle, Printer, Share2, Home } from 'lucide-react-native';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type ReceiptScreenRouteProp = RouteProp<RootStackParamList, 'Receipt'>;
type ReceiptScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Receipt'>;

type Props = {
  route: ReceiptScreenRouteProp;
  navigation: ReceiptScreenNavigationProp;
};

const ReceiptScreen: React.FC<Props> = ({ route, navigation }) => {
  const { orderData } = route.params;

  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 40px; }
          .brand { color: #FF6B01; font-size: 32px; font-weight: 900; margin-bottom: 10px; }
          .receipt-title { font-size: 20px; font-weight: 700; color: #666; }
          .divider { border-top: 2px dashed #EEE; margin: 30px 0; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 15px; }
          .item-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: 500; }
          .total-section { margin-top: 30px; border-top: 2px solid #EEE; padding-top: 20px; }
          .grand-total { font-size: 24px; font-weight: 900; color: #FF6B01; display: flex; justify-content: space-between; }
          .footer { text-align: center; margin-top: 60px; font-style: italic; color: #999; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">Simba Mart</div>
          <div class="receipt-title">ORDER RECEIPT</div>
        </div>

        <div class="info-row">
          <span>Date:</span>
          <b>${orderData?.date || new Date().toLocaleDateString()}</b>
        </div>
        <div class="info-row">
          <span>Order ID:</span>
          <b>#SM-882941</b>
        </div>
        <div class="info-row">
          <span>Customer:</span>
          <b>Akinremi</b>
        </div>

        <div class="divider"></div>

        <div class="item-row">
          <span>Salmon Nigiri x2</span>
          <span>$25.00</span>
        </div>
        <div class="item-row">
          <span>Wagyu Burger x1</span>
          <span>$18.00</span>
        </div>

        <div class="total-section">
          <div class="info-row">
            <span>Subtotal</span>
            <span>$43.00</span>
          </div>
          <div class="info-row">
            <span>Delivery Fee</span>
            <span>$2.00</span>
          </div>
          <div class="grand-total">
            <span>Total Paid</span>
            <span>${orderData?.total || '$45.00'}</span>
          </div>
        </div>

        <div class="footer">
          Thank you for choosing Simba Mart!
        </div>
      </body>
    </html>
  `;

  const handlePrint = async () => {
    await Print.printAsync({
      html: htmlContent,
    });
  };

  const handleShare = async () => {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.successIconContainer}>
          <View style={styles.iconBg}>
            <CheckCircle size={50} color="#FFFFFF" fill="#FF6B01" />
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>Your order is being prepared</Text>
        </View>

        <View style={styles.receiptCard}>
          <View style={styles.receiptTop}>
            <Text style={styles.brandTitle}>Simba Mart</Text>
            <Text style={styles.receiptDate}>{orderData?.date || new Date().toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order ID</Text>
            <Text style={styles.infoValue}>#SM-882941</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>Credit Card (**** 4242)</Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Salmon Nigiri x2</Text>
            <Text style={styles.itemPrice}>$25.00</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Wagyu Burger x1</Text>
            <Text style={styles.itemPrice}>$18.00</Text>
          </View>
          
          <View style={styles.dashedDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalPrice}>$43.00</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalPrice}>$2.00</Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 10 }]}>
            <Text style={styles.grandLabel}>Total Paid</Text>
            <Text style={styles.grandPrice}>{orderData?.total || '$45.00'}</Text>
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.noteText}>Thank you for choosing Simba Mart!</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handlePrint}>
            <Printer size={20} color="#666" />
            <Text style={styles.actionText}>Print Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Share2 size={20} color="#666" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={styles.homeBtn}
          onPress={() => navigation.navigate('Main')}
        >
          <Home size={20} color="#FFFFFF" />
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 120,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF2EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 22,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Regular',
    marginTop: 5,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  receiptTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 20,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
  receiptDate: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Jost-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    fontFamily: 'Jost-Medium',
  },
  infoValue: {
    fontSize: 13,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  dashedDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#EEE',
    borderStyle: 'dashed',
    marginVertical: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-Medium',
  },
  itemPrice: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  totalPrice: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  grandLabel: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  grandPrice: {
    fontSize: 20,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
  footerNote: {
    marginTop: 30,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    fontFamily: 'Jost-Medium',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 30,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-SemiBold',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  homeBtn: {
    backgroundColor: '#FF6B01',
    height: 58,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    elevation: 8,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  homeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Jost-Bold',
  },
});

export default ReceiptScreen;
