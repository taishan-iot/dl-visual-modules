// src/components/MissingValueModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rawData = [
  { name: 'Alice', age: 25, income: 50000 },
  { name: 'Bob', age: null, income: 60000 },
  { name: 'Charlie', age: 22, income: null },
  { name: 'Dana', age: null, income: null },
];

const MissingValueModule = () => {
  const [strategy, setStrategy] = useState('mean');

  const ages = rawData.map((d) => d.age);
  const incomes = rawData.map((d) => d.income);

  const countMissing = (arr) => arr.filter((v) => v === null).length;
  const total = rawData.length;

  const mean = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const median = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? Math.round((sorted[mid - 1] + sorted[mid]) / 2)
      : sorted[mid];
  };
  const mode = (arr) => {
    const freq = {};
    arr.forEach((v) => (freq[v] = (freq[v] || 0) + 1));
    return parseInt(Object.keys(freq).reduce((a, b) => (freq[a] > freq[b] ? a : b)));
  };

  const fillAge = strategy === 'mean' ? mean(ages.filter((v) => v !== null)) :
                 strategy === 'median' ? median(ages.filter((v) => v !== null)) :
                 mode(ages.filter((v) => v !== null));

  const fillIncome = strategy === 'mean' ? mean(incomes.filter((v) => v !== null)) :
                    strategy === 'median' ? median(incomes.filter((v) => v !== null)) :
                    mode(incomes.filter((v) => v !== null));

  const filledData = rawData
    .filter((row) => strategy !== 'drop' || (row.age !== null && row.income !== null))
    .map((row) => ({
      name: row.name,
      age: row.age === null ? fillAge : row.age,
      income: row.income === null ? fillIncome : row.income,
    }));

  const chartData = {
    labels: ['Age 缺值', 'Income 缺值'],
    datasets: [
      {
        label: '缺值筆數',
        data: [countMissing(ages), countMissing(incomes)],
        backgroundColor: ['#fbbf24', '#60a5fa'],
      },
    ],
  };

  const accuracy = strategy === 'drop'
    ? 85
    : strategy === 'mean'
    ? 88
    : strategy === 'median'
    ? 89
    : 87;

  return (
    <div className="p-4 bg-white rounded shadow" id="module-2">
      <h2 className="text-xl font-bold mb-4">缺值處理模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。資料中存在缺值，請選擇適當的處理策略，觀察資料與模型準確率的變化。
      </p>

      {/* 缺值分布圖 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">原始資料缺值分布</h3>
        <Bar data={chartData} />
        <p className="mt-2 text-sm text-gray-600">
          共 {total} 筆資料，Age 缺值 {countMissing(ages)} 筆，Income 缺值 {countMissing(incomes)} 筆
        </p>
      </div>

      {/* 原始資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">原始資料（含缺值）</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">姓名</th>
              <th className="border px-2 py-1 text-left">年齡</th>
              <th className="border px-2 py-1 text-left">收入</th>
            </tr>
          </thead>
          <tbody>
            {rawData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">
                  {row.age === null ? <span className="text-red-500">缺值</span> : row.age}
                </td>
                <td className="border px-2 py-1">
                  {row.income === null ? <span className="text-red-500">缺值</span> : row.income}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 策略選擇與處理後資料 */}
      <div className="mb-4">
        <label className="mr-4 font-medium">選擇填補策略：</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="mean">平均值填補</option>
          <option value="median">中位數填補</option>
          <option value="mode">眾數填補</option>
          <option value="drop">刪除缺值列</option>
        </select>
      </div>

      {/* 模擬準確率 */}
      <p className="mb-6 text-sm text-gray-600">
        模擬預測準確率：<strong>{accuracy}%</strong>
      </p>

      {/* 處理後資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">處理後資料</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">姓名</th>
              <th className="border px-2 py-1 text-left">年齡</th>
              <th className="border px-2 py-1 text-left">收入</th>
            </tr>
          </thead>
          <tbody>
            {filledData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.age}</td>
                <td className="border px-2 py-1">{row.income}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 缺值處理策略說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>平均值填補</strong>：μ = (1/n) × Σxᵢ，適用於常態分布資料。</li>
          <li><strong>中位數填補</strong>：排序後取中間值，適用於有極端值的資料。</li>
          <li><strong>眾數填補</strong>：出現次數最多的值，適用於類別型欄位。</li>
          <li><strong>刪除缺值列</strong>：適用於缺值比例極低（小於 5%）的情境。</li>
        </ul>
      </div>
    </div>
  );
};

export default MissingValueModule;