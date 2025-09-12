// src/components/FeatureImportanceChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const FeatureImportanceChart = ({ features = [], selected = [] }) => {
  const chartData = {
    labels: features.map((f) => f.name),
    datasets: [
      {
        label: '特徵重要性分數',
        data: features.map((f) => f.relevance),
        backgroundColor: features.map((f) =>
          selected.includes(f.name) ? '#3b82f6' : '#d1d5db' // 藍色：已選，灰色：未選
        ),
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">📊 特徵重要性視覺化</h3>
      <Bar data={chartData} options={chartOptions} />
      <p className="mt-2 text-sm text-gray-500">
        藍色代表已選入的特徵，灰色代表未選入。分數越高，代表與目標變數關聯越強。
      </p>
    </div>
  );
};

export default FeatureImportanceChart;