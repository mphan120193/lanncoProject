
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const doctorApi = createApi({
  reducerPath: 'doctorapi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    credentials: 'include'
  }),
  endpoints: (builder) => ({

    getDoctorList: builder.query({
      query: (params) => ({
        url: `/doctor/get-doctor-list`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DoctorList'],
    }),
    
    
  })
});

export const {
  useGetDoctorListQuery,
  

} = doctorApi;
