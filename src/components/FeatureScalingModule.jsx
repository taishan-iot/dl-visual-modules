// src/components/FeatureScalingModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const rawData = [
  { name: 'Alice', usage: 120 },
  { name: 'Bob', usage: 300 },
  { name: 'Charlie', usage: 80 },
  { name: 'Dana', usage: 500 },
  { name: 'Eve', usage: 1000 }, // 異常值
];

const FeatureScalingModule = () => {
  const [method, setMethod] = useState('standard');

  const values = rawData.map((row) => row.usage);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
  const sorted = [...values].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
  const iqr = q3 - q1;

  const transform = () => {
    if (method === 'standard') {
      return rawData.map((row) => ({
        ...row,
        scaled: parseFloat(((row.usage - mean) / std).toFixed(2)),
      }));
    } else if (method === 'minmax') {
      return rawData.map((row) => ({
        ...row,
        scaled: parseFloat(((row.usage - min) / (max - min)).toFixed(2)),
      }));
    } else {
      return rawData.map((row) => ({
        ...row,
        scaled: parseFloat(((row.usage - median) / iqr).toFixed(2)),
      }));
    }
  };

  const scaledData = transform();

  const chartData = {
    labels: scaledData.map((row) => row.name),
    datasets: [
      {
        label: '縮放後數值',
        data: scaledData.map((row) => row.scaled),
        backgroundColor: '#34d399',
      },
    ],
  };

  const metrics = {
    standard: { accuracy: 88, precision: 85, recall: 90 },
    minmax: { accuracy: 90, precision: 87, recall: 92 },
    robust: { accuracy: 89, precision: 88, recall: 89 },
  };

  const methodDescriptions = {
  standard: {
    label: "標準化公式：Z = (X - μ) / σ",
    explain: "將資料轉換為平均為 0、標準差為 1，適合常態分布資料與線性模型。",
  },
  minmax: {
    label: "正規化公式：X' = (X - Xmin) / (Xmax - Xmin)",
    explain: "將資料壓縮到 [0, 1] 區間，適合距離敏感模型如 KNN、神經網路。",
  },
  robust: {
    label: "Robust Scaler：X' = (X - median) / IQR",
    explain: "使用中位數與四分位距，對異常值不敏感，適合有極端值的資料集。",
  },
};

  const { accuracy, precision, recall } = metrics[method];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-scaling">
      <h2 className="text-xl font-bold mb-4">特徵縮放模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請選擇特徵縮放方式，觀察資料分布與模型效能的變化。
      </p>

      {/* 縮放方式選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇縮放方式：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="standard">StandardScaler（標準化）</option>
          <option value="minmax">MinMaxScaler（正規化）</option>
          <option value="robust">RobustScaler（中位數縮放）</option>
        </select>
      </div>

      {/* 模擬模型效能 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>模擬預測準確率：<strong>{accuracy}%</strong></p>
        <p>Precision：{precision}% Recall：{recall}%</p>
      </div>

      {/* 原始與縮放後資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">資料表格（含縮放後欄位）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">原始使用時間</th>
              <th className="border px-2 py-1 text-green-600">縮放後</th>
            </tr>
          </thead>
          <tbody>
            {scaledData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.usage}</td>
                <td className="border px-2 py-1 text-green-600 font-medium">
                  {row.scaled}
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
          可觀察不同縮放方式對極端值的影響。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 縮放公式與適用情境</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600">{methodDescriptions[method].explain}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          <li>標準化適合常態資料，正規化適合距離敏感模型</li>
          <li>RobustScaler 對異常值不敏感，適合有極端值的資料集</li>
          <li>縮放前應先分析資料分布與模型特性</li>
        </ul>
      </div>
    

    <div className="mt-8 text-sm text-gray-700">
  <h3 className="text-lg font-semibold mb-2">📘 模組定位比較：數值特徵轉換 vs 特徵縮放</h3>

  {/* 模組定位比較表 */}
  <table className="table-auto border-collapse border text-sm mb-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="border px-3 py-2">模組名稱</th>
        <th className="border px-3 py-2">教學焦點</th>
        <th className="border px-3 py-2">操作方式</th>
        <th className="border px-3 py-2">適用模型</th>
        <th className="border px-3 py-2">教學目的</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border px-3 py-2">數值特徵轉換器</td>
        <td className="border px-3 py-2">型態轉換與表現形式</td>
        <td className="border px-3 py-2">標準化、正規化、分箱</td>
        <td className="border px-3 py-2">線性模型、KNN、樹模型</td>
        <td className="border px-3 py-2">理解轉換邏輯與資料分布影響</td>
      </tr>
      <tr>
        <td className="border px-3 py-2">特徵縮放模擬器</td>
        <td className="border px-3 py-2">尺度調整與異常值敏感度</td>
        <td className="border px-3 py-2">StandardScaler、MinMaxScaler、RobustScaler</td>
        <td className="border px-3 py-2">SVM、KNN、神經網路</td>
        <td className="border px-3 py-2">體驗縮放對模型效能與異常值影響</td>
      </tr>
    </tbody>
  </table>

  {/* 差異重點解析 */}
  <h4 className="text-md font-semibold mb-2">📌 差異重點解析</h4>
  <ul className="list-disc pl-5 space-y-2">
    <li>
      <strong>教學焦點不同：</strong>轉換器強調「數值表現形式」，縮放器強調「尺度調整與模型敏感性」。
    </li>
    <li>
      <strong>操作邏輯不同：</strong>轉換器偏向型態轉換（如分箱），縮放器偏向數值壓縮與異常值處理。
    </li>
    <li>
      <strong>模型依賴性不同：</strong>縮放器更適合距離敏感模型（如 KNN、SVM），轉換器則適用更廣泛。
    </li>
    <li>
      <strong>教學搭配建議：</strong>可先使用轉換器建立概念，再用縮放器深入模型效能與資料分布的關係。
    </li>
  </ul>
</div>
</div>
  );
};

export default FeatureScalingModule;