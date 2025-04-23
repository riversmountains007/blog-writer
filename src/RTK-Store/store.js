import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { postsApi } from './postsApiSlice'; 
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch); // Good practice for refetch behavior



