import { createAsyncThunk } from '@reduxjs/toolkit';
import catAPI from '../../services/CatAPI';

type AddCategoryPayload = {
  name: string;
  emoji: string;
};

export const getCategoriesThunk = createAsyncThunk('categories/getCategories', async (_) =>
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
