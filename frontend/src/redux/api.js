import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      })
    }),
    refreshToken: builder.query({
      query: () => '/auth/refresh'
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      })
    })

    , 
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      })
    })
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useRefreshTokenQuery

} = api;