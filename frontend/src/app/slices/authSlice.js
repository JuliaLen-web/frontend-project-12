import { createSlice } from '@reduxjs/toolkit'

const valueFromStorage = (type) => {
  if (localStorage.getItem('credentials')) {
    switch (type) {
      case 'user':
        return JSON.parse(localStorage.getItem('credentials')).username
      case 'token':
        return JSON.parse(localStorage.getItem('credentials')).token
      default:
        return null
    }
  }
  else {
    return null
  }
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: valueFromStorage('user'),
    token: valueFromStorage('token'),
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.username
      state.token = payload.token
      localStorage.setItem('credentials', JSON.stringify(payload))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('credentials')
    },
  },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = state => state.auth.user
