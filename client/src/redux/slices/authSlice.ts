import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { InitialUserType } from '../../types/authTypes';
import { logoutThunk, refreshThunk, signInThunk, signUpThunk } from './authThunkActions';

const initialState: InitialUserType = {
  accessToken: '',
  userData: {
    status: 'fetching',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.userData.status = 'logged';
      state.userData = { ...user, ...state.userData };
    });

    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.userData.status = 'logged';
      state.userData = { ...user, ...state.userData };
    });
    builder.addCase(refreshThunk.rejected, (state,action)=>{
      state.userData.status = 'guest'
    }) //??????
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      const { accessToken, user } = action.payload;
      state.accessToken = accessToken;
      state.userData.status = 'logged';
      state.userData = { ...user, ...state.userData }; //!
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.accessToken = '';
      state.userData = { status: 'guest' }; //!
    });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;
