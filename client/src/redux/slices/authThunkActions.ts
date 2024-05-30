import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponseType, AuthSignInType, AuthSignUpType } from '../../types/authTypes';
import authAPI from '../../services/authAPI';
import { AxiosResponse } from 'axios';

export const signInThunk = createAsyncThunk<AuthResponseType, AuthSignInType>(
  'auth/signin',
  async (data) => authAPI.signIn(data),
);

export const refreshThunk = createAsyncThunk<AuthResponseType>('auth/refresh', async () =>
  authAPI.refreshToken(),
);

export const signUpThunk = createAsyncThunk<AuthResponseType, AuthSignUpType>(
  'auth/signUp',
  async (data) => authAPI.signUp(data), //!
);

export const logoutThunk = createAsyncThunk<Promise<AxiosResponse>>('auth/logout', async () =>
  authAPI.logout(),
);
