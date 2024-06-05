import { createAsyncThunk } from '@reduxjs/toolkit';
import catAPI from '../../services/CatAPI';
import transAPI from '../../services/transAPI';

type AddCategoryPayload = {
  name: string;
  emoji: string;
};

export const getCatsTransThunk = createAsyncThunk('income/getIncomesMonth', async (date) =>
  transAPI.getIncomesMonth(date),
);

export const getCategoriesThunk = createAsyncThunk('categories/getCategories', async () =>
  catAPI.getCat().then((data) => data),
);

export const delCategoriesThunk = createAsyncThunk('categories/delCategories', async (id) =>
  catAPI.delCat(id).then(() => id),
);

export const addCategoriesThunk = createAsyncThunk(
  'categories/addCategories',
  async (formData: AddCategoryPayload) => {
    const data = await catAPI.addCat(formData);
    return data;
  },
);

export const updateCategoriesThunk = createAsyncThunk(
  'categories/updateCategory',
  async (formData: { id: number; name: string; emoji: string }) => {
    const data = await catAPI.updateCat(formData);
    return data;
  },
);
