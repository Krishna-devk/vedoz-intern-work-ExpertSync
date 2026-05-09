import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import socket from '../sockets/socket';
import { Star, Briefcase, Clock, CheckCircle2, Video, Calendar, ChevronLeft, ShieldCheck } from 'lucide-react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@expertsync/shared';
import type { Expert, Slot } from '@expertsync/shared';
import { z } from 'zod';
import Toast from '../components/Toast';
import type { ToastType } from '../components/Toast';

const ExpertDetailPage: React.FC = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const { data: expert, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: async () => {
      const response = await api.get(`/experts/${id}`);
      return response.data.data as Expert;
    }
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: z.infer<typeof bookingSchema>) => {
      const response = await api.post('/bookings', data);
      return response.data;
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['expert', id] });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Something went wrong. Please try again.';
      setToast({ message, type: 'error' });
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      expertId: id,
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

      socket.on('SLOT_UPDATED', (data) => {
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

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    if (!selectedSlot) return;
    bookingMutation.mutate({ ...data, startTime: selectedSlot });
  };

  if (isLoading) return <div className="pt-32 text-center text-slate-400">Loading expert details...</div>;
  if (!expert) return <div className="pt-32 text-center text-red-500">Expert not found.</div>;

  if (isSuccess) {
    return (
      <div className="pt-32 pb-12 px-4 max-w-lg mx-auto text-center animate-fade-in relative overflow-hidden">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] p-12 relative z-10 transition-colors duration-300 shadow-2xl shadow-blue-600/5">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">
            Your session with {expert.name} has been successfully scheduled.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
            >
              <Video className="w-6 h-6" />
              Join Session Now
            </button>
            <button 
              onClick={() => {/* ICS logic */}}
              className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700"
            >
              <Calendar className="w-6 h-6" />
              Add to Calendar
            </button>
            <button 
              onClick={() => navigate('/my-bookings')}
              className="mt-4 text-slate-400 hover:text-blue-600 font-bold transition-colors text-sm uppercase tracking-widest"
            >
              Manage Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto animate-fade-in transition-colors duration-500">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold mb-10 group"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Back to Experts</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 sticky top-28 transition-colors duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="relative inline-block mb-8">
              <img 
                src={expert.avatar} 
                alt={expert.name} 
                className="w-32 h-32 rounded-[2rem] object-cover border-4 border-slate-50 dark:border-slate-800 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl shadow-lg border-4 border-white dark:border-slate-900">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{expert.name}</h1>
            <p className="text-blue-600 dark:text-blue-500 font-black uppercase tracking-widest text-xs mb-8">{expert.category}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-transparent">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-lg font-black text-slate-900 dark:text-white">{expert.rating}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Avg Rating</p>
              </div>
              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-transparent">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span className="text-lg font-black text-slate-900 dark:text-white">{expert.experience}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Years Exp</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-widest">Biography</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {expert.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 mb-8 transition-colors duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-blue-600/10 rounded-xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              Select your session
            </h2>

            <div className="space-y-10">
              {(() => {
                const groupedSlots: Record<string, Slot[]> = {};
                expert.slots.forEach((slot) => {
                  const date = dayjs(slot.startTime).format('YYYY-MM-DD');
                  if (!groupedSlots[date]) groupedSlots[date] = [];
                  groupedSlots[date].push(slot);
                });

                return Object.keys(groupedSlots).sort().map(date => (
                  <div key={date}>
                    <h3 className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.2em] mb-6 flex items-center gap-4">
                      {dayjs(date).format('dddd, MMMM D')}
                      <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800"></div>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {groupedSlots[date].map((slot, index) => {
                        const isSelected = selectedSlot === slot.startTime;
                        const isBooked = slot.isBooked;
                        const isPast = dayjs(slot.startTime).isBefore(dayjs());
                        
                        return (
                          <button
                            key={index}
                            type="button"
                            disabled={isBooked || isPast}
                            onClick={() => setSelectedSlot(slot.startTime)}
                            className={`
                              p-5 rounded-[1.5rem] border-2 text-sm font-black transition-all
                              ${(isBooked || isPast)
                                ? 'bg-slate-50 dark:bg-slate-950 border-slate-50 dark:border-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed line-through opacity-50' 
                                : isSelected
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/25 scale-[1.02]'
                                  : 'bg-white dark:bg-slate-800 border-slate-50 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-700'
                              }
                            `}
                          >
                            {dayjs(slot.startTime).format('h:mm A')}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {selectedSlot && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 animate-slide-up transition-colors duration-300 shadow-2xl shadow-blue-600/5">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">Complete your booking</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Your Name</label>
                    <input 
                      {...register('userName')}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                      placeholder="Enter your name"
                    />
                    {errors.userName && <p className="text-red-500 text-xs mt-2 font-bold">{errors.userName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Email Address</label>
                    <input 
                      {...register('userEmail')}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                      placeholder="hello@example.com"
                    />
                    {errors.userEmail && <p className="text-red-500 text-xs mt-2 font-bold">{errors.userEmail.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Phone Number</label>
                  <input 
                    {...register('userPhone')}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all font-bold"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.userPhone && <p className="text-red-500 text-xs mt-2 font-bold">{errors.userPhone.message}</p>}
                </div>
                <div>
                  <label className="block text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">Notes for expert</label>
                  <textarea 
                    {...register('notes')}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all font-bold min-h-[120px]"
                    placeholder="Briefly describe what you'd like to discuss..."
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 text-lg tracking-tight"
                >
                  {bookingMutation.isPending ? 'Processing Booking...' : 'Confirm Session Booking'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
};

export default ExpertDetailPage;
