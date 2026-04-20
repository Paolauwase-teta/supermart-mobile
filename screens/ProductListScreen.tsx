import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, TextInput, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, BottomTabParamList, RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { Bell, Search, ChevronLeft } from 'lucide-react-native';
import { PRODUCTS, CATEGORIES as MOCK_CATEGORIES } from '../types/mockData';

const { width } = Dimensions.get('window');

type ProductListScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'ProductList'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

type ProductListScreenRouteProp = RouteProp<HomeStackParamList, 'ProductList'>;

type Props = {
  navigation: ProductListScreenNavigationProp;
  route: ProductListScreenRouteProp;
};

const CATEGORIES = ['All', ...MOCK_CATEGORIES.map(c => c.name)];

const ProductListScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialCat = route.params?.category || 'All';
  const [activeCat, setActiveCat] = useState(initialCat);

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageBox}>
        <Image source={{ uri: item.image }} style={styles.productImg} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Notifications')}>
          <Bell size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.topSection}>
        <Text style={styles.smallHeading}>Our Food</Text>
        <Text style={styles.bigHeading}>Special For You</Text>
        
        <View style={styles.searchBar}>
          <Search size={20} color="#999" />
          <TextInput 
            placeholder="Search Your Menus" 
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCat(cat)}
              style={styles.catBtn}
            >
              <Text style={[styles.catText, activeCat === cat && styles.activeCatText]}>{cat}</Text>
              {activeCat === cat && <View style={styles.activeLine} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={PRODUCTS.filter(p => activeCat === 'All' || p.category === activeCat)}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  smallHeading: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Jost-Medium',
  },
  bigHeading: {
    fontSize: 28,
    color: '#FF6B01',
    marginTop: 4,
    fontFamily: 'Jost-Black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 54,
    marginTop: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Jost-Medium',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  catScroll: {
    paddingHorizontal: 25,
    gap: 30,
  },
  catBtn: {
    alignItems: 'center',
  },
  catText: {
    fontSize: 15,
    color: '#666',
    fontFamily: 'Jost-SemiBold',
  },
  activeCatText: {
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  activeLine: {
    width: 20,
    height: 3,
    backgroundColor: '#FF6B01',
    borderRadius: 2,
    marginTop: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 60) / 2,
    marginBottom: 25,
  },
  imageBox: {
    width: '100%',
    height: 150,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  productImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    marginTop: 12,
    gap: 4,
  },
  productName: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  productPrice: {
    fontSize: 14,
    color: '#FF6B01',
    fontFamily: 'Jost-Black',
  },
});

export default ProductListScreen;
