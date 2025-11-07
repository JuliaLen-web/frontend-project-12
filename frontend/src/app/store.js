import { configureStore } from '@reduxjs/toolkit';
import { loginAPI } from './services/LoginService';
import { signupAPI } from './services/SignupService';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [loginAPI.reducerPath]: loginAPI.reducer,
    [signupAPI.reducerPath]: signupAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginAPI.middleware, signupAPI.middleware),
});
