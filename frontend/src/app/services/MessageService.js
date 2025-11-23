import { api } from './api';

const messageAPI = api.injectEndpoints({
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
      }),
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: addedMessage } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getMessages', undefined, (draftMessages) => {
              draftMessages?.push(addedMessage);
            }),
          );
        } catch (e) {
          dispatch(api.util.invalidateTags(['Messages']));
        }
      },
    }),
    editMessage: builder.mutation({
      query: (editedMessage, id) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: editedMessage,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery, useAddMessageMutation, useEditMessageMutation, useRemoveMessageMutation,
} = messageAPI;
