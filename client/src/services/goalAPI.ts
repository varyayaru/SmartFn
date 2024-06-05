import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

class GoalAPI {
  constructor(private readonly api: AxiosInstance) {}

  getGoals() {
    return this.api.get('/api/goal').then(({ data }) => data);
  }

  createGoal(data) {
    return this.api.post('/api/goal', data).then(({ data }) => data);
  }

  editGoal(data) {
    return this.api.put(`/api/goal/${data.id}`, data).then((res) => {
      console.log(res.data);
      return res.data;
    });
  }

  deleteGoal(id) {
    return this.api.delete(`/api/goal/${id}`).then(({ data }) => data);
  }

  addMoneyGoal(data) {
    return this.api.post('/api/transgoal', data).then(({ data }) => data);
  }
}

const goalAPI = new GoalAPI(axiosInstance);

export default goalAPI;
