import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
  },
  reducers: {
    saveChannels: (state, { payload }) => {
      state.channels = payload;
    },
    saveMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
});

export const { saveChannels, saveMessages } = slice.actions;

export default slice.reducer;

export const selectChannels = (state) => state.channels;
export const selectMessages = (state) => state.messages;
