// src/components/NumericTransformModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rawData = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 40 },
  { name: 'Charlie', age: 22 },
  { name: 'Dana', age: 35 },
  { name: 'Eve', age: 60 },
];

const NumericTransformModule = () => {
  const [method, setMethod] = useState('standard');

  const ages = rawData.map((row) => row.age);
  const min = Math.min(...ages);
  const max = Math.max(...ages);
  const mean = ages.reduce((a, b) => a + b, 0) / ages.length;
  const std = Math.sqrt(ages.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / ages.length);

  const transform = () => {
    if (method === 'standard') {
      return rawData.map((row) => ({
        ...row,
        transformed: parseFloat(((row.age - mean) / std).toFixed(2)),
      }));
    } else if (method === 'normalize') {
      return rawData.map((row) => ({
        ...row,
        transformed: parseFloat(((row.age - min) / (max - min)).toFixed(2)),
      }));
    } else {
      // 分箱：青年 <30、中年 30–50、老年 >50
      return rawData.map((row) => ({
        ...row,
        transformed:
          row.age < 30 ? '青年' : row.age <= 50 ? '中年' : '老年',
      }));
    }
  };

  const transformedData = transform();

  const accuracy = method === 'standard' ? 88 : method === 'normalize' ? 90 : 85;

  const chartData = {
    labels: transformedData.map((row) => row.name),
    datasets: [
      {
        label: '轉換後數值',
        data: transformedData.map((row) =>
          typeof row.transformed === 'number' ? row.transformed : 0
        ),
        backgroundColor: '#60a5fa',
      },
    ],
  };

  const methodDescriptions = {
  standard: {
    label: '標準化公式：Z = (X - μ) / σ',
    explain: '將資料轉換為平均為 0、標準差為 1，適合常態分布資料與線性模型。',
  },
  normalize: {
    label: '正規化公式：X\' = (X - Xmin) / (Xmax - Xmin)',
    explain: '將資料壓縮到 [0, 1] 區間，適合距離敏感模型如 KNN、神經網路。',
  },
  binning: {
    label: '分箱策略：青年 <30、中年 30–50、老年 >50',
    explain: '將連續數值轉為區間類別，有助於提升模型解釋力或處理非線性關係。',
  },
};

  return (
    <div className="p-4 bg-white rounded shadow" id="module-numeric-transform">
      <h2 className="text-xl font-bold mb-4">數值特徵轉換器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請選擇數值轉換方式，觀察資料分布與模型準確率的變化。
      </p>

      {/* 轉換方式選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇轉換方式：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="standard">標準化（Standardization）</option>
          <option value="normalize">正規化（Normalization）</option>
          <option value="binning">分箱（Binning）</option>
        </select>
      </div>

      {/* 模擬準確率 */}
      <p className="mb-4 text-sm text-gray-600">
        模擬預測準確率：<strong>{accuracy}%</strong>
      </p>

      {/* 原始與轉換後資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">資料表格（含轉換後欄位）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">原始年齡</th>
              <th className="border px-2 py-1 text-blue-600">轉換後</th>
            </tr>
          </thead>
          <tbody>
            {transformedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.age}</td>
                <td className="border px-2 py-1 text-blue-600 font-medium">
                  {row.transformed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 數值分布視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">數值分布視覺化</h3>
        <Bar data={chartData} />
        <p className="mt-2 text-sm text-gray-500">
          若為分箱，圖表僅顯示 0（類別）作為視覺佔位。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 數值轉換公式與用途</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600">{methodDescriptions[method].explain}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          <li>轉換方式應根據模型特性與資料分布選擇</li>
          <li>標準化適合常態資料，正規化適合距離敏感模型</li>
          <li>分箱可提升解釋力，但可能損失細節</li>
        </ul>
      </div>
    </div>
  );
};

export default NumericTransformModule;