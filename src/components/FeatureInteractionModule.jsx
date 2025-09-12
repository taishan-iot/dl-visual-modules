// src/components/FeatureInteractionModule.jsx
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';

const rawData = [
  { name: 'Alice', age: 25, usage: 120, interactions: 30, level: 2 },
  { name: 'Bob', age: 40, usage: 300, interactions: 50, level: 3 },
  { name: 'Charlie', age: 22, usage: 80, interactions: 20, level: 1 },
  { name: 'Dana', age: 35, usage: 500, interactions: 70, level: 4 },
  { name: 'Eve', age: 60, usage: 1000, interactions: 90, level: 5 },
];

const FeatureInteractionModule = () => {
  const [combo, setCombo] = useState('age_usage');

  const computeInteraction = () => {
    return rawData.map((row) => {
      let value;
      if (combo === 'age_usage') {
        value = row.age * row.usage;
      } else if (combo === 'usage_interactions') {
        value = row.usage * row.interactions;
      } else {
        value = row.age * row.level;
      }
      return {
        ...row,
        interaction: parseFloat(value.toFixed(2)),
      };
    });
  };

  const interactionData = computeInteraction();

  const metrics = {
    age_usage: { accuracy: 88, precision: 86, recall: 89 },
    usage_interactions: { accuracy: 91, precision: 90, recall: 92 },
    age_level: { accuracy: 87, precision: 85, recall: 88 },
  };

  const chartData = {
    datasets: [
      {
        label: '交互特徵分布',
        data: interactionData.map((row) => ({
          x: row.age,
          y: row.interaction,
        })),
        backgroundColor: '#f59e0b',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { title: { display: true, text: '年齡' } },
      y: { title: { display: true, text: '交互特徵值' } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const comboDescriptions = {
    age_usage: {
      label: '年齡 × 使用時間',
      explain: '模擬年長者使用時間長 → 穩定用戶的交互特徵。',
    },
    usage_interactions: {
      label: '使用時間 × 互動次數',
      explain: '模擬高使用 + 高互動 → 高黏著度的交互特徵。',
    },
    age_level: {
      label: '年齡 × 會員等級',
      explain: '模擬高年齡 + 高等級 → VIP 穩定群的交互特徵。',
    },
  };

  const { accuracy, precision, recall } = metrics[combo];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-interaction">
      <h2 className="text-xl font-bold mb-4">特徵交互模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請選擇交互特徵組合，觀察模型效能與資料分布的變化。
      </p>

      {/* 交互特徵選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇交互組合：</label>
        <select
          value={combo}
          onChange={(e) => setCombo(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="age_usage">年齡 × 使用時間</option>
          <option value="usage_interactions">使用時間 × 互動次數</option>
          <option value="age_level">年齡 × 會員等級</option>
        </select>
      </div>

      {/* 模擬模型效能 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>模擬準確率：<strong>{accuracy}%</strong></p>
        <p>Precision：{precision}% Recall：{recall}%</p>
      </div>

      {/* 資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">資料表格（含交互特徵）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">年齡</th>
              <th className="border px-2 py-1">使用時間</th>
              <th className="border px-2 py-1">互動次數</th>
              <th className="border px-2 py-1">會員等級</th>
              <th className="border px-2 py-1 text-orange-600">交互特徵</th>
            </tr>
          </thead>
          <tbody>
            {interactionData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.age}</td>
                <td className="border px-2 py-1">{row.usage}</td>
                <td className="border px-2 py-1">{row.interactions}</td>
                <td className="border px-2 py-1">{row.level}</td>
                <td className="border px-2 py-1 text-orange-600 font-medium">
                  {row.interaction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">交互特徵分布視覺化</h3>
        <Scatter data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          X 軸為原始特徵（如年齡），Y 軸為交互特徵值。可觀察交互特徵的分布趨勢。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 交互邏輯與語意解釋</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {comboDescriptions[combo].label}
        </p>
        <p className="text-gray-600 mb-2">{comboDescriptions[combo].explain}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>交互特徵是原始特徵的組合，可捕捉非線性關係</li>
          <li>可手動創建（如乘積），也可由模型自動學習（如樹模型、神經網路）</li>
          <li>交互特徵能提升模型表達力，但也可能增加過擬合風險</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureInteractionModule;