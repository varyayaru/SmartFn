import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './slices/groupSlice';
import authReducer from './slices/authSlice';
import notifyReducer from './slices/notifySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
