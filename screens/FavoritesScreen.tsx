import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Heart, ShoppingCart, Star, ChevronLeft } from 'lucide-react-native';
import { PRODUCTS } from '../types/mockData';

const { width } = Dimensions.get('window');

type FavoritesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  // Featured 'Favorites' Demo: Avocado, Pizza, Burger, Cookies
  const favoriteIds = ['21', '11', '12', '15']; 
  const favoriteProducts = PRODUCTS.filter(p => favoriteIds.includes(p.id));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Main')}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introSection}>
          <Text style={styles.introHeading}>Your Curated List</Text>
          <Text style={styles.introSub}>Items you love the most, ready for your kitchen.</Text>
        </View>

        <View style={styles.grid}>
          {favoriteProducts.map(product => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.card}
              onPress={() => navigation.navigate('ProductDetail', { product })}
            >
              <View style={styles.imageWrapper}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.heartWrapper}>
                  <Heart size={18} color="#FF6B01" fill="#FF6B01" />
                </View>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.ratingBox}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.buyBtn}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                >
                  <Text style={styles.buyBtnText}>Buy Now</Text>
                  <ShoppingCart size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {favoriteProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Heart size={80} color="#F0F0F0" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySub}>Start exploring our supermarket to find items you love!</Text>
            <TouchableOpacity 
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.exploreBtnText}>Explore Shop</Text>
            </TouchableOpacity>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  introSection: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  introHeading: {
    fontSize: 18,
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
  },
  introSub: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Jost-Regular',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 50) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imageWrapper: {
    width: '100%',
    height: 120,
    borderRadius: 18,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 12,
  },
  cardInfo: {
    marginTop: 12,
    gap: 6,
  },
  name: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Jost-Bold',
  },
  price: {
    fontSize: 16,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
  buyBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Jost-Bold',
  },
  emptyState: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginTop: 20,
  },
  emptySub: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'Jost-Regular',
    marginTop: 10,
    lineHeight: 22,
  },
  exploreBtn: {
    backgroundColor: '#FF6B01',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 30,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Jost-Black',
  },
});

export default FavoritesScreen;
