import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeChannel: null,
    isOpenedSidebar: true,
  },
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload
    },
    setToggleSidebar(state, { payload }) {
      state.isOpenedSidebar = payload
    },
  },
  selectors: {
    activeChannel: state => state.activeChannel,
    isOpenedSidebar: state => state.isOpenedSidebar,
  },
})

export const { setActiveChannel, setToggleSidebar } = chatSlice.actions

export default chatSlice.reducer

export const selectorActiveChannel = state => state.chat.activeChannel
export const selectorIsOpenedSidebar = state => state.chat.isOpenedSidebar
