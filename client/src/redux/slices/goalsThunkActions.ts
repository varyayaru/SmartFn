import { createAsyncThunk } from '@reduxjs/toolkit';
import goalAPI from '../../services/goalAPI';

export const getGoalsThunk = createAsyncThunk('income/getGoals', async () => goalAPI.getGoals());

export const createGoalThunk = createAsyncThunk('income/createGoals', async (data) =>
  goalAPI.createGoal(data),
);
export const editGoalThunk = createAsyncThunk('goal/edit', async (data) => goalAPI.editGoal(data));
export const deleteGoalThunk = createAsyncThunk('goal/delete', async (id) => {
  await goalAPI.deleteGoal(id);
  return id;
});

export const addMoneyGoalThunk = createAsyncThunk('goal/addMoney', async (data) =>
  goalAPI.addMoneyGoal(data),
);
