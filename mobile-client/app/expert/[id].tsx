import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
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

export default function ExpertDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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

  if (isLoading) return <ActivityIndicator size="large" color="#3B82F6" style={{ flex: 1 }} />;
  if (!expert) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 50 }}>Expert not found.</Text>;

  if (isSuccess) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="checkmark-circle" size={80} color="#10B981" />
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successText}>Your session with {expert.name} is scheduled.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: expert.avatar }} style={styles.largeAvatar} />
        <Text style={styles.largeName}>{expert.name}</Text>
        <Text style={styles.largeCategory}>{expert.category}</Text>
        
        <View style={styles.largeStats}>
          <View style={styles.largeStat}>
            <Ionicons name="star" size={18} color="#F59E0B" />
            <Text style={styles.largeStatText}>{expert.rating}</Text>
          </View>
          <View style={styles.largeStat}>
            <Ionicons name="briefcase" size={18} color="#9CA3AF" />
            <Text style={styles.largeStatText}>{expert.experience} Yrs Exp</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select Time Slot</Text>
      
      {(() => {
        // Group slots by date
        const groupedSlots: Record<string, any[]> = {};
        expert.slots.forEach((slot: any) => {
          const date = dayjs(slot.startTime).format('YYYY-MM-DD');
          if (!groupedSlots[date]) groupedSlots[date] = [];
          groupedSlots[date].push(slot);
        });

        return Object.keys(groupedSlots).sort().map(date => (
          <View key={date} style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{dayjs(date).format('dddd, MMM D')}</Text>
            <View style={styles.slotsGrid}>
              {groupedSlots[date].map((slot: any, index: number) => {
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
                      (isBooked || isPast) && styles.slotBooked,
                      isSelected && styles.slotSelected
                    ]}
                  >
                    <Text style={[
                      styles.slotText,
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
        ));
      })()}

      {selectedSlot && (
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <Controller
              control={control}
              name="userName"
              render={({ field: { onChange, value } }: { field: any }) => (
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#4B5563"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.userName && <Text style={styles.errorText}>{errors.userName.message as string}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <Controller
              control={control}
              name="userEmail"
              render={({ field: { onChange, value } }: { field: any }) => (
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor="#4B5563"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />
            {errors.userEmail && <Text style={styles.errorText}>{errors.userEmail.message as string}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <Controller
              control={control}
              name="userPhone"
              render={({ field: { onChange, value } }: { field: any }) => (
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor="#4B5563"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.userPhone && <Text style={styles.errorText}>{errors.userPhone.message as string}</Text>}
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, bookingMutation.isPending && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={bookingMutation.isPending}
          >
            <Text style={styles.buttonText}>
              {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  largeAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#1F2937',
    marginBottom: 16,
  },
  largeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  largeCategory: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 16,
  },
  largeStats: {
    flexDirection: 'row',
    gap: 20,
  },
  largeStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  largeStatText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
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
    marginBottom: 30,
  },
  slotItem: {
    width: '31%',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  slotSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  slotBooked: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    opacity: 0.5,
  },
  slotText: {
    color: '#F9FAFB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  slotDateText: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 2,
  },
  slotTextSelected: {
    color: '#FFFFFF',
  },
  slotTextBooked: {
    color: '#4B5563',
    textDecorationLine: 'line-through',
  },
  formContainer: {
    backgroundColor: '#111827',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F2937',
    height: 54,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#F9FAFB',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#374151',
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
    color: '#F9FAFB',
    marginTop: 20,
    marginBottom: 10,
  },
  successText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },
});
