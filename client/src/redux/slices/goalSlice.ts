import { createSlice } from '@reduxjs/toolkit';

import {
  addMoneyGoalThunk,
  createGoalThunk,
  deleteGoalThunk,
  editGoalThunk,
  getGoalsThunk,
} from './goalsThunkActions';

const initialState = {
  goals: [],
  selectedGoal: null,
};
const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setSelectedGoal(state, action) {
      state.selectedGoal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGoalsThunk.fulfilled, (state, { payload }) => {
      state.goals = payload;
    });
    builder.addCase(createGoalThunk.fulfilled, (state, { payload }) => {
      state.goals = [payload, ...state.goals];
    });
    builder.addCase(editGoalThunk.fulfilled, (state, action) => {
      console.log('------', action);
      const { payload } = action;
      state.goals = state.goals.map((el) => (el.id === payload.id ? payload : el));
    });
    builder.addCase(deleteGoalThunk.fulfilled, (state, { payload }) => {
      state.goals = state.goals.filter((el) => el.id !== payload);
    });
    builder.addCase(addMoneyGoalThunk.fulfilled, (state, { payload }) => {
      state.selectedGoal = null;
      
    });
  },
});

export const { setSelectedGoal } = goalsSlice.actions;
const goalsReducer = goalsSlice.reducer;
export default goalsReducer;
