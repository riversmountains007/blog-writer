// store/postsApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AppwriteService from '../appwrite/db&storage';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '', // Required even if empty
    prepareHeaders: (headers) => {
      // Add Appwrite-specific headers if needed
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      queryFn: async () => {
        try {
          const response = await AppwriteService.getPosts([]);
          return { data: response.documents };
        } catch (error) {
          return { error: error.response || error };
        }
      },
      keepUnusedDataFor: 30, // Cache duration in seconds
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;