import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Аналитика',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; // x ->

export const data = {
  labels,
  datasets: [
    {
      label: 'Расходы',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })), // y |
      backgroundColor: 'rgba(233, 66, 66, 0.55)',
    },
    {
      label: 'Доходы',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })), // y |
      backgroundColor: 'rgba(94, 230, 83, 0.55)',
    },
  ],
};

export default function BarChart(): JSX.Element {
  return <Bar options={options} data={data} />;
}
