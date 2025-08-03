import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import { api } from './redux/api.js';
import { userApi } from './slices/userApiSlice.js';








const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    



    auth: authReducer,
    


  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: {
        warnAfter: 128,
      },
    }).concat(api.middleware, userApi.middleware),
  devTools: true,
});


export default store
