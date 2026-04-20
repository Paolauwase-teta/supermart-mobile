import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { BottomTabParamList, RootStackParamList } from '../types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User, MapPin, History, CreditCard, Bell, HelpCircle, LogOut, ChevronRight, Settings, ShieldCheck } from 'lucide-react-native';

type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Profile'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const menuSections = [
    {
      title: 'Global Settings',
      items: [
        { icon: User, title: 'Personal Info', color: '#2D6A4F' },
        { icon: MapPin, title: 'Addresses', color: '#2D6A4F' },
        { icon: ShieldCheck, title: 'Security', color: '#2D6A4F' },
      ]
    },
    {
      title: 'Activity',
      items: [
        { icon: History, title: 'Order History', color: '#2D6A4F' },
        { icon: CreditCard, title: 'Payment Methods', color: '#2D6A4F' },
        { icon: Bell, title: 'Notifications', color: '#2D6A4F' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.headerBtn}>
            <Settings size={22} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' }} 
              style={styles.profileImg} 
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Pro</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Kupa Gourmet</Text>
            <Text style={styles.userEmail}>kupa.gourmet@kupa.com</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statVal}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statVal}>$420</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity 
                  key={iIndex} 
                  style={[styles.menuItem, iIndex === section.items.length - 1 && styles.noBorder]}
                >
                  <View style={styles.menuLeft}>
                    <View style={styles.iconBox}>
                      <item.icon size={20} color={item.color} />
                    </View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                  </View>
                  <ChevronRight size={18} color="#CCC" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.navigate('Auth')}
        >
          <LogOut size={20} color="#EA4335" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 15,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#F9F9F9',
  },
  badge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FF6B01',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Jost-Bold',
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  userEmail: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
    fontFamily: 'Jost-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 25,
    backgroundColor: '#F9F9F9',
    borderRadius: 24,
    padding: 20,
    marginBottom: 35,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Jost-Medium',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#EEE',
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Jost-Bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F9F9F9',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 15,
    color: '#1A1A1A',
    fontFamily: 'Jost-SemiBold',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 25,
    marginTop: 10,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
  },
  logoutText: {
    color: '#EA4335',
    fontSize: 16,
    fontFamily: 'Jost-Black',
  },
});

export default ProfileScreen;
