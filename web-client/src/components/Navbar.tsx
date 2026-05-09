import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-(--background)/90 backdrop-blur-xl border-b border-(--card-border) transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black text-blue-600 dark:text-blue-500 flex items-center gap-2 tracking-tighter">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span>ExpertSync</span>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/my-bookings" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors font-bold text-sm tracking-tight">
              My Bookings
            </Link>
            <div className="h-6 w-px bg-(--card-border)"></div>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-(--card) hover:bg-(--card-border) transition-all border border-(--card-border) shadow-sm group"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600 group-hover:-rotate-12 transition-transform" />
              )}
            </button>
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 cursor-pointer hover:scale-105 transition-transform">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
