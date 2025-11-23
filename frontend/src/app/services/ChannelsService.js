import { api } from './api';

const channelAPI = api.injectEndpoints({
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: '/channels',
        method: 'GET',
      }),
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '/channels',
        method: 'POST',
        body: newChannel,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: addedChannel } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getChannels', undefined, (draftChannels) => {
              draftChannels?.push(addedChannel);
            }),
          );
        } catch (e) {
          dispatch(api.util.invalidateTags(['Channels']));
        }
      },
    }),
    editChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: editedChannel } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getChannels', undefined, (draftChannels) => {
              draftChannels?.map((channel) => (channel.id === editedChannel.id ? channel.name = editedChannel.name : channel));
            }),
          );
        } catch (e) {
          dispatch(api.util.invalidateTags(['Channels']));
        }
      },
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedChannel } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getChannels', undefined, (draftChannels) => draftChannels?.filter((channel) => channel.id !== deletedChannel.id)),
          );
        } catch (e) {
          dispatch(api.util.invalidateTags(['Channels']));
        }
      },
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation,
} = channelAPI;
