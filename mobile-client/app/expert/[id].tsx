import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../src/api/axios';
import socket from '../../src/sockets/socket';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@expertsync/shared';
import Toast from '../../src/components/Toast';
import { useTheme } from '../../src/context/ThemeContext';

export default function ExpertDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const { isDark } = useTheme();

  const colors = useMemo(() => ({
    background: isDark ? '#0B0F19' : '#F3F4F6',
    card: isDark ? '#111827' : '#FFFFFF',
    text: isDark ? '#F9FAFB' : '#111827',
    textMuted: isDark ? '#9CA3AF' : '#4B5563',
    border: isDark ? '#1F2937' : '#E5E7EB',
    accent: '#3B82F6',
    inputBg: isDark ? '#1F2937' : '#F9FAFB',
  }), [isDark]);

  const { data: expert, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: async () => {
      const response = await api.get(`/experts/${id}`);
      return response.data.data;
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/bookings', data);
      return response.data;
    },
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['expert', id] });
    },
    onError: (error: any) => {
      setToast({ message: error.response?.data?.message || 'Something went wrong', type: 'error' });
    }
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      expertId: id as string,
      startTime: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      notes: ''
    }
  });

  useEffect(() => {
    if (id) {
      socket.emit('join_expert', id);
      socket.on('SLOT_UPDATED', (data: any) => {
        if (data.expertId === id) {
          queryClient.invalidateQueries({ queryKey: ['expert', id] });
          if (selectedSlot === data.startTime) {
            setSelectedSlot(null);
            setToast({ message: 'This slot was just booked by another user.', type: 'error' });
          }
        }
      });
      return () => {
        socket.off('SLOT_UPDATED');
      };
    }
  }, [id, queryClient, selectedSlot]);

  const onSubmit = (data: any) => {
    if (!selectedSlot) return;
    bookingMutation.mutate({ ...data, startTime: selectedSlot });
  };

  const groupedSlots = useMemo(() => {
    if (!expert?.slots) return {};
    const groups: Record<string, any[]> = {};
    expert.slots.forEach((slot: any) => {
      const date = dayjs(slot.startTime).format('YYYY-MM-DD');
      if (!groups[date]) groups[date] = [];
      groups[date].push(slot);
    });
    return groups;
  }, [expert?.slots]);

  if (isLoading) return <ActivityIndicator size="large" color="#3B82F6" style={{ flex: 1, backgroundColor: colors.background }} />;
  if (!expert) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>Expert not found.</Text>;

  if (isSuccess) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <Ionicons name="checkmark-circle" size={80} color="#10B981" />
        <Text style={[styles.successTitle, { color: colors.text }]}>Booking Confirmed!</Text>
        <Text style={[styles.successText, { color: colors.textMuted }]}>Your session with {expert.name} is scheduled.</Text>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.replace('/(tabs)/bookings')}
        >
          <Text style={styles.buttonText}>View My Bookings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image source={{ uri: expert.avatar }} style={styles.avatar} />
            <View style={styles.headerInfo}>
              <Text style={[styles.name, { color: colors.text }]}>{expert.name}</Text>
              <Text style={styles.category}>{expert.category}</Text>
              <View style={styles.statsRow}>
                <View style={[styles.largeStat, { backgroundColor: colors.card }]}>
                  <Ionicons name="star" size={16} color="#FBBF24" />
                  <Text style={[styles.largeStatText, { color: colors.text }]}>{expert.rating}</Text>
                </View>
                <View style={[styles.largeStat, { backgroundColor: colors.card }]}>
                  <Ionicons name="briefcase" size={16} color="#3B82F6" />
                  <Text style={[styles.largeStatText, { color: colors.text }]}>{expert.experience} Yrs</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.bio, { color: colors.textMuted }]}>{expert.bio}</Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Time Slot</Text>
          {Object.keys(groupedSlots).sort().map(date => (
            <View key={date} style={styles.dateGroup}>
              <Text style={styles.dateHeader}>{dayjs(date).format('dddd, MMM D')}</Text>
              <View style={styles.slotsGrid}>
                {groupedSlots[date].map((slot, index) => {
                  const isSelected = selectedSlot === slot.startTime;
                  const isBooked = slot.isBooked;
                  const isPast = dayjs(slot.startTime).isBefore(dayjs());
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      disabled={isBooked || isPast}
                      onPress={() => {
                        Haptics.selectionAsync();
                        setSelectedSlot(slot.startTime);
                      }}
                      style={[
                        styles.slotItem,
                        { backgroundColor: colors.inputBg, borderColor: colors.border },
                        (isBooked || isPast) && styles.slotBooked,
                        isSelected && styles.slotSelected
                      ]}
                    >
                      <Text style={[
                        styles.slotText,
                        { color: colors.text },
                        (isBooked || isPast) && styles.slotTextBooked,
                        isSelected && styles.slotTextSelected
                      ]}>
                        {dayjs(slot.startTime).format('h:mm A')}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {selectedSlot && (
            <View style={[styles.formContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 0 }]}>Booking Details</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <Controller
                  control={control}
                  name="userName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Your Name"
                      placeholderTextColor={colors.textMuted}
                    />
                  )}
                />
                {errors.userName && <Text style={styles.errorText}>{errors.userName.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <Controller
                  control={control}
                  name="userEmail"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="your@email.com"
                      placeholderTextColor={colors.textMuted}
                    />
                  )}
                />
                {errors.userEmail && <Text style={styles.errorText}>{errors.userEmail.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <Controller
                  control={control}
                  name="userPhone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                      placeholder="+1 (555) 000-0000"
                      placeholderTextColor={colors.textMuted}
                    />
                  )}
                />
                {errors.userPhone && <Text style={styles.errorText}>{errors.userPhone.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Notes (Optional)</Text>
                <Controller
                  control={control}
                  name="notes"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border, height: 100, textAlignVertical: 'top', paddingTop: 12 }]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      multiline
                      numberOfLines={4}
                      placeholder="Anything you want to share..."
                      placeholderTextColor={colors.textMuted}
                    />
                  )}
                />
              </View>

              <TouchableOpacity 
                style={[styles.primaryButton, bookingMutation.isPending && styles.disabledButton]}
                onPress={handleSubmit(onSubmit)}
                disabled={bookingMutation.isPending}
              >
                {bookingMutation.isPending ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Confirm Booking</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '700',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  largeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  largeStatText: {
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slotItem: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  slotSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  slotBooked: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderColor: 'transparent',
    opacity: 0.3,
  },
  slotText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  slotTextSelected: {
    color: '#FFFFFF',
  },
  slotTextBooked: {
    color: '#4B5563',
    textDecorationLine: 'line-through',
  },
  formContainer: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 54,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },
});
