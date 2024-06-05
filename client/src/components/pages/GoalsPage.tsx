import React, { useEffect } from 'react';
import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import GoalCard from '../ui/GoalCard';
import AddGoalCard from '../ui/AddGoalCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getGoalsThunk } from '../../redux/slices/goalsThunkActions';

export default function GoalsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const goalModal = useAppSelector((state) => state.goals.selectedGoal);
  useEffect(() => {
    void dispatch(getGoalsThunk());
  }, [goalModal]);
  const goals = useAppSelector((state) => state.goals.goals);
  return (
    <Box p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={6}
      >
        <AddGoalCard />
        {goals.map((el) => (
          <GoalCard goal={el} />
        ))}
      </Grid>
    </Box>
  );
}
