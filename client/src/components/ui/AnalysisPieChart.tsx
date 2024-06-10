import { Box } from '@chakra-ui/react';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default React.memo(function AnalysisPieChart({ data, wid, hei }) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label(context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label} ${value}₽`;
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
});
