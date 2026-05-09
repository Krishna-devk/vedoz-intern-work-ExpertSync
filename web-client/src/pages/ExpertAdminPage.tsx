import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Calendar } from 'lucide-react';
import api from '../api/axios';
import Toast from '../components/Toast';
import type { Expert } from '../types';

const ExpertAdminPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedExpertId, setSelectedExpertId] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { data: experts } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      const response = await api.get('/experts');
      return response.data.data;
    }
  });

  const addSlotMutation = useMutation({
    mutationFn: async ({ id, startTime }: { id: string, startTime: string }) => {
      const response = await api.post(`/experts/${id}/slots`, { startTime });
      return response.data;
    },
    onSuccess: () => {
      setToast({ message: 'Time slot added successfully!', type: 'success' });
      setSlotTime('');
      queryClient.invalidateQueries({ queryKey: ['experts'] });
    },
    onError: () => {
      setToast({ message: 'Failed to add slot.', type: 'error' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpertId || !slotTime) return;
    addSlotMutation.mutate({ id: selectedExpertId, startTime: new Date(slotTime).toISOString() });
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto animate-fade-in transition-colors duration-300">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Expert Management Portal</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage expert availability and schedules.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[40px] p-10 transition-colors duration-300 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-sm mb-3 font-semibold uppercase tracking-wider">Select Expert</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experts?.map((expert: Expert) => (
                <button
                  key={expert._id}
                  type="button"
                  onClick={() => setSelectedExpertId(expert._id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    selectedExpertId === expert._id 
                    ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.05)]' 
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-blue-500/50'
                  }`}
                >
                  <img src={expert.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700" />
                  <div className="text-left">
                    <p className="text-gray-900 dark:text-white font-bold text-sm">{expert.name}</p>
                    <p className="text-gray-500 text-xs">{expert.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end border-t border-gray-100 dark:border-gray-800 pt-8">
            <div className="flex-1">
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-3 font-semibold uppercase tracking-wider">Slot Date & Time</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="datetime-local" 
                  value={slotTime}
                  onChange={(e) => setSlotTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={addSlotMutation.isPending || !selectedExpertId || !slotTime}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Time Slot
            </button>
          </div>
        </form>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ExpertAdminPage;
