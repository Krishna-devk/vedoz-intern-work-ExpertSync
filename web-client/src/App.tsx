import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ExpertAdminPage from './pages/ExpertAdminPage';

import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  React.useEffect(() => {
    // Wake up the Render backend
    fetch(`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/health`)
      .catch(() => {/* Ignore errors, just want to trigger the wake-up */});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/expert/:id" element={<ExpertDetailPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/admin" element={<ExpertAdminPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};


export default App;