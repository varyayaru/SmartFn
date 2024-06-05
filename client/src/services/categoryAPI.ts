import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { AuthResponseType, AuthSignInType, AuthSignUpType } from '../types/authTypes';

class CategoryAPI {
  constructor(private readonly api: AxiosInstance) {}

  getCatsTrans(date) {
    return this.api.post('/api/category/trans', date).then(({ data }) => data);
  }

  getCategory() {
    return this.api.get('/api/category/').then(({ data }) => data);
  }
}
const categoryAPI = new CategoryAPI(axiosInstance);

export default categoryAPI;
