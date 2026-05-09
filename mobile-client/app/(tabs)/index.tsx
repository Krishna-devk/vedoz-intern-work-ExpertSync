import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import api from '../../src/api/axios';
import { Ionicons } from '@expo/vector-icons';
import SkeletonExpertCard from '../../src/components/SkeletonExpertCard';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Toast, { ToastType } from '../../src/components/Toast';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  const [page, setPage] = useState(1);
  const [allExperts, setAllExperts] = useState<any[]>([]);

  const { isLoading, isFetching } = useQuery({
    queryKey: ['experts', search, category, page],
    queryFn: async () => {
      const response = await api.get('/experts', { 
        params: { 
          search, 
          category: category === 'All' ? undefined : category,
          page,
          limit: 10
        } 
      });
      const newExperts = response.data.data;
      if (page === 1) {
        setAllExperts(newExperts);
      } else {
        setAllExperts(prev => [...prev, ...newExperts]);
      }
      return response.data;
    },
    refetchInterval: 30000,
  });

  // Reset when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, category]);

  const categories = ['All', 'AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 'Product Manager'];

  const renderExpert = ({ item }: { item: any }) => (
    <Link href={`/expert/${item._id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.statText}>{item.rating}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="briefcase" size={14} color="#9CA3AF" />
              <Text style={styles.statText}>{item.experience} Yrs</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#374151" />
      </TouchableOpacity>
    </Link>
  );

  const handleVoiceSearch = () => {
    // Mocking voice recognition
    setSearch('AI');
    setToast({ message: "Heard: 'AI'", type: 'success' });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ExpertSync</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search experts..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity 
            style={styles.voiceButton}
            onPress={handleVoiceSearch}
          >
            <Ionicons name="mic" size={24} color="#F9FAFB" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive
              ]}
            >
              <Text style={[
                styles.categoryButtonText,
                category === cat && styles.categoryButtonTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {isLoading && page === 1 ? (
        <View style={{ paddingHorizontal: 20 }}>
          {[...Array(6)].map((_, i) => (
            <SkeletonExpertCard key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={allExperts}
          renderItem={renderExpert}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          onEndReached={() => {
            if (!isFetching) setPage(prev => prev + 1);
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            isFetching ? <ActivityIndicator color="#3B82F6" style={{ marginVertical: 20 }} /> : null
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No experts found.</Text>
          }
        />
      )}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </View>
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
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#F9FAFB',
    fontSize: 16,
  },
  voiceButton: {
    padding: 8,
    marginLeft: 4,
  },
  categoryContainer: {
    marginTop: 16,
  },
  categoryList: {
    paddingRight: 20,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#60A5FA',
  },
  categoryButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space for tab bar
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 40,
    fontSize: 16,
  },
});
