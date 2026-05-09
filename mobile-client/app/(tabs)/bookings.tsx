import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, Linking } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../../src/api/axios';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useTheme } from '../../src/context/ThemeContext';

export default function BookingsScreen() {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const { isDark } = useTheme();

  const colors = useMemo(() => ({
    background: isDark ? '#0F172A' : '#F8FAFC',
    card: isDark ? '#1E293B' : '#FFFFFF',
    text: isDark ? '#F8FAFC' : '#0F172A',
    textMuted: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
    accent: '#3B82F6',
    inputBg: isDark ? '#1E293B' : '#F1F5F9',
  }), [isDark]);

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
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.expertId.avatar }} style={styles.avatar} />
        <View style={styles.expertInfo}>
          <Text style={[styles.name, { color: colors.text }]}>{item.expertId.name}</Text>
          <Text style={styles.category}>{item.expertId.category}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={[styles.cardFooter, { borderTopColor: colors.border }]}>
        <View style={styles.timeInfo}>
          <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
          <Text style={[styles.timeText, { color: colors.textMuted }]}>
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
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Bookings</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
            placeholder="Enter email to fetch bookings..."
            placeholderTextColor={colors.textMuted}
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
              <View style={[styles.emptyIconContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                <Ionicons 
                  name={searchEmail ? "calendar-outline" : "search-outline"} 
                  size={48} 
                  color={colors.textMuted} 
                />
              </View>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
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
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    letterSpacing: -1,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
    width: 56,
    height: 56,
    backgroundColor: '#3B82F6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    marginRight: 14,
  },
  expertInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  category: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginTop: 16,
    gap: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
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
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
});
