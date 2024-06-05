import { createAsyncThunk } from '@reduxjs/toolkit';
import transAPI from '../../services/transAPI';

export const getIncomesMonthThunk = createAsyncThunk('income/getIncomesMonth', async (monthData) =>
  transAPI.getIncomesMonth(monthData),
);
export const getExpendsMonthThunk = createAsyncThunk('expend/getExpendsMonth', async (monthData) =>
  transAPI.getExpendsMonth(monthData),
);

export const deleteIncomeThunk = createAsyncThunk('income/delete', async (id) => {
  await transAPI.deleteIncome(id);
  return id;
});
export const deleteExpThunk = createAsyncThunk('expend/delete', async (id) => {
  await transAPI.deleteIncome(id);
  return id;
});
export const getIncomeSumThunk = createAsyncThunk('income/sum', async () =>
  transAPI.getIncomeSum(),
);
export const getExpSumThunk = createAsyncThunk('exp/sum', async () => transAPI.getExpSum());

export const getCreateIncome = createAsyncThunk('income/createincome', async (data) =>
  transAPI.getCreateIncome(data),
);
export const getCreateExpend = createAsyncThunk('expend/createexpend', async (data) =>
  transAPI.getCreateExpend(data),
);
