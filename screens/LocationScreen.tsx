import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,
  Image, ScrollView, Linking, Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import {
  ChevronLeft, MapPin, Phone, Mail, Clock, Navigation,
  Star, CheckCircle,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Location'>;
};

const BRANCHES = [
  {
    id: '1',
    name: 'Simba Mart – CBD Branch',
    address: '12 Kenyatta Ave, Nairobi CBD, Kenya',
    phone: '+254 700 123 456',
    email: 'cbd@simbamart.co.ke',
    hours: 'Mon–Sat: 7am–9pm  |  Sun: 8am–6pm',
    rating: 4.8,
    map: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80',
    lat: '-1.286389',
    lng: '36.817223',
  },
  {
    id: '2',
    name: 'Simba Mart – Westlands',
    address: '45 Waiyaki Way, Westlands, Nairobi',
    phone: '+254 711 987 654',
    email: 'westlands@simbamart.co.ke',
    hours: 'Mon–Sun: 6am–10pm',
    rating: 4.6,
    map: 'https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=800&q=80',
    lat: '-1.269028',
    lng: '36.808586',
  },
  {
    id: '3',
    name: 'Simba Mart – Karen',
    address: 'Karen Shopping Centre, Karen, Nairobi',
    phone: '+254 722 456 789',
    email: 'karen@simbamart.co.ke',
    hours: 'Mon–Sat: 7:30am–8:30pm  |  Sun: 9am–6pm',
    rating: 4.9,
    map: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=800&q=80',
    lat: '-1.319578',
    lng: '36.707287',
  },
];

const LocationScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [savedAs, setSavedAs] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [confirmed, setConfirmed] = useState(false);

  const openMaps = (branch: typeof BRANCHES[0]) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;
    Linking.openURL(url);
  };

  const callBranch = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s/g, '')}`);
  };

  const emailBranch = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Locations</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Map preview of selected branch */}
        <View style={styles.mapCard}>
          <Image source={{ uri: selectedBranch.map }} style={styles.mapImg} />
          <View style={styles.mapOverlay} />
          <View style={styles.mapPinBox}>
            <MapPin size={32} color="#FF6B01" fill="#FF6B01" />
          </View>
          <TouchableOpacity style={styles.directionsBtn} onPress={() => openMaps(selectedBranch)}>
            <Navigation size={15} color="#FFFFFF" />
            <Text style={styles.directionsBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Branch selector */}
        <Text style={styles.sectionLabel}>Select Branch</Text>
        {BRANCHES.map(branch => (
          <TouchableOpacity
            key={branch.id}
            style={[styles.branchCard, selectedBranch.id === branch.id && styles.branchCardActive]}
            onPress={() => setSelectedBranch(branch)}
          >
            <View style={styles.branchLeft}>
              <View style={[styles.radioOuter, selectedBranch.id === branch.id && styles.radioOuterActive]}>
                {selectedBranch.id === branch.id && <View style={styles.radioInner} />}
              </View>
              <View style={styles.branchInfo}>
                <Text style={styles.branchName}>{branch.name}</Text>
                <Text style={styles.branchAddress}>{branch.address}</Text>
                <View style={styles.branchMeta}>
                  <Star size={11} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.branchRating}>{branch.rating}</Text>
                  <View style={styles.dot} />
                  <Clock size={11} color="#999" />
                  <Text style={styles.branchHours} numberOfLines={1}>{branch.hours.split('|')[0].trim()}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Contact Info */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionLabel}>Contact & Support</Text>
          <View style={styles.contactCard}>
            <TouchableOpacity style={styles.contactRow} onPress={() => callBranch(selectedBranch.phone)}>
              <View style={styles.contactIcon}>
                <Phone size={18} color="#FF6B01" />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Phone Support</Text>
                <Text style={styles.contactValue}>{selectedBranch.phone}</Text>
              </View>
              <View style={styles.actionBadge}>
                 <Text style={styles.actionBadgeText}>CALL</Text>
              </View>
            </TouchableOpacity>

          <View style={styles.divider} />

            <TouchableOpacity style={styles.contactRow} onPress={() => emailBranch(selectedBranch.email)}>
              <View style={styles.contactIcon}>
                <Mail size={18} color="#FF6B01" />
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Official Email</Text>
                <Text style={styles.contactValue}>{selectedBranch.email}</Text>
              </View>
              <View style={styles.actionBadge}>
                 <Text style={styles.actionBadgeText}>EMAIL</Text>
              </View>
            </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Clock size={18} color="#FF6B01" />
            </View>
            <View style={styles.contactText}>
              <Text style={styles.contactLabel}>Opening Hours</Text>
              <Text style={styles.contactValue}>{selectedBranch.hours}</Text>
            </View>
          </View>
          </View>
        </View>

        {/* Save address as */}
        <Text style={styles.sectionLabel}>Save Address As</Text>
        <View style={styles.pillRow}>
          {(['Home', 'Office', 'Other'] as const).map(label => (
            <TouchableOpacity
              key={label}
              style={[styles.pill, savedAs === label && styles.activePill]}
              onPress={() => setSavedAs(label)}
            >
              <Text style={[styles.pillText, savedAs === label && styles.activePillText]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmBtn, confirmed && styles.confirmBtnDone]}
          onPress={handleConfirm}
        >
          {confirmed
            ? <><CheckCircle size={20} color="#FFFFFF" /><Text style={styles.confirmText}>  Location Saved!</Text></>
            : <Text style={styles.confirmText}>Confirm This Location</Text>
          }
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 17, color: '#1A1A1A', fontFamily: 'Jost-Black' },
  scroll: { paddingBottom: 20 },

  // Map
  mapCard: {
    margin: 20,
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  mapPinBox: {
    position: 'absolute', top: '35%', left: '50%',
    marginLeft: -16, marginTop: -16,
  },
  directionsBtn: {
    position: 'absolute', bottom: 14, right: 14,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FF6B01',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, elevation: 4,
  },
  directionsBtnText: { color: '#FFF', fontSize: 13, fontFamily: 'Jost-Bold' },

  // Branches
  contactSection: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 16, color: '#1A1A1A', fontFamily: 'Jost-Black',
    marginHorizontal: 20, marginTop: 10, marginBottom: 12,
  },
  branchCard: {
    marginHorizontal: 20, marginBottom: 12,
    backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 16, borderWidth: 1.5, borderColor: '#F0F0F0',
  },
  branchCardActive: { borderColor: '#FF6B01', backgroundColor: '#FFF8F4' },
  branchLeft: { flexDirection: 'row', gap: 14 },
  radioOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2, borderColor: '#CCC',
    justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  radioOuterActive: { borderColor: '#FF6B01' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF6B01' },
  branchInfo: { flex: 1, gap: 4 },
  branchName: { fontSize: 14, color: '#1A1A1A', fontFamily: 'Jost-Black' },
  branchAddress: { fontSize: 12, color: '#777', fontFamily: 'Jost-Regular', lineHeight: 17 },
  branchMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  branchRating: { fontSize: 11, color: '#888', fontFamily: 'Jost-Bold' },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#CCC', marginHorizontal: 2 },
  branchHours: { fontSize: 11, color: '#999', fontFamily: 'Jost-Medium', flex: 1 },

  // Contact
  contactCard: {
    marginHorizontal: 20, backgroundColor: '#FFFFFF',
    borderRadius: 18, padding: 4,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8,
  },
  contactRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  contactIcon: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: '#FFF5EE', justifyContent: 'center', alignItems: 'center',
  },
  contactText: { flex: 1, gap: 2 },
  contactLabel: { fontSize: 11, color: '#999', fontFamily: 'Jost-Medium' },
  contactValue: { fontSize: 13, color: '#1A1A1A', fontFamily: 'Jost-SemiBold' },
  actionBadge: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE8DB',
  },
  actionBadgeText: { 
    fontSize: 10, 
    color: '#FF6B01', 
    fontFamily: 'Jost-Black' 
  },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginHorizontal: 16 },

  // Pills
  pillRow: { flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 24 },
  pill: {
    paddingHorizontal: 28, paddingVertical: 11,
    borderRadius: 14, backgroundColor: '#FFFFFF',
    borderWidth: 1.5, borderColor: '#E8E8E8',
  },
  activePill: { backgroundColor: '#FFF5EE', borderColor: '#FF6B01' },
  pillText: { fontSize: 14, color: '#999', fontFamily: 'Jost-SemiBold' },
  activePillText: { color: '#FF6B01' },

  // Confirm
  confirmBtn: {
    marginHorizontal: 20, height: 58, borderRadius: 18,
    backgroundColor: '#FF6B01',
    justifyContent: 'center', alignItems: 'center',
    flexDirection: 'row', gap: 6,
    elevation: 8, shadowColor: '#FF6B01',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16,
  },
  confirmBtnDone: { backgroundColor: '#2ECC71' },
  confirmText: { color: '#FFFFFF', fontSize: 16, fontFamily: 'Jost-Black' },
});

export default LocationScreen;
