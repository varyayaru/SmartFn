import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { AuthResponseType, AuthSignInType, AuthSignUpType } from '../types/authTypes';

class AuthAPI {
  constructor(private readonly api: AxiosInstance) {}

  signUp(authData: AuthSignUpType): Promise<AuthResponseType> {
    return this.api.post<AuthResponseType>('/api/auth/signup', authData).then(({ data }) => data);
  }

  signIn(authData: AuthSignInType): Promise<AuthResponseType> {
    try {
    return this.api.post<AuthResponseType>('/api/auth/login', authData).then(({ data }) => data);
  } catch (error) {
    const err = error as AxiosError<Error>
    throw new Error(err.response?.data.message)
  }
  }

    
 

  refreshToken(): Promise<AuthResponseType> {
    return this.api<AuthResponseType>('/api/tokens/refresh')
      .then(({ data }) => data)
      .then(
        (data) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(data);
            }, 2000);
          }),
      );
  }

  logout(): Promise<AxiosResponse> {
    return this.api('/api/auth/logout');
  }
}

const authAPI = new AuthAPI(axiosInstance);

export default authAPI;
