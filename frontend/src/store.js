import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import { api } from './redux/api.js';
import { userApi } from './slices/userApiSlice.js';
import { doctorApi } from './slices/doctorApiSlice.js';



import languageReducer from './slices/languageSlice.js';



const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,



    auth: authReducer,
    language: languageReducer,


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: {
        warnAfter: 128,
      },
    }).concat(api.middleware, userApi.middleware, doctorApi.middleware),
  devTools: true,
});


export default store
