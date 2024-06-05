import { createSlice } from '@reduxjs/toolkit';
import {
  deleteExpThunk,
  deleteIncomeThunk,
  getCreateExpend,
  getCreateIncome,
  getExpSumThunk,
  getExpendsMonthThunk,
  getIncomeSumThunk,
  getIncomesBarChartThunk,
  getIncomesMonthThunk,
} from './transThunkActions';

const initialState = {
  incomes: [],
  expends: [],
  choosenMonth: new Date().getMonth() + 1,
  choosenYear: new Date().getFullYear(),
  incomeSums: null,
  expSums: null,
};
const transSlice = createSlice({
  name: 'trans',
  initialState,
  reducers: {
    setPrevMonth: (state) => {
      if (state.choosenMonth === 1) {
        state.choosenMonth = 12;
        state.choosenYear -= 1;
      } else {
        state.choosenMonth -= 1;
      }
    },
    setNextMonth: (state) => {
      if (state.choosenMonth === 12) {
        state.choosenMonth = 1;
        state.choosenYear += 1;
      } else {
        state.choosenMonth += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIncomesMonthThunk.fulfilled, (state, { payload }) => {
      state.incomes = payload;
    });
    builder.addCase(getExpendsMonthThunk.fulfilled, (state, { payload }) => {
      state.expends = payload;
    });

    builder.addCase(deleteIncomeThunk.fulfilled, (state, { payload }) => {
      state.incomes = state.incomes.filter((el) => el.id !== payload);
    });
    builder.addCase(deleteExpThunk.fulfilled, (state, { payload }) => {
      state.expends = state.expends.filter((el) => el.id !== payload);
    });
    builder.addCase(getIncomeSumThunk.fulfilled, (state, { payload }) => {
      state.incomeSums = payload;
    });
    builder.addCase(getExpSumThunk.fulfilled, (state, { payload }) => {
      state.expSums = payload;
    });
    builder.addCase(getCreateIncome.fulfilled, (state, { payload }) => {
      state.incomes = [payload, ...state.incomes];
    });
    builder.addCase(getCreateExpend.fulfilled, (state, { payload }) => {
      state.expends = [payload, ...state.expends];
    });
  },
});

export const { setPrevMonth, setNextMonth } = transSlice.actions;
const transReducer = transSlice.reducer;
export default transReducer;
