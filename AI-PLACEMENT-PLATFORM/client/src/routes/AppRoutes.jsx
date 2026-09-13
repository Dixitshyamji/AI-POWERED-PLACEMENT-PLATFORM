import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import DSA from '../pages/DSA';
import Problem from '../pages/Problem';
import Aptitude from '../pages/Aptitude';
import Resume from '../pages/Resume';
import ReadinessTest from '../pages/ReadinessTest';
import CompanyPlaylists from '../pages/CompanyPlaylists';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dsa" element={<ProtectedRoute><DSA /></ProtectedRoute>} />
      <Route path="/dsa/:id" element={<ProtectedRoute><Problem /></ProtectedRoute>} />
      <Route path="/aptitude" element={<ProtectedRoute><Aptitude /></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>} />
      <Route path="/readiness" element={<ProtectedRoute><ReadinessTest /></ProtectedRoute>} />
      <Route path="/companies" element={<ProtectedRoute><CompanyPlaylists /></ProtectedRoute>} />
    </Routes>
  );
}
