// src/components/FeatureImportanceComparer.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import FeatureTermGlossary from './FeatureTermGlossary';

const allFeatures = ['年齡', '使用時間', '互動次數', '地區', '會員等級'];

const importanceByModel = {
  linear: {
    年齡: 0.2,
    使用時間: 0.9,
    互動次數: 0.7,
    地區: 0.1,
    會員等級: 0.5,
  },
  tree: {
    年齡: 0.4,
    使用時間: 0.8,
    互動次數: 0.9,
    地區: 0.2,
    會員等級: 0.6,
  },
  shap: {
    年齡: 0.3,
    使用時間: 0.85,
    互動次數: 0.75,
    地區: 0.15,
    會員等級: 0.65,
  },
};

const FeatureImportanceComparer = () => {
  const [model, setModel] = useState('linear');

  const scores = importanceByModel[model];
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  const chartData = {
    labels: sorted.map((f) => f.name),
    datasets: [
      {
        label: '特徵重要性分數',
        data: sorted.map((f) => f.score),
        backgroundColor: '#60a5fa',
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

  const topFeatures = sorted.slice(0, 3).map((f) => f.name);

  const modelDescriptions = {
    linear: {
      label: '線性模型（Logistic Regression）',
      explain: '特徵重要性來自係數絕對值，代表對預測結果的線性貢獻。',
    },
    tree: {
      label: '樹模型（Random Forest / XGBoost）',
      explain: '特徵重要性來自分裂次數與資訊增益，代表對決策路徑的影響力。',
    },
    shap: {
      label: 'SHAP（SHapley Values）',
      explain: '特徵重要性來自每個特徵對預測的平均貢獻值，具備全局解釋力。',
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-importance">
      <h2 className="text-xl font-bold mb-4">特徵重要性比較器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請比較不同模型對特徵的重要性排序，並分析差異與解釋力。
      </p>

      {/* 模型選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇模型：</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="linear">線性模型</option>
          <option value="tree">樹模型</option>
          <option value="shap">SHAP 解釋器</option>
        </select>
      </div>

      {/* 特徵重要性表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">特徵重要性排序（{modelDescriptions[model].label}）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">特徵</th>
              <th className="border px-2 py-1">重要性分數</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-blue-600 font-medium">{f.name}</td>
                <td className="border px-2 py-1">{f.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 條狀圖視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">視覺化：特徵重要性分布</h3>
        <Bar data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          分數越高代表該特徵對模型預測貢獻越大。不同模型可能有不同排序。
        </p>
      </div>

      {/* 差異分析區塊 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 差異分析與交集特徵</h3>
        <p>目前模型的 Top 3 特徵：<strong>{topFeatures.join(', ')}</strong></p>
        <p className="mt-2 text-gray-600">
          可與其他模型的排序結果進行交叉比對，找出穩定且具解釋力的特徵。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 模型邏輯與解釋力說明</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {modelDescriptions[model].label}
        </p>
        <p className="text-gray-600">{modelDescriptions[model].explain}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          <li>線性模型適合解釋性強的場景，但無法捕捉非線性關係</li>
          <li>樹模型能自動學習交互與非線性，但解釋力較弱</li>
          <li>SHAP 提供全局與局部解釋，適合模型部署與風險分析</li>
        </ul>
      </div>
      <FeatureTermGlossary terms={allFeatures} />
    </div>
  );
};

export default FeatureImportanceComparer;