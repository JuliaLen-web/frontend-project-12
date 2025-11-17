import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    saveMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});

export const { saveMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
