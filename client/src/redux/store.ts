import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transReducer from './slices/transSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trans: transReducer,
    
  },
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
