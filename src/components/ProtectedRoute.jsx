import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Wraps a route so only authenticated users can access it.
 * Unauthenticated users are redirected to /login.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp();
  const location = useLocation();

  if (!isLoggedIn) {
    // Preserve the intended destination so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
