import { api } from './api';

const loginAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLogInMutation } = loginAPI;
