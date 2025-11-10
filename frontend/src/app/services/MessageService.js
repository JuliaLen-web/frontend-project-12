import { api } from './api';

const messageAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
        method: 'GET',
      }),
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
    editMessage: builder.mutation({
      query: (editedMessage, id) => ({
        url: `/messages:${id}`,
        method: 'PATCH',
        body: editedMessage,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages:${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation,
} = messageAPI;
