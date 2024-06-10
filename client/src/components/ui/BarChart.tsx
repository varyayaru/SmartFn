import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getExpSumThunk, getIncomeSumThunk } from '../../redux/slices/transThunkActions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { bodyFont: { size: 26 } },
  },
};

const now = new Date();
const halfYearAgo = new Date(
  now.getFullYear() - Math.floor((now.getMonth() + Number(now.getDate() > 15)) / 6) * 6,
  0,
  1,
);

function getMonthName(month) {
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ];
  return monthNames[month];
}

const labels = [];
for (let i = 0; i < 6; i++) {
  const monthIndex = (halfYearAgo.getMonth() + i) % 12;
  labels.push(getMonthName(monthIndex));
}

const BarChart = React.memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(getIncomeSumThunk());
    void dispatch(getExpSumThunk());
  }, [dispatch]);

  const sumIncome = useAppSelector((state) => state.trans.incomeSums);
  const sumExp = useAppSelector((state) => state.trans.expSums);

  const data = {
    labels,
    datasets: [
      {
        label: 'Доходы',
        data: sumIncome,
        backgroundColor: 'rgba(94, 230, 83, 0.55)',
      },
      {
        label: 'Расходы',
        data: sumExp,
        backgroundColor: 'rgba(233, 66, 66, 0.55)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
});

export default BarChart;
