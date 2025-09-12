// src/components/OutlierModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rawData = [22, 25, 24, 23, 26, 27, 100, 28, 24, 23]; // 100 為異常值

const OutlierModule = () => {
  const [method, setMethod] = useState('zscore');
  const [strategy, setStrategy] = useState('highlight');

  const mean = rawData.reduce((a, b) => a + b, 0) / rawData.length;
  const std = Math.sqrt(rawData.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / rawData.length);

  const getOutliers = () => {
    if (method === 'zscore') {
      return rawData.map((v) => Math.abs((v - mean) / std) > 2);
    } else {
      const sorted = [...rawData].sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length / 4)];
      const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
      const iqr = q3 - q1;
      return rawData.map((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);
    }
  };

  const outliers = getOutliers();
  const outlierCount = outliers.filter(Boolean).length;
  const outlierRatio = Math.round((outlierCount / rawData.length) * 100);

  const processedData = rawData.map((v, i) => {
    if (!outliers[i]) return v;
    if (strategy === 'remove') return null;
    if (strategy === 'replace') return Math.round(mean);
    return v;
  }).filter((v) => v !== null);

  const chartData = {
    labels: processedData.map((_, i) => `樣本 ${i + 1}`),
    datasets: [
      {
        label: '數值',
        data: processedData,
        backgroundColor: processedData.map((v, i) =>
          outliers[i] ? '#f87171' : '#60a5fa'
        ),
      },
    ],
  };

  const accuracy = strategy === 'highlight'
    ? 88
    : strategy === 'remove'
    ? 90
    : strategy === 'replace'
    ? 87
    : 85;

  return (
    <div className="p-4 bg-white rounded shadow" id="module-4">
      <h2 className="text-xl font-bold mb-4">資料異常值偵測器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。資料中可能存在極端值，請選擇偵測方法與處理策略，觀察資料分布與模型準確率的變化。
      </p>

      {/* 偵測方法選擇 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇偵測方法：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="zscore">Z-score</option>
          <option value="iqr">IQR</option>
        </select>
      </div>

      {/* 處理策略選擇 */}
      <div className="mb-6">
        <label className="font-medium mr-4">選擇處理策略：</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="highlight">僅標示</option>
          <option value="remove">移除異常值</option>
          <option value="replace">以平均值替代</option>
        </select>
      </div>

      {/* 數值分布圖 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">數值分布視覺化</h3>
        <Bar data={chartData} />
        <p className="mt-2 text-sm text-gray-600">
          偵測到異常值：{outlierCount} 筆（約 {outlierRatio}%）
        </p>
      </div>

      {/* 模擬準確率 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 模型準確率模擬</h3>
        <p>預估準確率：<strong>{accuracy}%</strong></p>
        <p className="text-xs text-gray-500">
          模擬假設：異常值處理方式會影響模型穩定性與泛化能力。
        </p>
      </div>

      {/* 偵測方法數學式與說明 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 偵測方法數學式與適用情境</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Z-score</strong>：Z = (X - μ) / σ → 適用於常態分布資料</li>
            <li><strong>IQR</strong>：IQR = Q₃ - Q₁，異常值判斷：X &lt; Q₁ - 1.5 × IQR 或 X &gt; Q₃ + 1.5 × IQR</li>
          <li>Z-score 對極端值敏感，IQR 對偏態資料更穩健</li>
        </ul>
      </div>
    </div>
  );
};

export default OutlierModule;