import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-500 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span>ExpertSync</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors">
              My Bookings
            </Link>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
