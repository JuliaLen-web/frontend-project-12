import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const loginAPI = createApi({
  reducerPath: 'loginAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/login' }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
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

export const { useLogInMutation } = loginAPI;
