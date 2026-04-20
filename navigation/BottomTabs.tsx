import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Home, Heart, Bell, User, ShoppingBag, ShoppingCart } from 'lucide-react-native';
import HomeStack from './HomeStack';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={styles.customBtnWrapper}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customBtn}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Home size={24} color={focused ? '#FF6B01' : '#999'} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Heart size={24} color={focused ? '#FF6B01' : '#999'} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: () => (
            <ShoppingCart size={28} color="#FFFFFF" strokeWidth={2.5} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Bell size={24} color={focused ? '#FF6B01' : '#999'} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.profileIconWrapper, focused && styles.profileActive]}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }} 
                style={styles.profileIconImg} 
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 70,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    paddingBottom: 0,
    overflow: 'visible', // Ensure floating button isn't clipped
  },
  customBtnWrapper: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  customBtn: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FF6B01',
    elevation: 10,
    shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  profileIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#999',
  },
  profileActive: {
    borderColor: '#FF6B01',
    borderWidth: 2,
  },
  profileIconImg: {
    width: '100%',
    height: '100%',
  },
});

export default BottomTabs;
