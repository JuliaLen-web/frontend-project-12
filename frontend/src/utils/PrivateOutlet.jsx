import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PrivateOutlet = () => {
  const auth = useAuth();

  return auth.user || auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};
