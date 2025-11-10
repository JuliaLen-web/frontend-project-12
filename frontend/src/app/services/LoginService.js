import { api } from './api';

const loginAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    // checkUser: builder.query({
    //   query: () => ({
    //     url: '/login',
    //     method: 'GET',
    //   }),
    // }),
  }),
});

export const { useLogInMutation, useCheckUserQuery } = loginAPI;
