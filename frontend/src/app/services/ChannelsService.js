import { api, socket } from './api';

const channelAPI = api.injectEndpoints({
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData },
      ) {
        socket.on('newChannel', (newChannel) => {
          updateCachedData((draftChannels) => {
            draftChannels.push(newChannel);
          });
        });
        socket.on('removeChannel', (deletedChannel) => {
          updateCachedData((draftChannels) => draftChannels?.filter((channel) => channel.id !== deletedChannel.id));
        });
        socket.on('renameChannel', (editedChannel) => {
          updateCachedData((draftChannels) => {
            draftChannels?.map((channel) => (channel.id === editedChannel.id ? channel.name = editedChannel.name : channel));
          });
        });
      },
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '/channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation,
} = channelAPI;
