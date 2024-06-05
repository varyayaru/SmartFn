// IncPieChart.js

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

export default function IncPieChart({ totalSum, wid, hei }): JSX.Element {
  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [totalSum],
        backgroundColor: ['rgb(192, 255, 192)'], // установка зеленого цвета
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `💸 ${totalSum}₽`;
          },
        },
        bodyFont: {
          size: 26,
        },
        displayColors: false,
        position: 'nearest',
      },
    },
  };

  return (
    <Box width={wid} height={hei}>
      <Doughnut data={data} options={options} />
    </Box>
  );
}
