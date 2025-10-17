import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default function PollChart({ options = [], votes = [] }) {
  const data = {
    labels: options,
    datasets: [
      {
        label: 'Votes',
        data: votes && votes.length ? votes : options.map(_ => 0),
      },
    ],
  };

  return (
    <div style={{maxWidth: '600px'}}>
      <Pie data={data} />
    </div>
  );
}
