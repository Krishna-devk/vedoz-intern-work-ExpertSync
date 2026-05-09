import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import ExpertCard from '../components/ExpertCard';
import { Search, Sparkles } from 'lucide-react';
import type { Expert } from '@expertsync/shared';
import SkeletonCard from '../components/SkeletonCard';

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [allExperts, setAllExperts] = useState<Expert[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const { isLoading, isFetching } = useQuery({
    queryKey: ['experts', search, category, page],
    queryFn: async () => {
      const response = await api.get('/experts', {
        params: { search, category, page, limit: 8 }
      });
      const newExperts = response.data.data;
      const totalPages = response.data.pagination.pages;
      
      setHasMore(page < totalPages);
      
      if (page === 1) {
        setAllExperts(newExperts);
      } else {
        setAllExperts(prev => [...prev, ...newExperts]);
      }
      return response.data;
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const categories = [
    'All', 'AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 
    'Product Manager', 'Data Scientist', 'UX Designer', 'Security Expert',
    'Cloud Architect', 'Mobile Developer', 'HR Consultant', 'Marketing Strategist'
  ];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto animate-fade-in transition-colors duration-500">
      {/* Hero Section */}
      <div className="text-center mt-12 mb-20 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800/50 animate-bounce">
          <Sparkles className="w-3 h-3" />
          <span>New: AI Coaching added</span>
        </div>
        
        <h2 className="text-6xl md:text-8xl font-black mb-8 text-slate-900 dark:text-white leading-[1.05] tracking-tight">
          Book Expert <br /> Sessions in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Real-Time</span>
        </h2>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Connect with top-tier professionals and book instant consultations with our premium expert network. 
        </p>
      </div>

      {/* Premium Search Bar */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-15 group-focus-within:opacity-30 transition duration-1000"></div>
          <div className="relative flex items-center bg-[var(--card)] border border-[var(--card-border)] rounded-[2rem] p-2 shadow-2xl shadow-blue-900/5 dark:shadow-none">
            <div className="flex items-center flex-1 px-4">
              <Search className="text-slate-400 dark:text-slate-500 w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search for your next mentor..." 
                className="w-full bg-transparent border-none py-6 px-4 text-xl focus:outline-none focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white font-semibold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="hidden md:flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white px-8 py-5 rounded-2xl font-bold transition-all mr-1 shadow-lg active:scale-95">
              <span>Find Expert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mb-12">
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-8 py-4 rounded-2xl font-bold transition-all border-2 ${
                category === cat 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/25 scale-105' 
                : 'bg-[var(--card)] border-[var(--card-border)] text-slate-500 hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid Start */}

      {/* Expert Grid */}
      {isLoading && page === 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : allExperts && allExperts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {allExperts.map((expert, index) => (
              <div 
                key={`${expert._id}-${index}`} 
                className="animate-slide-up"
                style={{ animationDelay: `${(index % 8) * 0.1}s` }}
              >
                <ExpertCard expert={expert} />
              </div>
            ))}
          </div>
          
          <div ref={observerTarget} className="h-48 w-full flex items-center justify-center mt-16">
            {isFetching && hasMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
            {!hasMore && allExperts.length > 0 && (
              <div className="w-full flex flex-col items-center gap-6">
                <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800"></div>
                <div className="bg-slate-50 dark:bg-slate-900 px-6 py-2 rounded-full border border-slate-100 dark:border-slate-800">
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">
                    You've reached the end of the directory
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-32 bg-[var(--card)] rounded-[4rem] border-2 border-dashed border-slate-100 dark:border-slate-800 animate-fade-in shadow-sm">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Search className="w-12 h-12 text-slate-200 dark:text-slate-700" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No mentors found</h4>
          <p className="text-slate-400 dark:text-slate-600 font-medium max-w-sm mx-auto">We couldn't find any experts matching "{search}". Try searching for something else.</p>
          <button 
            onClick={() => {setSearch(''); setCategory('All');}}
            className="mt-10 px-10 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
