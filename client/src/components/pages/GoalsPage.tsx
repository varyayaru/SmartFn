import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import GoalCard from '../ui/GoalCard';
import AddGoalCard from '../ui/AddGoalCard';

export default function GoalsPage(): JSX.Element {
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
        <GoalCard />
        <GoalCard />
        <GoalCard />
        <GoalCard />
      </Grid>
    </Box>
  );
}
