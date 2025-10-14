import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import ComplaintDetails from './pages/ComplaintDetails'; // 1. Import the new component
import ReportIssue from './pages/ReportIssue';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/complaints" element={<ProtectedRoute><Complaints /></ProtectedRoute>} />
            {/* 2. Add the new route for complaint details */}
            <Route path="/complaints/:id" element={<ProtectedRoute><ComplaintDetails /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}