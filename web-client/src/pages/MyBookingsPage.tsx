import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { Calendar, Mail, Video } from 'lucide-react';
import dayjs from 'dayjs';

const MyBookingsPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', searchEmail],
    queryFn: async () => {
      if (!searchEmail) return null;
      const response = await api.get('/bookings/my', {
        params: { email: searchEmail }
      });
      return response.data.data;
    },
    enabled: !!searchEmail
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchEmail(email);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">My Bookings</h1>
        <p className="text-gray-400">
          Enter your email address to retrieve your scheduled sessions.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="email" 
              required
              placeholder="Enter your email..." 
              className="w-full bg-gray-900 border border-gray-800 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all"
          >
            Fetch Bookings
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center text-gray-400">Loading your bookings...</div>
      ) : bookings && bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking: any) => (
            <div key={booking._id} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={booking.expertId.avatar} 
                  alt={booking.expertId.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-800"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{booking.expertId.name}</h3>
                  <p className="text-sm text-blue-500">{booking.expertId.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-white font-semibold mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {dayjs(booking.startTime).format('MMMM D, YYYY')}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {dayjs(booking.startTime).format('h:mm A')}
                  </div>
                </div>
                
                <div className={`
                  px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                  ${booking.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}
                `}>
                  {booking.status}
                </div>
              </div>

              {booking.status === 'CONFIRMED' && (
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  <a 
                    href="https://meet.google.com/abc-defg-hij" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded-xl transition-all"
                  >
                    <Video className="w-4 h-4" />
                    Join Meeting
                  </a>
                  <button className="text-gray-500 hover:text-gray-300 text-[10px] uppercase tracking-tighter text-center">
                    ID: {booking._id.slice(-6)}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : searchEmail && !isLoading ? (
        <div className="text-center py-24 bg-gray-900/30 rounded-[40px] border border-dashed border-gray-800 animate-fade-in">
          <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg font-medium">No bookings found for this email.</p>
          <p className="text-gray-600 text-sm mt-2">Try searching with a different address or book a new session.</p>
        </div>
      ) : null}
    </div>
  );
};

export default MyBookingsPage;
