import React, { useState, useRef, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet, View, Text, ScrollView, FlatList, Image,
  TouchableOpacity, TextInput, SafeAreaView, Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, BottomTabParamList, RootStackParamList } from '../types/navigation';
import { Bell, Search, Menu as MenuIcon, Plus, Heart, Star, ShoppingCart, MapPin } from 'lucide-react-native';
import { PRODUCTS, CATEGORIES } from '../types/mockData';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const CAT_ITEM_WIDTH = 100;
const CAT_SPACING = 14;

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

  // --- Smooth Continuous & Interactive Carousel Logic ---
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].name);
  const INFINITE_DATA = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];
  const carouselRef = useRef<FlatList>(null);
  const scrollValue = useRef(0);
  const isInteracting = useRef(false);
  const totalWidth = (CAT_ITEM_WIDTH + CAT_SPACING) * CATEGORIES.length;

  useEffect(() => {
    const scroll = () => {
      if (!isFocused || isInteracting.current) {
        animationFrame.current = requestAnimationFrame(scroll);
        return;
      }
      
      scrollValue.current += 1.2; // Smooth crawl speed
      
      // Infinite loop back
      if (scrollValue.current >= totalWidth * 2) {
        scrollValue.current = totalWidth; 
      }
      
      carouselRef.current?.scrollToOffset({
        offset: scrollValue.current,
        animated: false,
      });

      // Update grid below based on center
      const centerPos = scrollValue.current + (width / 2);
      const relativeCenter = centerPos % totalWidth;
      const centeredIndex = Math.floor(relativeCenter / (CAT_ITEM_WIDTH + CAT_SPACING));
      const currentName = CATEGORIES[centeredIndex % CATEGORIES.length].name;
      if (activeCat !== currentName) {
        setActiveCat(currentName);
      }
      
      animationFrame.current = requestAnimationFrame(scroll);
    };

    const animationFrame = { current: 0 };
    animationFrame.current = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationFrame.current);
  }, [totalWidth, isFocused, activeCat]);

  const handleManualScroll = (event: any) => {
    scrollValue.current = event.nativeEvent.contentOffset.x;
  };

  useEffect(() => {
    // Start in the middle segment
    setTimeout(() => {
      scrollValue.current = totalWidth;
      carouselRef.current?.scrollToOffset({ offset: totalWidth, animated: false });
    }, 100);
  }, [totalWidth]);

  // Filtered Products: Prioritize Prepared Foods (Pizza), then Fruits
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

        {/* ── SHOP BY CATEGORY (Smooth Crawler) ── */}
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

          <FlatList
            ref={carouselRef}
            horizontal
            data={INFINITE_DATA}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            onScroll={handleManualScroll}
            onTouchStart={() => { isInteracting.current = true; }}
            onTouchEnd={() => { isInteracting.current = false; }}
            onScrollBeginDrag={() => { isInteracting.current = true; }}
            onScrollEndDrag={() => { isInteracting.current = false; }}
            scrollEventThrottle={16}
            onScrollToIndexFailed={() => {}}
            renderItem={({ item }) => {
              const isActive = activeCat === item.name;
              return (
                <TouchableOpacity
                  style={styles.catCircleItem}
                  onPress={() => navigation.navigate('ProductList', { category: item.name })}
                  onPressIn={() => { isInteracting.current = true; }}
                  onPressOut={() => { isInteracting.current = false; }}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.catCircle,
                    { backgroundColor: item.bg },
                    isActive && styles.catCircleActive,
                  ]}>
                    <Image source={{ uri: item.image }} style={styles.catCircleImg} />
                    {isActive && (
                      <View style={styles.catCircleOverlay}>
                        <View style={styles.shopNowBadge}>
                          <Text style={styles.shopNowText}>SHOP</Text>
                        </View>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.catCircleName, isActive && styles.catCircleNameActive]} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.catCircleCount}>{item.count}</Text>
                </TouchableOpacity>
              );
            }}
          />
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
    color: '#999',
    fontFamily: 'Jost-Medium',
  },
  findFoodText: {
    fontSize: 28,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
    marginTop: 2,
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
  carouselContent: {
    paddingVertical: 10,
    paddingBottom: 20,
  },
  catCircleItem: {
    width: CAT_ITEM_WIDTH,
    alignItems: 'center',
    marginHorizontal: CAT_SPACING / 2,
  },
  catCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  catCircleActive: {
    borderColor: '#FF6B01',
    backgroundColor: '#FFFFFF',
    elevation: 0,
    transform: [{ scale: 1.1 }],
  },
  catCircleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  catCircleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopNowBadge: {
    backgroundColor: '#FF6B01',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 4,
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Jost-Black',
  },
  catCircleName: {
    fontSize: 12,
    color: '#444',
    fontFamily: 'Jost-Bold',
    textAlign: 'center',
    marginTop: 10,
    height: 32,
  },
  catCircleNameActive: {
    color: '#FF6B01',
    fontSize: 13,
  },
  catCircleCount: {
    fontSize: 9,
    color: '#AAA',
    fontFamily: 'Jost-Medium',
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
    color: '#AAA',
    fontFamily: 'Jost-Regular',
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
