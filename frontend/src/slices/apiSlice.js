import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


const backendURL= import.meta.env.VITE_BACKEND_URL;
const baseQuery = fetchBaseQuery({ baseUrl: backendURL,credentials: 'include',

 }
);

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
