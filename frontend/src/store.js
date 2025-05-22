import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import { api } from './redux/api.js';
import languageReducer from './slices/languageSlice.js';
//import loginStateReducer from './slices/loginStateSlice.js';


const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    language: languageReducer,
    // loginState: loginStateReducer,
    
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export default store;
