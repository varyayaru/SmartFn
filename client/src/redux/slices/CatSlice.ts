import { createSlice } from '@reduxjs/toolkit';
import {
  getCategoriesThunk,
  delCategoriesThunk,
  addCategoriesThunk,
  updateCategoriesThunk,
} from './CatThunkAction';
import { getExpendsMonthThunk, getIncomesMonthThunk } from './transThunkActions';

const initialState = {
  categories: [],
  pieChart: [],
  choosenMonth: new Date().getMonth() + 1,
  choosenYear: new Date().getFullYear(),
};

const categorySlice = createSlice({
  name: 'categorySlice',
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
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(delCategoriesThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter((el) => el.id !== action.payload);
    });

    builder.addCase(addCategoriesThunk.fulfilled, (state, action) => {
      state.categories = [action.payload, ...state.categories];
    });

    builder.addCase(updateCategoriesThunk.fulfilled, (state, action) => {
      state.categories = state.categories.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat,
      );
    });
    builder.addCase(getIncomesMonthThunk.fulfilled, (state, { payload }) => {
      state.incomes = payload;
    });
    builder.addCase(getExpendsMonthThunk.fulfilled, (state, { payload }) => {
      state.expends = payload;
    });
  },
});

export const { setPrevMonth, setNextMonth } = categorySlice.actions;
// const transReducer = transSlice.reducer;
// export default transReducer;

export default categorySlice.reducer;
