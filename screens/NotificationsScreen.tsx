import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, ShoppingBag, Tag, Star, ChevronLeft } from 'lucide-react-native';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Order Delivered!',
    desc: 'Your order KPA-4521 has been delivered. Enjoy your meal!',
    time: '2 mins ago',
    icon: <ShoppingBag size={20} color="#FFFFFF" />,
    color: '#FF6B01',
    unread: true,
  },
  {
    id: '2',
    title: 'Flash Sale! 50% OFF',
    desc: 'Grab your favorite snacks at half price for the next 2 hours.',
    time: '1 hour ago',
    icon: <Tag size={20} color="#FFFFFF" />,
    color: '#FF8C00',
    unread: true,
  },
  {
    id: '3',
    title: 'Review your last order',
    desc: 'How was the BBQ Chicken Pizza? Tell us your thoughts.',
    time: '5 hours ago',
    icon: <Star size={20} color="#FFFFFF" />,
    color: '#FFB800',
    unread: false,
  },
];

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAll}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.card, item.unread && styles.unreadCard]}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              {item.icon}
            </View>
            <View style={styles.info}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1A1A1A',
    fontFamily: 'Jost-Black',
  },
  markAll: {
    padding: 5,
  },
  markAllText: {
    color: '#FF6B01',
    fontSize: 13,
    fontFamily: 'Jost-Bold',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
    alignItems: 'center',
  },
  unreadCard: {
    backgroundColor: '#FFF5F0',
    borderWidth: 1,
    borderColor: '#FFE8DB',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#1A1A1A',
    fontFamily: 'Jost-Bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B01',
  },
  desc: {
    fontSize: 14,
    color: '#444',
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Jost-Regular',
  },
  time: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Jost-Medium',
  },
});

export default NotificationsScreen;
