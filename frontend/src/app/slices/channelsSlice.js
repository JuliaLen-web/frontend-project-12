import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    activeChannel: null,
  },
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
  },
  selectors: {
    activeChannel: (state) => state.activeChannel,
  },
});

export const { setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

export const selectorActiveChannel = (state) => state.channels.activeChannel;
