import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

// Регистрация ArcElement и других необходимых элементов и плагинов
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpPieChart({ data, wid, hei, emojisArray }): JSX.Element {
  const options = {
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      },
      tooltip: {
        callbacks: {
          label(context) {
            const value = data.datasets[0].data[context.dataIndex];
            const emoji = emojisArray[context.dataIndex];
            return ` ${value}₽ ${emoji}`;
          },
          title() {
            return '';
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
