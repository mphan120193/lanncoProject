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


    
    // Lannco porject api

    addNewRegister: builder.mutation({
      query: (data) => ({
        url: '/lannco/create-register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['RegisterList'],
    }),

    getAllRegister: builder.query({
      query: (params) => ({
        url: `/lannco/get-register`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['RegisterList'],
    }),

    

    getAllRegisterByDate: builder.query({
      query: (params) => ({
        url: `/lannco/get-register-byDate`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['RegisterList'],
    }),

    deleteRegister: builder.mutation({
      query: (data) => ({
        url: `/lannco/delete-register`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['RegisterList'],
    }),

    editRegister: builder.mutation({
      query: (data) => ({
        url: `/lannco/edit-register`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RegisterList'],
    }),

    getAllPaySheet: builder.query({
      query: (params) => ({
        url: `/lannco/get-paysheet`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['PaySheetList'],
    }),
    getAllPaySheetbyDate: builder.query({
      query: (params) => ({
        url: `/lannco/get-paysheet-byDate`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['PaySheetList'],
    }),
    
    addNewPaySheet: builder.mutation({
      query: (data) => ({
        url: '/lannco/create-paysheet',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['PaySheetList'],
    }),

    editInvoice: builder.mutation({
      query: (data) => ({
        url: `/lannco/edit-paysheet`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PaySheetList'],
    }),

    deletePaySheet: builder.mutation({
      query: (data) => ({
        url: `/lannco/delete-paysheet`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PaySheetList'],
    }),

    getAllSubPaySheet: builder.query({
      query: (params) => ({
        url: `/lannco/get-sub-paysheet`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['SubPaySheetList'],
    }),

    addNewSubPaySheet: builder.mutation({
      query: (data) => ({
        url: '/lannco/create-sub-paysheet',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['SubPaySheetList','PaySheetList', 'RegisterList' ],
    }),

    deleteSubPaySheet: builder.mutation({
      query: (data) => ({
        url: `/lannco/delete-sub-paysheet`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['SubPaySheetList','PaySheetList'],
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

  
  
  
  useAddNewRegisterMutation,
  useGetAllRegisterQuery,
  useDeleteRegisterMutation,
  useEditRegisterMutation,
  useGetAllPaySheetQuery,
  useAddNewPaySheetMutation,
  useEditInvoiceMutation,
  useDeletePaySheetMutation,
  useGetAllSubPaySheetQuery,
  useAddNewSubPaySheetMutation,
  useDeleteSubPaySheetMutation,
  useGetAllRegisterByDateQuery, 
  useGetAllPaySheetbyDateQuery

} = userApi;