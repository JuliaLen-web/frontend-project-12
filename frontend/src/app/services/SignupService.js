import { api } from './api';

const signupAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signupAPI;
