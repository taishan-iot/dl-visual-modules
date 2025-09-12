// src/components/FeatureStabilityModule.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const folds = [
  ['使用時間', '互動次數', '會員等級'],
  ['使用時間', '互動次數'],
  ['使用時間', '會員等級'],
  ['使用時間', '互動次數', '年齡'],
  ['使用時間', '會員等級', '互動次數'],
];

const allFeatures = ['年齡', '使用時間', '互動次數', '地區', '會員等級'];

const FeatureStabilityModule = () => {
  const countMap = {};
  allFeatures.forEach((f) => (countMap[f] = 0));
  folds.forEach((fold) => {
    fold.forEach((f) => {
      countMap[f] += 1;
    });
  });

  const stabilityScores = allFeatures.map((f) => ({
    name: f,
    count: countMap[f],
  }));

  const chartData = {
    labels: stabilityScores.map((f) => f.name),
    datasets: [
      {
        label: '被選中次數（穩定性分數）',
        data: stabilityScores.map((f) => f.count),
        backgroundColor: '#4ade80',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const simulatedAccuracies = [88, 89, 87, 90, 88];
  const mean =
    (simulatedAccuracies.reduce((a, b) => a + b, 0) / simulatedAccuracies.length).toFixed(1);
  const std = Math.sqrt(
    simulatedAccuracies.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / simulatedAccuracies.length
  ).toFixed(2);

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-stability">
      <h2 className="text-xl font-bold mb-4">特徵穩定性分析器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請觀察在 5-fold 資料切分下，特徵選擇結果是否一致，並分析穩定性與模型效能。
      </p>

      {/* 模擬效能 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>平均準確率：<strong>{mean}%</strong> 標準差：<strong>{std}</strong></p>
        <p className="text-xs text-gray-500">標準差越小代表模型越穩定，泛化能力越強。</p>
      </div>

      {/* Fold 結果表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">各 Fold 特徵選擇結果</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Fold</th>
              <th className="border px-2 py-1">選出特徵</th>
            </tr>
          </thead>
          <tbody>
            {folds.map((features, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">Fold {idx + 1}</td>
                <td className="border px-2 py-1 text-green-600 font-medium">
                  {features.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 穩定性視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">特徵穩定性分布</h3>
        <Bar data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          被選中次數越高，代表該特徵在不同資料切分下都被選中 → 穩定性高。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 穩定性與泛化能力說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>穩定性高的特徵在不同資料切分下都被選中 → 泛化能力強</li>
          <li>不穩定特徵可能受資料分布影響 → 適合進一步驗證或視覺化</li>
          <li>可搭配重要性分析與模型效能交叉比對 → 建立穩定特徵池</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureStabilityModule;