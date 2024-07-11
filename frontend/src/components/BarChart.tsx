import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  total?: number | number[]
  closed?: number | number[];
}

const BarChart: FC<Props> = function({total, closed}) {
  const data = {
    labels: ['STR', 'FIN', 'QLT', 'MAN', 'STO', 'HR'],
    datasets: [
      {
        label: 'Total',
        data: total ? total : [19, 7, 9, 15, 5, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Closed',
        data: closed ? closed : [14, 6, 8, 15, 5, 9],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Total vs Closed',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='bg-white h-96 w-1/2
    shadow-lg py-2 px-3 rounded-md mt-5'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;