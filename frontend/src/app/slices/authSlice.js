import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.username;
      state.token = payload.token;
      localStorage.setItem('userToken', payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    },
  },
});

export const { setCredentials, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentAuth = (state) => state.auth;
