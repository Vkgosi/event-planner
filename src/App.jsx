import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddEventPage from './pages/AddEventPage';
import EditEventPage from './pages/EditEventPage';
import HelpPage from './pages/HelpPage';

import './styles/global.css';

/**
 * Root application component.
 * Sets up the Context provider, router, and route definitions.
 */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        {/* Fixed header rendered on every route */}
        <Header />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes — require authentication */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <AddEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-event/:id"
            element={
              <ProtectedRoute>
                <EditEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback — redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
