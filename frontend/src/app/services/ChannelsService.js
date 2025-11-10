import { api } from './api';

const channelAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '/channels',
        method: 'POST',
        body: newChannel,
      }),
    }),
    editChannel: builder.mutation({
      query: (editedChannel, id) => ({
        url: `/channels:${id}`,
        method: 'PATCH',
        body: editedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (newChannel, id) => ({
        url: `/channels:${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation,
} = channelAPI;
