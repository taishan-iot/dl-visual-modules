// src/components/ImbalanceModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const ImbalanceModule = () => {
  const [majority, setMajority] = useState(90);
  const [strategy, setStrategy] = useState('none');

  const minority = 100 - majority;

  const getResampledData = () => {
    if (strategy === 'oversample') {
      return { majority: majority, minority: majority };
    } else if (strategy === 'undersample') {
      return { majority: minority, minority: minority };
    } else {
      return { majority, minority };
    }
  };

  const resampled = getResampledData();

  const chartData = {
    labels: ['多數類別', '少數類別'],
    datasets: [
      {
        label: '樣本數',
        data: [resampled.majority, resampled.minority],
        backgroundColor: ['#60a5fa', '#f87171'],
      },
    ],
  };

  const accuracy =
    strategy === 'none'
      ? Math.round(60 + (100 - majority) * 0.2)
      : strategy === 'oversample'
      ? Math.round(75 + (100 - majority) * 0.1)
      : strategy === 'undersample'
      ? Math.round(70 - (majority - 50) * 0.1)
      : 60;

  const strategyDescriptions = {
    none: [
      '模型可能偏向多數類別，導致少數類別預測失準。',
      'Precision 與 Recall 不平衡，影響整體 F1 分數。',
    ],
    oversample: [
      '透過複製或合成少數類別樣本來平衡分布。',
      '可能導致過擬合，模型在少數類別上學得太「死板」。',
    ],
    undersample: [
      '刪除多數類別樣本來平衡分布。',
      '可能損失重要資訊，降低模型泛化能力。',
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-3">
      <h2 className="text-xl font-bold mb-4">資料不平衡模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測交易是否為詐騙。資料中類別分布極度不平衡，請選擇重抽樣策略，觀察模型偏差與預測準確率的變化。
      </p>

      {/* 類別比例調整 */}
      <div className="mb-4">
        <label className="font-medium mr-4">設定多數類別比例：</label>
        <input
          type="range"
          min="50"
          max="95"
          value={majority}
          onChange={(e) => setMajority(parseInt(e.target.value))}
          className="w-64"
        />
        <span className="ml-4 text-sm text-gray-700">{majority}% vs {minority}%</span>
      </div>

      {/* 重抽樣策略選擇 */}
      <div className="mb-6">
        <label className="font-medium mr-4">選擇重抽樣策略：</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="none">不處理</option>
          <option value="oversample">Over-sampling</option>
          <option value="undersample">Under-sampling</option>
        </select>
      </div>

      {/* 類別分布圖 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">類別分布視覺化</h3>
        <Bar data={chartData} />
        <p className="mt-2 text-sm text-gray-600">
          模擬樣本數：多數類別 {resampled.majority} 筆，少數類別 {resampled.minority} 筆
        </p>
      </div>

      {/* 模擬準確率 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 模型準確率模擬</h3>
        <p>預估準確率：<strong>{accuracy}%</strong></p>
        <p className="text-xs text-gray-500">
          模擬假設：類別平衡度與策略選擇會影響模型偏差與準確率。
        </p>
      </div>

      {/* 模型預測偏差說明 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 模型預測偏差說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>TP（True Positive）</strong>：成功預測為詐騙的真實詐騙</li>
          <li><strong>FP（False Positive）</strong>：誤判為詐騙的正常交易</li>
          <li><strong>FN（False Negative）</strong>：漏判的詐騙交易</li>
          <li>類別不平衡會導致 FN 增加，Recall 降低</li>
        </ul>
      </div>

      {/* 策略影響說明 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 重抽樣策略影響</h3>
        <ul className="list-disc pl-5 space-y-1">
          {strategyDescriptions[strategy].map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-700 mt-6">
        <h3 className="text-lg font-semibold mb-2">📘 模型評估指標說明</h3>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Precision</strong>（精確率）：Precision = TP / (TP + FP) → 預測為正類的準確性</li>
            <li><strong>Recall</strong>（召回率）：Recall = TP / (TP + FN) → 找出正類的能力</li>
            <li><strong>F1 Score</strong>：F1 = (2 × P × R) / (P + R) → 精確率與召回率的綜合指標</li>
            <li>在類別不平衡任務中，F1 Score 是更穩健的評估方式。</li>
        </ul>
      </div>
      <div className="mt-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 混淆矩陣範例</h3>
        <table className="table-auto border-collapse border border-gray-400 mb-4">
            <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-400 px-3 py-2">實際類別＼預測結果</th>
                <th className="border border-gray-400 px-3 py-2">預測為正類</th>
                <th className="border border-gray-400 px-3 py-2">預測為負類</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border border-gray-400 px-3 py-2 font-medium">真實為正類</td>
                <td className="border border-gray-400 px-3 py-2 text-green-600 font-semibold">TP（True Positive）</td>
                <td className="border border-gray-400 px-3 py-2 text-red-600 font-semibold">FN（False Negative）</td>
            </tr>
            <tr>
                <td className="border border-gray-400 px-3 py-2 font-medium">真實為負類</td>
                <td className="border border-gray-400 px-3 py-2 text-red-600 font-semibold">FP（False Positive）</td>
                <td className="border border-gray-400 px-3 py-2 text-green-600 font-semibold">TN（True Negative）</td>
            </tr>
            </tbody>
        </table>

        <p className="text-sm text-gray-600">
            Precision = TP / (TP + FP)  Recall = TP / (TP + FN)  F1 Score = 2 × (P × R) / (P + R)
        </p>
      </div>
    </div>
  );
};

export default ImbalanceModule;