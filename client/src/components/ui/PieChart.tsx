import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data, wid, hei }): JSX.Element {
  return (
    <Box width={wid} height={hei}>
      <Doughnut data={data} />
    </Box>
  );
}
