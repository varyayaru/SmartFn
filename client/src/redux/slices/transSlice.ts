import { createSlice } from '@reduxjs/toolkit';
import { getExpendsMonthThunk, getIncomesMonthThunk } from './transThunkAction';

const initialState = {
  incomes: [],
  expends: [],
  choosenMonth: new Date().getMonth() + 1,
  choosenYear: new Date().getFullYear(),
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
  },
});

export const { setPrevMonth, setNextMonth } = transSlice.actions;
const transReducer = transSlice.reducer;
export default transReducer;
