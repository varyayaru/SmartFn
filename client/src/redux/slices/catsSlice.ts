import { createSlice } from '@reduxjs/toolkit';
import { getExpendsMonthThunk, getIncomesMonthThunk } from './transThunkActions';
import { getCategoryThunk } from './catsThunkActions';

const initialState = {
  categories: [],
  pieChart: [],
  choosenMonth: new Date().getMonth() + 1,
  choosenYear: new Date().getFullYear(),
};
const catsSlice = createSlice({
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
    builder.addCase(getCategoryThunk.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
  },
});

export const { setPrevMonth, setNextMonth } = catsSlice.actions;
const catsReducer = catsSlice.reducer;
export default catsReducer;
