import { createAsyncThunk } from '@reduxjs/toolkit';
import transAPI from '../../services/transAPI';

export const getCatsTransThunk = createAsyncThunk('income/getIncomesMonth', async (date) =>
  transAPI.getIncomesMonth(date),
);
