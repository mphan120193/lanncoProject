
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let token = localStorage.getItem('accessToken');

  const baseQuery = fetchBaseQuery({
    baseUrl: backendURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error.originalStatus === 401 || result.error.originalStatus === 403)) {
    console.error('Access denied or unauthorized! Logging out...');
    // Dispatch the logout action
    api.dispatch(logout());
    // Clear localStorage
    localStorage.clear();


  }
  return result;
};

export const doctorApi = createApi({
  reducerPath: 'doctorapi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({

    getDoctorList: builder.query({
      query: (params) => ({
        url: `/doctor/get-doctor-list`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['DoctorList'],
    }),

    getDoctorDetailByID: builder.mutation({
      query: (inputParams) => ({
        url: `/doctor/get-doctor-detail-by-id`,
        method: 'GET',
        params: inputParams,
      }),
    }),

    saveDoctorInfor: builder.mutation({
      query: (data) => ({
        url: `/doctor/save-doctor-infor`,
        method: 'POST',
        body: data,
      }),
    }),

    getScheduleListByDoctorIDDate: builder.mutation({
      query: (inputParams) => ({
        url: `/doctor/get-schedule-list-by-doctorID-date`,
        method: 'GET',
        params: inputParams,
      }),
    }),

    getScheduleDetailsByDoctorIDandDate: builder.mutation({
      query: (inputParams) => ({
        url: `/doctor/get-schedule-detail-by-doctorID`,
        method: 'GET',
        params: inputParams,
      }),
    }),


  })
});

export const {
  useGetDoctorListQuery,
  useGetDoctorDetailByIDMutation,
  useSaveDoctorInforMutation,
  useGetScheduleListByDoctorIDDateMutation,
  useGetScheduleDetailsByDoctorIDandDateMutation



} = doctorApi;
