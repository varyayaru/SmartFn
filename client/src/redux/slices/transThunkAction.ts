import { createAsyncThunk } from '@reduxjs/toolkit';
import transAPI from '../../services/transAPI';

export const getIncomesMonthThunk = createAsyncThunk('income/getIncomesMonth', async (monthData) =>
  transAPI.getIncomesMonth(monthData),
);
export const getExpendsMonthThunk = createAsyncThunk('expend/getExpendsMonth', async (monthData) =>
  transAPI.getExpendsMonth(monthData),
);
