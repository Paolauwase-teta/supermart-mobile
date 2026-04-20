import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, BottomTabParamList } from '../types/navigation';
import { ChevronLeft, Heart, Minus, Plus, Star, Timer, Flame, ShoppingCart } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
};

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  const handleAddToCart = () => {
    addToCart(product, qty, selectedToppings);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Curved Top Section */}
        <View style={styles.topSection}>
          <View style={styles.curvedBg} />
          <SafeAreaView style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
              <ChevronLeft size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Heart size={24} color="#FF6B01" fill={product ? '#FF6B01' : 'transparent'} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.imageWrapper}>
            <Image source={{ uri: product.image }} style={styles.mainImg} />
          </View>

          <View style={styles.quantityPill}>
            <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)} style={styles.qtyBtn}>
              <Minus size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{qty}</Text>
            <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsContent}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.categorySub}>Healthy and delicious meal</Text>
          <Text style={styles.description}>
            Fresh {product.name.toLowerCase()} with high-quality ingredients, prepared daily 
            to ensure the best taste and nutritional value for our customers.
            <Text style={styles.readMore}> Read More</Text>
          </Text>

          {/* StatsRow */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.statText}>4.5</Text>
            </View>
            <View style={styles.statItem}>
              <Flame size={16} color="#FF6B01" />
              <Text style={styles.statText}>100 Kcal</Text>
            </View>
            <View style={styles.statItem}>
              <Timer size={16} color="#4A90E2" />
              <Text style={styles.statText}>5-10 Min</Text>
            </View>
          </View>

          {/* Toping for you */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Toping for you</Text>
            <TouchableOpacity onPress={() => setSelectedToppings([])}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ingredientsScroll}>
            {(product.ingredients || ['Tomato', 'Onion', 'Lettuce', 'Cheese', 'Sauce']).map((item, i) => {
              const isSelected = selectedToppings.includes(item);
              return (
                <TouchableOpacity 
                  key={i} 
                  style={[styles.ingredientCard, isSelected && styles.selectedIngredient]}
                  onPress={() => toggleTopping(item)}
                >
                  <View style={styles.ingredientIcon}>
                    <Image 
                      source={{ uri: `https://img.icons8.com/color/48/000000/${item.toLowerCase().replace(' ', '-')}.png` }} 
                      style={styles.iconImg} 
                    />
                    <View style={[styles.badge, { backgroundColor: isSelected ? '#FFD700' : '#000' }]}>
                      {isSelected ? <Minus size={10} color="#000" /> : <Plus size={10} color="#FFF" />}
                    </View>
                  </View>
                  <Text style={styles.ingredientLabel}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>
            <Text style={styles.priceCurrency}>$ </Text>
            {((product?.price || 18) * qty).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <ShoppingCart size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginRight: 8 }} />
          <Text style={styles.addBtnText}>Go To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  topSection: {
    height: width * 1.1,
    alignItems: 'center',
    position: 'relative',
    paddingTop: 10,
  },
  curvedBg: {
    position: 'absolute',
    top: -width * 0.4,
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width * 0.7,
    backgroundColor: '#FF6B01',
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#FFFFFF',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#FFFFFF',
  },
  mainImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  quantityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B01',
    borderRadius: 25,
    padding: 6,
    gap: 15,
    position: 'absolute',
    bottom: 20,
    elevation: 10,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Jost-Bold',
    minWidth: 24,
    textAlign: 'center',
  },
  detailsContent: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  categorySub: {
    fontSize: 15,
    color: '#999',
    fontFamily: 'Jost-Medium',
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginTop: 20,
    fontFamily: 'Jost-Regular',
  },
  readMore: {
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  clearText: {
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
    fontSize: 14,
  },
  ingredientsScroll: {
    gap: 15,
    paddingBottom: 10,
    paddingRight: 25,
  },
  ingredientCard: {
    width: 85,
    height: 95,
    borderRadius: 22,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 5,
  },
  selectedIngredient: {
    borderColor: '#FF6B01',
    backgroundColor: '#FFF5EE',
  },
  ingredientIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
    position: 'relative',
  },
  iconImg: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  ingredientLabel: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'Jost-Medium',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 25,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  priceValue: {
    fontSize: 26,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginTop: 2,
  },
  priceCurrency: {
    color: '#FF6B01',
    fontSize: 20,
  },
  addBtn: {
    backgroundColor: '#000000',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Bold',
  },
});

export default ProductDetailScreen;

