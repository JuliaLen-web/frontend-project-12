import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAuth } from '../app/slices/authSlice';

export const useAuth = () => {
  const auth = useSelector(selectCurrentAuth);

  return useMemo(() => ({ ...auth }), [auth]);
};
