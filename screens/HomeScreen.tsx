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
import { Bell, Search, Menu as MenuIcon, Plus, Heart, Star, ShoppingCart } from 'lucide-react-native';
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

  // --- Synced Category & Products Grid Logic ---
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].name);
  const INFINITE_DATA = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];
  const carouselRef = useRef<FlatList>(null);
  const currentIndex = useRef(CATEGORIES.length);
  const isInteracting = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      timer = setInterval(() => {
        if (!isFocused || isInteracting.current) return;
        
        currentIndex.current += 1;
        
        // Loop back if we're at the end of the 3rd segment
        if (currentIndex.current >= CATEGORIES.length * 2.5) {
          currentIndex.current = CATEGORIES.length;
          carouselRef.current?.scrollToIndex({ index: currentIndex.current, animated: false, viewPosition: 0.5 });
        } else {
          carouselRef.current?.scrollToIndex({ index: currentIndex.current, animated: true, viewPosition: 0.5 });
        }
        
        // Update the active category for the grid below
        const activeItem = INFINITE_DATA[currentIndex.current % CATEGORIES.length];
        setActiveCat(activeItem.name);
      }, 2500); // Stop at each category for 2.5 seconds
    };

    startAutoScroll();
    return () => clearInterval(timer);
  }, [isFocused]);

  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const itemFullWidth = CAT_ITEM_WIDTH + CAT_SPACING;
    const centerIndex = Math.round(x / itemFullWidth);
    
    // Smooth infinite wrap-around
    const totalContentWidth = itemFullWidth * CATEGORIES.length;
    if (x >= totalContentWidth * 2) {
      carouselRef.current?.scrollToOffset({ offset: x - totalContentWidth, animated: false });
    } else if (x <= totalContentWidth / 2 && x > 0) {
      carouselRef.current?.scrollToOffset({ offset: x + totalContentWidth, animated: false });
    }

    // Sync activeCat with what's centered (for manual scroll too)
    const normalizedIndex = centerIndex % CATEGORIES.length;
    const currentName = CATEGORIES[normalizedIndex].name;
    if (activeCat !== currentName) {
      setActiveCat(currentName);
    }
  };

  useEffect(() => {
    // Initial position in middle segment
    setTimeout(() => {
      carouselRef.current?.scrollToIndex({ index: CATEGORIES.length, animated: false, viewPosition: 0.5 });
    }, 100);
  }, []);

  // Filtered Products for the Home screen grid based on centered category
  const filteredProducts = PRODUCTS.filter(p => p.category === activeCat);

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

        {/* ── SHOP BY CATEGORY Carousel ── */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Shop By Category</Text>
              <Text style={styles.sectionSubtitle}>TAP TO EXPLORE FULL MENU</Text>
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
            snapToInterval={CAT_ITEM_WIDTH + CAT_SPACING}
            snapToAlignment="center"
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
            onScroll={handleScroll}
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
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.catCircle,
                    { backgroundColor: item.bg },
                    isActive && styles.catCircleActive,
                  ]}>
                    <Image source={{ uri: item.image }} style={styles.catCircleImg} />
                    {isActive && <View style={styles.catCircleOverlay} />}
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

        {/* ── FEATURED PRODUCTS (Synced with Carousel) ── */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Featured In {activeCat}</Text>
              <Text style={styles.sectionSubtitle}>FRESH & HANDPICKED</Text>
            </View>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Updating our fresh inventory...</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredProducts.map(product => (
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
          )}
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
    marginBottom: 15,
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
    marginBottom: 25,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
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
    paddingHorizontal: width / 2 - (CAT_ITEM_WIDTH / 2) - 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  catCircleItem: {
    width: CAT_ITEM_WIDTH,
    alignItems: 'center',
    marginHorizontal: CAT_SPACING / 2,
  },
  catCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  catCircleActive: {
    borderColor: '#FF6B01',
    transform: [{ scale: 1.1 }],
  },
  catCircleImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  catCircleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 107, 1, 0.1)',
  },
  catCircleName: {
    fontSize: 13,
    color: '#444',
    fontFamily: 'Jost-Bold',
    textAlign: 'center',
    marginTop: 10,
    height: 32,
  },
  catCircleNameActive: {
    color: '#FF6B01',
    fontSize: 14,
  },
  catCircleCount: {
    fontSize: 10,
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
  emptyBox: {
    width: '100%',
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#AAA',
    fontFamily: 'Jost-Medium',
  },
});

export default HomeScreen;
