// src/components/FeatureExtractionModule.jsx
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import FeatureProjectionInterpreter from './FeatureProjectionInterpreter';

const rawData = [
  { name: 'Alice', features: [0.2, 0.8, 0.5, 0.1, 0.6] },
  { name: 'Bob', features: [0.9, 0.4, 0.7, 0.3, 0.2] },
  { name: 'Charlie', features: [0.3, 0.6, 0.4, 0.2, 0.5] },
  { name: 'Dana', features: [0.8, 0.7, 0.9, 0.6, 0.3] },
  { name: 'Eve', features: [0.1, 0.2, 0.3, 0.9, 0.8] },
];

const FeatureExtractionModule = () => {
  const [method, setMethod] = useState('pca');

  const extractFeatures = () => {
    return rawData.map((row, idx) => {
      const [f1, f2, f3, f4, f5] = row.features;
      let x, y;

      if (method === 'pca') {
        x = f1 * 0.5 + f2 * 0.3 + f3 * 0.2;
        y = f4 * 0.6 + f5 * 0.4;
      } else if (method === 'lda') {
        x = f1 * 0.4 + f3 * 0.4 + f5 * 0.2;
        y = f2 * 0.5 + f4 * 0.5;
      } else {
        // Autoencoder (模擬非線性壓縮)
        x = Math.tanh(f1 + f2 - f3);
        y = Math.tanh(f4 - f5);
      }

      return {
        name: row.name,
        x: parseFloat(x.toFixed(2)),
        y: parseFloat(y.toFixed(2)),
      };
    });
  };

  const extracted = extractFeatures();

  const metrics = {
    pca: { accuracy: 87, precision: 85, recall: 88 },
    lda: { accuracy: 90, precision: 89, recall: 91 },
    autoencoder: { accuracy: 88, precision: 87, recall: 89 },
  };

  const methodDescriptions = {
    pca: {
      label: 'PCA（主成分分析）',
      explain: '找出資料中變異性最大的方向，進行無監督降維。適合資料壓縮與視覺化。',
    },
    lda: {
      label: 'LDA（線性判別分析）',
      explain: '找出能最大區分類別的方向，進行有監督降維。適合分類任務。',
    },
    autoencoder: {
      label: 'Autoencoder（自編碼器）',
      explain: '使用神經網路將資料壓縮並重建，中間層即為提取特徵。適合非線性降維。',
    },
  };

  const chartData = {
    datasets: [
      {
        label: '提取後特徵分布',
        data: extracted.map((row) => ({ x: row.x, y: row.y })),
        backgroundColor: '#6366f1',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { title: { display: true, text: '特徵 1' } },
      y: { title: { display: true, text: '特徵 2' } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const { accuracy, precision, recall } = metrics[method];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-extraction">
      <h2 className="text-xl font-bold mb-4">特徵提取模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請選擇特徵提取方法，觀察降維後特徵與模型效能的變化。
      </p>

      {/* 方法選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇提取方法：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="pca">PCA（主成分分析）</option>
          <option value="lda">LDA（線性判別分析）</option>
          <option value="autoencoder">Autoencoder（自編碼器）</option>
        </select>
      </div>

      {/* 模擬模型效能 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>模擬準確率：<strong>{accuracy}%</strong></p>
        <p>Precision：{precision}% Recall：{recall}%</p>
      </div>

      {/* 提取後資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">降維後特徵資料</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">特徵 1</th>
              <th className="border px-2 py-1">特徵 2</th>
            </tr>
          </thead>
          <tbody>
            {extracted.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.x}</td>
                <td className="border px-2 py-1">{row.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            <FeatureProjectionInterpreter method={method} />
      {/* 特徵分布視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">特徵分布視覺化</h3>
        <Scatter data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          模擬將原始 5 維資料降至 2 維後的分布。不同方法會產生不同的投影方向。
        </p>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 提取邏輯與適用情境</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600">{methodDescriptions[method].explain}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          <li>特徵提取是創造新特徵，不是刪除舊特徵</li>
          <li>PCA 適合無監督降維，LDA 適合分類任務，Autoencoder 適合非線性結構</li>
          <li>降維後可提升模型效率與視覺化效果，但可能損失部分資訊</li>
        </ul>
      </div>
      
<div className="mt-10 text-sm text-gray-700">
  <h3 className="text-lg font-semibold mb-4">📘 特徵提取方法的數學模型與語意解釋</h3>

    {/* PCA 區塊 */}
  <div className="mb-6">
    <h4 className="text-md font-semibold mb-2">1️⃣ PCA（主成分分析）</h4>
    <p className="mb-1 font-medium">📘 數學模型簡述：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>給定資料矩陣 X（n × d），對每個特徵做中心化（去平均）</li>
      <li>計算協方差矩陣：Σ = (1/n) × X<sup>T</sup> × X</li>
      <li>對 Σ 做特徵分解，取得特徵向量（主成分）與特徵值（變異量）</li>
      <li>選擇前 k 個最大特徵值對應的主成分，將資料投影到這些方向上</li>
    </ul>
    <p className="mb-1 font-medium">🎯 所擷取出的特徵意義：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>每個主成分是原始特徵的線性組合</li>
      <li>第一主成分代表資料中變異性最大的方向</li>
      <li>第二主成分代表與第一主成分正交、次大變異性的方向</li>
      <li>主成分本身沒有語意，但能捕捉資料的主要結構</li>
    </ul>
    <p className="text-gray-600 text-sm">🧠 比喻：就像你在看一堆照片，PCA 幫你找到「最能區分照片差異的角度」，然後把所有照片都投影到那個角度上。</p>
  </div>

  {/* LDA 區塊 */}
  <div className="mb-6">
    <h4 className="text-md font-semibold mb-2">2️⃣ LDA（線性判別分析）</h4>
    <p className="mb-1 font-medium">📘 數學模型簡述：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>給定資料 X 與類別標籤 y，計算：</li>
      <li>類別間散布矩陣 S<sub>B</sub>：類別中心之間的差異</li>
      <li>類別內散布矩陣 S<sub>W</sub>：類別內部的變異</li>
      <li>最大化判別準則：w<sup>T</sup> S<sub>B</sub> w / w<sup>T</sup> S<sub>W</sub> w</li>
      <li>解此廣義特徵值問題，找出能最大區分類別的方向</li>
    </ul>
    <p className="mb-1 font-medium">🎯 所擷取出的特徵意義：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>每個 LDA 軸代表最能區分類別的方向</li>
      <li>投影後的特徵具有分類語意，例如 LDA1 可能代表「活躍 vs 流失」的分界</li>
      <li>適合用於監督式分類任務</li>
    </ul>
    <p className="text-gray-600 text-sm">🧠 比喻：就像你在分辨貓和狗，LDA 幫你找到「耳朵長度 + 叫聲頻率」這種能清楚分開兩者的特徵組合。</p>
  </div>

  {/* Autoencoder 區塊 */}
  <div className="mb-6">
    <h4 className="text-md font-semibold mb-2">3️⃣ Autoencoder（自編碼器）</h4>
    <p className="mb-1 font-medium">📘 數學模型簡述：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>使用神經網路架構：</li>
      <li>Encoder：將原始特徵 x 映射到低維空間 z</li>
      <li>Decoder：將 z 重建回原始空間 x̂</li>
      <li>最小化重建誤差：|x - x̂|<sup>2</sup></li>
      <li>中間層 z 即為提取後的特徵</li>
    </ul>
    <p className="mb-1 font-medium">🎯 所擷取出的特徵意義：</p>
    <ul className="list-disc pl-5 mb-2">
      <li>每個提取特徵是原始特徵的非線性組合</li>
      <li>沒有明確語意，但能捕捉資料的深層結構（例如：行為模式、隱性特質）</li>
      <li>適合用於非線性資料、深度學習場景</li>
    </ul>
    <p className="text-gray-600 text-sm">🧠 比喻：就像你讓 AI 看一堆使用者行為，Autoencoder 會自己學出「隱性偏好」、「互動風格」這種抽象特徵。</p>
  </div>
</div>
    </div>
    
  );
};

export default FeatureExtractionModule;