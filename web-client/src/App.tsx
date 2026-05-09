import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ExpertAdminPage from './pages/ExpertAdminPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-[#0B0F19]">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expert/:id" element={<ExpertDetailPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/admin" element={<ExpertAdminPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;