import { api, socket } from './api'

const messageAPI = api.injectEndpoints({
  tagTypes: ['Messages'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => ({
        url: '/messages',
      }),
      providesTags: ['Messages'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData },
      ) {
        socket.on('newMessage', (newMessage) => {
          updateCachedData((draftMessages) => {
            draftMessages.push(newMessage)
          })
        })
      },
    }),
    addMessage: builder.mutation({
      query: newMessage => ({
        url: '/messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery, useAddMessageMutation,
} = messageAPI
