import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import type { AuthResponseType, AuthSignInType, AuthSignUpType } from '../types/authTypes';

class TransAPI {
  constructor(private readonly api: AxiosInstance) {}

  getIncomesMonth(timeData): Promise {
    return this.api.post('/api/transaction/income', timeData).then(({ data }) => data);
  }

  getExpendsMonth(timeData): Promise {
    return this.api.post('/api/transaction/expend', timeData).then(({ data }) => data);
  }

  deleteIncome(id): Promise {
    return this.api.delete(`/api/transaction/income/${id}`).then(({ data }) => data);
  }

  getIncomeSum(): Promise {
    return this.api.post('/api/transaction/income/summary').then(({ data }) => data);
  }

  getExpSum() {
    return this.api.post('/api/transaction/exp/summary').then(({ data }) => data);
  }

  getCreateIncome(data) {
    return this.api.post('api/transaction/createincome', data).then(({ data }) => data);
  }

  getCreateExpend(data) {
    return this.api.post('api/transaction/createexpend', data).then(({ data }) => data);
  }
}

const transAPI = new TransAPI(axiosInstance);

export default transAPI;
