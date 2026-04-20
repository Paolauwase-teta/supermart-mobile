import React, { useState, useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet, View, Text, ScrollView, Image,
  TouchableOpacity, TextInput, SafeAreaView, Dimensions,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue, withRepeat, withTiming, cancelAnimation, Easing, runOnJS } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, BottomTabParamList, RootStackParamList } from '../types/navigation';
import { Bell, Search, Menu as MenuIcon, Plus, Heart, Star, ShoppingCart, MapPin } from 'lucide-react-native';
import { PRODUCTS, CATEGORIES } from '../types/mockData';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const CAT_ITEM_WIDTH = 120;
const CAT_SPACING = 15;

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

type Props = { navigation: HomeScreenNavigationProp };

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- Smooth Marquee Logic with Reanimated ---
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].name);
  const isInteracting = useRef(false);

  // Filtered Products for the bottom grid
  const featuredProducts = PRODUCTS.filter(p => (p.rating || 0) >= 4.5)
    .sort((a, b) => {
      const priority = { 'Prepared Foods': 1, 'Fresh Fruits': 2, 'Dairy & Eggs': 3 };
      const aPrio = priority[a.category as keyof typeof priority] || 99;
      const bPrio = priority[b.category as keyof typeof priority] || 99;
      return aPrio - bPrio;
    })
    .slice(0, 10);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn}>
          <MenuIcon size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerBrand}>Simba</Text>
          <Text style={styles.headerBrandSub}>Supermarket</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.cartBadgeContainer}>
              <ShoppingCart size={24} color="#1A1A1A" />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Location')}>
            <MapPin size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Notifications')}>
            <Bell size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome */}
        <View style={styles.welcomeSection}>
          <Text style={styles.heyText}>Hey, Welcome! 👋</Text>
          <Text style={styles.findFoodText}>Find your groceries</Text>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Search size={20} color="#999" />
            <TextInput
              placeholder="Search groceries…"
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Store Location Promotional Banner */}
        <TouchableOpacity 
          style={styles.locationBanner}
          onPress={() => navigation.navigate('Location')}
          activeOpacity={0.9}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerSubtitle}>FIND US NEAR YOU</Text>
            <Text style={styles.bannerTitle}>Simba Store Locations</Text>
            <View style={styles.visitBtn}>
              <Text style={styles.visitText}>View Map</Text>
            </View>
          </View>
          <View style={styles.bannerRight}>
             <MapPin size={40} color="#FF6B01" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>

        {/* ── SHOP BY CATEGORY (Infinite Smooth Glide) ── */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Shop By Category</Text>
              <Text style={styles.sectionSubtitle}>CRAWLING THROUGH FRESHNESS</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ProductList', { category: 'All' })}>
              <Text style={styles.viewAllOrange}>VIEW ALL →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.carouselWrapper}>
            <Carousel
              ref={carouselRef}
              loop
              enabled={!isInteracting.current} // Hard stop when interacting
              autoPlay={!isInteracting.current && isFocused}
              autoPlayInterval={0}
              scrollAnimationDuration={6000} // Extra smooth crawling
              width={CAT_ITEM_WIDTH + CAT_SPACING}
              height={160}
              data={CATEGORIES}
              onSnapToItem={(index) => setActiveCat(CATEGORIES[index].name)}
              renderItem={({ item }) => {
                const isActive = activeCat === item.name;
                return (
                  <TouchableOpacity
                    style={styles.catItem}
                    activeOpacity={0.9}
                    onPressIn={() => { isInteracting.current = true; }}
                    onPressOut={() => { isInteracting.current = false; }}
                    onPress={() => {
                      isInteracting.current = true;
                      navigation.navigate('ProductList', { category: item.name });
                    }}
                  >
                    <View style={[
                      styles.catCircle,
                      { backgroundColor: item.bg },
                      isActive && styles.catCircleActive
                    ]}>
                      <Image source={{ uri: item.image }} style={styles.catImg} />
                    </View>
                    <Text style={[styles.catName, isActive && styles.catNameActive]} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.catCount}>{item.count}</Text>
                  </TouchableOpacity>
                );
              }}
              style={styles.reanimatedCarousel}
            />
          </View>
        </View>

        {/* ── FEATURED PRODUCTS (Aesthetic & Full) ── */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Featured Products</Text>
              <Text style={styles.sectionSubtitle}>TOP PICK FOR YOU</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {featuredProducts.map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.foodCard}
                onPress={() => navigation.navigate('ProductDetail', { product })}
                activeOpacity={0.85}
              >
                <View style={styles.foodImgWrapper}>
                  <Image source={{ uri: product.image }} style={styles.foodImg} />
                  <TouchableOpacity style={styles.heartBtn}>
                    <Heart size={14} color="#EA4335" fill="#EA4335" />
                  </TouchableOpacity>
                </View>

                <View style={styles.foodInfo}>
                  <Text style={styles.foodName} numberOfLines={2}>{product.name}</Text>
                  <View style={styles.ratingRow}>
                    <Star size={11} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.ratingNum}>{product.rating}</Text>
                    <Text style={styles.timeText}> · {product.deliveryTime}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.foodPrice}>${product.price.toFixed(2)}</Text>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => navigation.navigate('ProductDetail', { product })}
                    >
                      <Plus size={15} color="#FFFFFF" strokeWidth={3} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerBrand: {
    fontSize: 22,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
    lineHeight: 26,
  },
  headerBrandSub: {
    fontSize: 10,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
    letterSpacing: 2,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B01',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  heyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  findFoodText: {
    fontSize: 30,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  searchRow: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  locationBanner: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFF5F0',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FFE8DB',
  },
  bannerLeft: {
    flex: 1,
  },
  bannerSubtitle: {
    fontSize: 10,
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
    letterSpacing: 2,
  },
  bannerTitle: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginTop: 4,
  },
  visitBtn: {
    backgroundColor: '#FF6B01',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  visitText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Jost-Bold',
  },
  bannerRight: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Regular',
  },
  sectionBlock: {
    marginBottom: 0,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 25,
  },
  sectionHeading: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
    letterSpacing: 1,
    marginTop: 2,
  },
  viewAllOrange: {
    fontSize: 13,
    color: '#FF6B01',
    fontFamily: 'Jost-Bold',
  },
  carouselWrapper: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  reanimatedCarousel: {
    width: width,
    justifyContent: 'center',
  },
  catItem: {
    width: CAT_ITEM_WIDTH,
    alignItems: 'center',
  },
  catCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  catCircleActive: {
    borderColor: '#FF6B01',
    transform: [{ scale: 1.05 }],
  },
  catImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  catName: {
    fontSize: 14,
    color: '#222',
    fontFamily: 'Jost-Bold',
    marginTop: 10,
    textAlign: 'center',
  },
  catNameActive: {
    color: '#FF6B01',
    transform: [{ scale: 1.05 }],
  },
  catCount: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Jost-SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  foodCard: {
    width: (width - 45) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#F8F8F8',
  },
  foodImgWrapper: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    position: 'relative',
  },
  foodImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 10,
    elevation: 2,
  },
  foodInfo: {
    marginTop: 10,
    gap: 4,
  },
  foodName: {
    fontSize: 14,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNum: {
    fontSize: 11,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  timeText: {
    fontSize: 11,
    color: '#666',
    fontFamily: 'Jost-Bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  foodPrice: {
    fontSize: 16,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
