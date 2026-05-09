import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ExpertCard from '../components/ExpertCard';
import { Search } from 'lucide-react';
import type { Expert } from '@expertsync/shared';
import SkeletonCard from '../components/SkeletonCard';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts', search, category],
    queryFn: async () => {
      const response = await api.get('/experts', {
        params: { search, category }
      });
      return response.data.data as Expert[];
    },
    placeholderData: (prev) => prev,
  });

  const categories = ['All', 'AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 'Product Manager'];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Book Expert Sessions in <span className="text-blue-500">Real-Time</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Connect with top-tier professionals and book instant consultations. 
          Real-time availability updates ensure no double bookings.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all ${
                category === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expert Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : experts && experts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert) => (
            <ExpertCard key={expert._id} expert={expert} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
          <p className="text-gray-400 text-lg">No experts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
