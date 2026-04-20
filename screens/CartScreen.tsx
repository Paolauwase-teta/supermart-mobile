import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, BottomTabParamList } from '../types/navigation';
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2, ArrowRight, Percent } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

type CartScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Cart'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: CartScreenNavigationProp;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItems, updateQuantity, clearCart, subtotal, tax, total } = useCart();

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ${item.price.toFixed(2)}  <Text style={styles.itemQty}>x{item.quantity}</Text>
        </Text>
      </View>
      <View style={styles.stepperVertical}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.stepBtnVerticalTop}>
          <Plus size={14} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.stepBtnVerticalBottom}>
          <Minus size={14} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearCart} style={styles.iconBtn}>
          <Trash2 size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleBold}>My</Text>
        <Text style={styles.titleLight}>Cart List</Text>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20, color: '#999', fontFamily: 'Jost-Medium'}}>Your cart is empty.</Text>}
      />

      <View style={styles.discountContainer}>
        <Percent size={18} color="#FF6B01" style={{opacity: 0.8}} />
        <Text style={styles.discountText}>Do you have any discount code?</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Est.Tax</Text>
            <Text style={styles.summaryValue}>$ {tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          
          <View style={styles.dashedLine} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.placeOrderBtn}
            onPress={() => {
              if (cartItems.length > 0) navigation.navigate('Checkout');
            }}
          >
            <Text style={styles.placeOrderText}>Checkout</Text>
            <ArrowRight size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  titleContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 25,
  },
  titleBold: {
    fontSize: 28,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    lineHeight: 34,
  },
  titleLight: {
    fontSize: 28,
    color: '#666',
    fontFamily: 'Jost-Regular',
    lineHeight: 34,
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  itemImg: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  itemQty: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  stepperVertical: {
    width: 38,
    height: 76,
    borderRadius: 12,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    paddingVertical: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  stepBtnVerticalTop: {
    width: 30,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepBtnVerticalBottom: {
    width: 30,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    gap: 8,
  },
  discountText: {
    color: '#4A4A4A',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  footer: {
    paddingHorizontal: 15,
    paddingBottom: 85, 
    flexShrink: 0,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  totalValue: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  placeOrderBtn: {
    backgroundColor: '#FFC107',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  placeOrderText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontFamily: 'Jost-Black',
  },
});

export default CartScreen;
