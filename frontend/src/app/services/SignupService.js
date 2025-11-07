import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const signupAPI = createApi({
  reducerPath: 'signupAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/signup' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation } = signupAPI;
