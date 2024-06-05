import { createAsyncThunk } from '@reduxjs/toolkit';
import transAPI from '../../services/transAPI';
import categoryAPI from '../../services/categoryAPI';

export const getCatsTransThunk = createAsyncThunk('income/getIncomesMonth', async (date) =>
  transAPI.getIncomesMonth(date),
);
export const getCategoryThunk = createAsyncThunk('category/getCategory', async () => 
categoryAPI.getCategory()) 
