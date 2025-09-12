// src/components/CrossValidationSimulator.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const CrossValidationSimulator = ({ method }) => {
  const simulatedScores = {
    filter: [0.84, 0.85, 0.86, 0.83, 0.87],
    wrapper: [0.89, 0.91, 0.90, 0.92, 0.88],
    embedded: [0.87, 0.88, 0.89, 0.86, 0.88],
  };

  const scores = simulatedScores[method];
  const mean = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  const std = Math.sqrt(
    scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length
  ).toFixed(2);

  const chartData = {
    labels: ['Fold 1', 'Fold 2', 'Fold 3', 'Fold 4', 'Fold 5'],
    datasets: [
      {
        label: '準確率',
        data: scores,
        borderColor: '#10b981',
        backgroundColor: '#d1fae5',
        fill: false,
        tension: 0.3,
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
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">🔁 交叉驗證模擬（{method} 方法）</h3>
      <Line data={chartData} options={chartOptions} />
      <p className="mt-2 text-sm text-gray-600">
        平均準確率：<strong>{mean}</strong> 標準差：<strong>{std}</strong>
      </p>
      <p className="text-xs text-gray-500 mt-1">
        模型效能在不同資料切分下可能波動。標準差越小，代表方法越穩定。
      </p>
    </div>
  );
};

export default CrossValidationSimulator;