import type { AxiosInstance, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

class CatAPI {
  constructor(private readonly api: AxiosInstance) {}

  getCatsTrans(date): Promise {
    return this.api.post('/api/category/trans', date).then(({ data }) => data);
  }

  getCat(): Promise {
    return this.api('/api/category')
      .then(({ data }) => data)
      .catch(console.log);
  }

  delCat(id): Promise<AxiosResponse> {
    return this.api
      .delete(`/api/category/${id}`)
      .then(({ data }) => data)
      .catch(console.log);
  }

  updateCat(formData): Promise {
    console.log(formData);

    return this.api.put(`/api/category/${formData.id}`, formData).then(({ data }) => data);
  }

  addCat(formData): Promise {
    return this.api.post('/api/category', formData).then(({ data }) => data);
  }
}

const catAPI = new CatAPI(axiosInstance);

export default catAPI;
