import { createSlice } from '@reduxjs/toolkit';
import {
  getCategoriesThunk,
  delCategoriesThunk,
  addCategoriesThunk,
  updateCategoriesThunk,
} from './CatThunkAction';

const initialState = {
  category: [],
};

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(delCategoriesThunk.fulfilled, (state, action) => {
      state.category = state.category.filter((el) => el.id !== action.payload);
    });

    builder.addCase(addCategoriesThunk.fulfilled, (state, action) => {
      state.category = [action.payload, ...state.category];
    });

    builder.addCase(updateCategoriesThunk.fulfilled, (state, action) => {
      state.categories = state.categories.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat,
      );
    });
  },
});

export default categorySlice.reducer;
