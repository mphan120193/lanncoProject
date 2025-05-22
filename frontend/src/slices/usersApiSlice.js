import { apiSlice } from './apiSlice';
const USERS_URL = '/auth';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.query({
      query: () => '/refresh'
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),

    // getAlluser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/get-all-user`,
    //     method: 'GET',
    //     body: data,
    //   }),
    // }),
    // getOneUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/get-all-user`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),

    // deleteUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/delete-user`,
    //     method: 'DELETE',
    //     body: data,
    //   }),
    // }),

    // editUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/edit-user`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),

    // getAllCodes: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/allcodes`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),

    // registerWImage: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/create-user-wimage`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),

    // createGetInTouchMessage: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/create-get-in-touch-message`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),


    

  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
  // useUpdateUserMutation,
  // useGetAlluserMutation,
  // useDeleteUserMutation,
  // useEditUserMutation,
  // useGetAllCodesMutation,
  // useRegisterWImageMutation,
  
  // useGetOneUserMutation,
  // useCreateGetInTouchMessageMutation
} = userApiSlice;
