import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import ChatPage from './app/pages/chat';

export const PrivateOutlet = () => {
  const auth = useAuth();

  return auth.user ? (
    <ChatPage />
  ) : (
    <Navigate to="/login" />
  );
};
