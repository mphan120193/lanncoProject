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
    
    api.dispatch(logout());
    
    localStorage.clear();


  }

  return result;
};

export const userApi = createApi({
  reducerPath: 'userapi',

  baseQuery: baseQueryWithReauth,

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
    }),

    getAllUser: builder.query({
      query: (params) => ({
        url: `/auth/get-all-user`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['UserList'],
    }),









    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/auth/delete-user`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['UserList'],
    }),

    getAllCode: builder.query({
      query: (params) => ({
        url: `/auth/get-all-code`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['CodeList'],
    }),

    registerWImage: builder.mutation({
      query: (data) => ({
        url: `auth/create-user-wimage`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UserList'],
    }),

    editUser: builder.mutation({
      query: (data) => ({
        url: `/auth/edit-user`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['UserList'],
    }),

    createGetInTouchMessage: builder.mutation({
      query: (data) => ({
        url: `/auth/create-get-in-touch-message`,
        method: 'POST',
        body: data,
      }),
    }),

    getInTouchSendConfirmEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/get-in-touch-send-confirm-email`,
        method: 'POST',
        body: data,
      }),
    }),

    getAllMessage: builder.query({
      query: (params) => ({
        url: `/auth/get-all-customer-message`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['MessageList'],
    }),

    updateStatusCustomerMessage: builder.mutation({
      query: (data) => ({
        url: `/auth/update-status-customer-message`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MessageList'],
    }),

    bookAppointment: builder.mutation({
      query: (data) => ({
        url: `/auth/book-appointment`,
        method: 'POST',
        body: data,
      }),
    }),

    sendConfirmEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/send-confirm-email`,
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify`,
        method: 'POST',
        body: data,
      }),
    }),

    getAppointmentByUserID: builder.query({
      query: (params) => ({
        url: `/auth/get-appointments-by-user-id`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['AppointmentList'],
    }),



  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useGetAllCodeQuery,
  useRegisterWImageMutation,
  useLazyGetAllUserQuery,
  useEditUserMutation,
  useCreateGetInTouchMessageMutation,
  useGetInTouchSendConfirmEmailMutation,
  useGetAllMessageQuery,
  useUpdateStatusCustomerMessageMutation,
  useBookAppointmentMutation,
  useSendConfirmEmailMutation,
  useVerifyEmailMutation,
  useGetAppointmentByUserIDQuery


} = userApi;