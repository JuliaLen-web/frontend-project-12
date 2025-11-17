import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: null,
  },
  reducers: {
    saveChannels(state, { payload }) {
      state.channels = payload;
    },
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
  },
});

export const { saveChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
