import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Доходы', 'Расходы'],
  datasets: [
    {
      label: 'Сумма',
      data: [12, 19], // данные здесь
      backgroundColor: ['rgba(94, 230, 83, 0.55)', 'rgba(233, 66, 66, 0.55)'],
      borderColor: ['rgba(94, 230, 83, 1)', 'rgba(233, 66, 66, 0.50)'],
      borderWidth: 1,
    },
  ],
};

export default function PieChart(): JSX.Element {
  return (
    <Box width="400px" height="400px">
      <Doughnut data={data} />
    </Box>
  );
}
