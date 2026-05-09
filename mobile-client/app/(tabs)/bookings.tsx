import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, Linking } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../../src/api/axios';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';

export default function BookingsScreen() {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', searchEmail],
    queryFn: async () => {
      if (!searchEmail) return [];
      const response = await api.get('/bookings/my', { params: { email: searchEmail } });
      return response.data.data;
    },
    enabled: !!searchEmail,
  });

  const renderBooking = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.expertId.avatar }} style={styles.avatar} />
        <View style={styles.expertInfo}>
          <Text style={styles.name}>{item.expertId.name}</Text>
          <Text style={styles.category}>{item.expertId.category}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.timeInfo}>
          <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
          <Text style={styles.timeText}>
            {dayjs(item.startTime).format('MMM D, YYYY • h:mm A')}
          </Text>
        </View>

        {item.status === 'CONFIRMED' && (
          <TouchableOpacity 
            style={styles.joinButton}
            onPress={() => Linking.openURL('https://meet.google.com/abc-defg-hij')}
          >
            <Ionicons name="videocam" size={18} color="#FFFFFF" />
            <Text style={styles.joinButtonText}>Join Meeting</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter email to fetch bookings..."
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearchEmail(email)}
          >
            <Ionicons name="search" size={24} color="#F9FAFB" />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Ionicons 
                  name={searchEmail ? "calendar-outline" : "search-outline"} 
                  size={48} 
                  color="#374151" 
                />
              </View>
              <Text style={styles.emptyText}>
                {searchEmail 
                  ? "No bookings found for this email address." 
                  : "Enter your email above to see your scheduled sessions."}
              </Text>
            </View>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 54,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingHorizontal: 16,
    color: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#374151',
    fontSize: 16,
  },
  searchButton: {
    width: 54,
    height: 54,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space for tab bar
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  expertInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 12,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    color: '#9CA3AF',
    fontSize: 14,
    flex: 1,
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#111827',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
