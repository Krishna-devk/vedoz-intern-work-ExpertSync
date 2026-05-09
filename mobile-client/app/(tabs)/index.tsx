import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../src/api/axios';
import { Ionicons } from '@expo/vector-icons';
import SkeletonExpertCard from '../../src/components/SkeletonExpertCard';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Toast, { ToastType } from '../../src/components/Toast';
import { useTheme } from '../../src/context/ThemeContext';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  
  const { toggleTheme, isDark } = useTheme();

  const colors = useMemo(() => ({
    background: isDark ? '#0F172A' : '#F8FAFC',
    card: isDark ? '#1E293B' : '#FFFFFF',
    text: isDark ? '#F8FAFC' : '#0F172A',
    textMuted: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
    accent: '#3B82F6',
    inputBg: isDark ? '#1E293B' : '#F1F5F9',
  }), [isDark]);

  const handleToggleTheme = () => {
    toggleTheme();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const { 
    data, 
    isLoading, 
    isError,
    refetch,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['experts', search, category],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await api.get('/experts', { 
          params: { 
            search, 
            category: category === 'All' ? undefined : category,
            page: pageParam,
            limit: 10
          } 
        });
        return response.data;
      } catch (error) {
        console.error('Fetch experts error:', error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.page < lastPage?.pagination?.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const allExperts = useMemo(() => 
    data?.pages.flatMap(page => page.data || []) || [], 
  [data]);


  const categories = [
    'All', 'AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 
    'Product Manager', 'Data Scientist', 'UX Designer', 'Security Expert',
    'Cloud Architect', 'Mobile Developer', 'HR Consultant', 'Marketing Strategist'
  ];

  const renderExpert = ({ item }: { item: any }) => (
    <Link href={`/expert/${item._id}`} asChild>
      <TouchableOpacity activeOpacity={0.85}>
        <View style={[
          styles.expertTile, 
          { 
            backgroundColor: colors.card, 
            borderColor: colors.border,
            shadowColor: isDark ? '#000' : '#64748B',
          }
        ]}>
          <View style={styles.tileImageContainer}>
            <Image source={{ uri: item.avatar }} style={styles.tileAvatar} />
            <View style={styles.tileRating}>
              <Ionicons name="star" size={12} color="#FBBF24" />
              <Text style={styles.tileRatingText}>{item.rating}</Text>
            </View>
          </View>
          
          <View style={styles.tileContent}>
            <View style={styles.tileHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.tileName, { color: colors.text }]} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.tileCategory}>
                  {item.category}
                </Text>
              </View>
              <View style={[styles.expBadge, { backgroundColor: isDark ? 'rgba(59,130,246,0.1)' : '#EFF6FF' }]}>
                <Text style={styles.expBadgeText}>{item.experience}Y Exp</Text>
              </View>
            </View>

            <Text style={[styles.tileBio, { color: colors.textMuted }]} numberOfLines={2}>
              {item.bio}
            </Text>
            
            <View style={styles.tileFooter}>
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Schedule Session</Text>
                <Ionicons name="calendar-outline" size={16} color="#FFFFFF" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>ExpertSync</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>Tiling your way to success</Text>
        </View>
        <TouchableOpacity 
          onPress={handleToggleTheme}
          style={[styles.themeToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons 
            name={isDark ? 'sunny' : 'moon'} 
            size={22} 
            color={isDark ? '#FBBF24' : '#2563EB'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.searchContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search experts..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categories}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  Haptics.selectionAsync();
                  setCategory(cat);
                }}
                style={[
                  styles.categoryBtn,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  category === cat && styles.categoryBtnActive
                ]}
              >
                <Text style={[
                  styles.categoryText,
                  { color: colors.textMuted },
                  category === cat && styles.categoryTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <View style={{ paddingHorizontal: 20 }}>
            <SkeletonExpertCard />
            <SkeletonExpertCard />
          </View>
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Ionicons name="cloud-offline-outline" size={60} color="#EF4444" />
            <Text style={[styles.errorTitle, { color: colors.text }]}>Connection Error</Text>
            <Text style={[styles.errorSubtitle, { color: colors.textMuted }]}>
              Could not connect to the server. Please check your connection.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
              <Text style={styles.retryText}>Retry Connection</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={allExperts}
            renderItem={renderExpert}
            keyExtractor={(item, index) => `${item._id}-${index}`}
            contentContainerStyle={styles.list}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (
              isFetchingNextPage ? <ActivityIndicator color="#3B82F6" style={{ marginVertical: 20 }} /> : null
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.textMuted} />
                <Text style={[styles.emptyText, { color: colors.textMuted }]}>No experts found matching your search.</Text>
              </View>
            }
          />
        )}
      </View>
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
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: '600',
  },
  themeToggle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 56,
    fontSize: 16,
    fontWeight: '600',
  },
  categories: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  categoryBtnActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  expertTile: {
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  tileImageContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  tileAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tileRating: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  tileRatingText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '800',
  },
  tileContent: {
    padding: 22,
  },
  tileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  tileName: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  tileCategory: {
    fontSize: 12,
    fontWeight: '800',
    color: '#3B82F6',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  expBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  expBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3B82F6',
  },
  tileBio: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: '500',
  },
  tileFooter: {
    marginTop: 'auto',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 18,
    gap: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    gap: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 40,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  errorSubtitle: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
