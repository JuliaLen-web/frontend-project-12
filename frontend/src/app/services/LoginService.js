import { api } from './api'

const loginAPI = api.injectEndpoints({
  endpoints: builder => ({
    logIn: builder.mutation({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLogInMutation } = loginAPI
