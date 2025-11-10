import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chat',
  initialState: { channels: [] },
  reducers: {
    saveChannels: (state, { payload }) => {
      // state.channels
      console.log(payload);
    },
  },
});

export const { saveChannels } = slice.actions;

export default slice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
