import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type { AuthResponseType, AuthSignInType, AuthSignUpType } from '../../types/authTypes';
import authAPI from '../../services/authAPI';

export const signInThunk = createAsyncThunk<AuthResponseType, AuthSignInType>(
  'auth/signin',
  async (data, thunkApi) => {
    try {
      const formData = await authAPI.signIn(data);
      return formData;
    } catch (error) {
      const err = error as AxiosError<Error>;
      // console.log(err);
      return thunkApi.rejectWithValue(err.response?.data.message);
    }
  },
);

export const refreshThunk = createAsyncThunk<AuthResponseType>('auth/refresh', async () =>
  authAPI.refreshToken(),
);

export const signUpThunk = createAsyncThunk<AuthResponseType, AuthSignUpType>(
  'auth/signup',
  async (data) => authAPI.signUp(data),
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => authAPI.logout());
