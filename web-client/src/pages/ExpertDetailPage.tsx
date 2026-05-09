import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import socket from '../sockets/socket';
import { Star, Briefcase, Clock, CheckCircle2, Video, Calendar } from 'lucide-react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '@expertsync/shared';
import type { Expert } from '@expertsync/shared';
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
    mutationFn: async (data: any) => {
      const response = await api.post('/bookings', data);
      return response.data;
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['expert', id] });
    },
    onError: (error: any) => {
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

  const onSubmit = (data: any) => {
    if (!selectedSlot) return;
    bookingMutation.mutate({ ...data, startTime: selectedSlot });
  };

  if (isLoading) return <div className="pt-32 text-center text-gray-400">Loading expert details...</div>;
  if (!expert) return <div className="pt-32 text-center text-red-500">Expert not found.</div>;

  if (isSuccess) {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    return (
      <div className="pt-32 pb-12 px-4 max-w-lg mx-auto text-center animate-fade-in relative overflow-hidden">
        {/* Confetti pieces */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="confetti" 
            style={{ 
              left: `${Math.random() * 100}%`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random()
            }} 
          />
        ))}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 relative z-10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-8">
            Your session with {expert.name} has been successfully scheduled.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.open('https://meet.google.com/abc-defg-hij', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Join Session Now
            </button>
            <button 
              onClick={() => {
                const startTime = dayjs(selectedSlot).format('YYYYMMDDTHHmmss');
                const endTime = dayjs(selectedSlot).add(1, 'hour').format('YYYYMMDDTHHmmss');
                const icsContent = [
                  'BEGIN:VCALENDAR',
                  'VERSION:2.0',
                  'BEGIN:VEVENT',
                  `DTSTART:${startTime}`,
                  `DTEND:${endTime}`,
                  `SUMMARY:Expert Session with ${expert.name}`,
                  `DESCRIPTION:Session with ${expert.name} (${expert.category}). Join here: https://meet.google.com/abc-defg-hij`,
                  'LOCATION:Online',
                  'END:VEVENT',
                  'END:VCALENDAR'
                ].join('\n');
                
                const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', 'expert-session.ics');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Add to Calendar (.ics)
            </button>
            <button 
              onClick={() => navigate('/my-bookings')}
              className="w-full bg-transparent hover:bg-gray-800 text-gray-500 font-bold py-4 rounded-xl transition-all text-sm"
            >
              Manage All My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sticky top-24">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-800 mb-6"
            />
            <h1 className="text-2xl font-bold text-white mb-2">{expert.name}</h1>
            <p className="text-blue-500 font-medium mb-6">{expert.category}</p>
            
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-bold">{expert.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <span className="text-white font-bold">{expert.experience} Yrs</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-gray-400 font-semibold uppercase text-xs tracking-wider">About</h3>
              <p className="text-gray-300 leading-relaxed">
                {expert.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Select a Time Slot
            </h2>

            <div className="space-y-8">
              {(() => {
                // Group slots by date
                const groupedSlots: Record<string, any[]> = {};
                expert.slots.forEach((slot) => {
                  const date = dayjs(slot.startTime).format('YYYY-MM-DD');
                  if (!groupedSlots[date]) groupedSlots[date] = [];
                  groupedSlots[date].push(slot);
                });

                return Object.keys(groupedSlots).sort().map(date => (
                  <div key={date}>
                    <h3 className="text-gray-500 font-semibold uppercase text-xs tracking-wider mb-4 border-b border-gray-800 pb-2">
                      {dayjs(date).format('dddd, MMMM D')}
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
                              p-4 rounded-2xl border text-sm font-semibold transition-all
                              ${(isBooked || isPast)
                                ? 'bg-gray-950 border-gray-800 text-gray-600 cursor-not-allowed line-through opacity-50' 
                                : isSelected
                                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-blue-500/50 hover:bg-gray-700'
                              }
                            `}
                          >
                            {dayjs(slot.startTime).format('h:mm A')}
                            {isPast && !isBooked && <span className="block text-[10px] opacity-50 uppercase mt-1">Expired</span>}
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
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-8">Complete Booking</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                    <input 
                      {...register('userName')}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                    {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Your Email</label>
                    <input 
                      {...register('userEmail')}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                    {errors.userEmail && <p className="text-red-500 text-xs mt-1">{errors.userEmail.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input 
                    {...register('userPhone')}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.userPhone && <p className="text-red-500 text-xs mt-1">{errors.userPhone.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Additional Notes (Optional)</label>
                  <textarea 
                    {...register('notes')}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Tell the expert about your goals..."
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  {bookingMutation.isPending ? 'Processing...' : 'Confirm Booking Session'}
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
