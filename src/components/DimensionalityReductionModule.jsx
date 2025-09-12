// src/components/DimensionalityReductionModule.jsx
import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';

const rawData = [
  { name: 'Alice', features: [0.2, 0.8, 0.5, 0.1, 0.6, 0.3, 0.9, 0.4, 0.7, 0.2] },
  { name: 'Bob', features: [0.9, 0.4, 0.7, 0.3, 0.2, 0.6, 0.1, 0.8, 0.5, 0.3] },
  { name: 'Charlie', features: [0.3, 0.6, 0.4, 0.2, 0.5, 0.7, 0.2, 0.9, 0.1, 0.4] },
  { name: 'Dana', features: [0.8, 0.7, 0.9, 0.6, 0.3, 0.5, 0.4, 0.2, 0.6, 0.1] },
  { name: 'Eve', features: [0.1, 0.2, 0.3, 0.9, 0.8, 0.6, 0.5, 0.7, 0.4, 0.3] },
];

const DimensionalityReductionModule = () => {
  const [method, setMethod] = useState('pca');

  const reduce = (features) => {
    const [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10] = features;
    if (method === 'pca') {
      return {
        x: (f1 + f2 + f3 + f4 + f5) / 5,
        y: (f6 + f7 + f8 + f9 + f10) / 5,
      };
    } else if (method === 'tsne') {
      return {
        x: Math.sin(f1 + f2 + f3),
        y: Math.cos(f4 + f5 + f6),
      };
    } else if (method === 'umap') {
      return {
        x: Math.log(1 + f1 + f2 + f3),
        y: Math.log(1 + f4 + f5 + f6),
      };
    } else {
      return {
        x: Math.tanh(f1 + f2 - f3),
        y: Math.tanh(f4 - f5 + f6),
      };
    }
  };

  const reducedData = rawData.map((row) => {
    const { x, y } = reduce(row.features);
    return {
      name: row.name,
      x: parseFloat(x.toFixed(2)),
      y: parseFloat(y.toFixed(2)),
    };
  });

  const metrics = {
    pca: { retention: '92%', accuracy: 88 },
    tsne: { retention: '不可量化', accuracy: 85 },
    umap: { retention: '不可量化', accuracy: 87 },
    autoencoder: { retention: '90%', accuracy: 89 },
  };

  const methodDescriptions = {
    pca: {
      label: 'PCA（主成分分析）',
      explain: '找出最大變異方向，進行線性投影。適合資料壓縮與視覺化。',
    },
    tsne: {
      label: 't-SNE（t-分佈鄰近嵌入）',
      explain: '保留局部距離結構，適合分群視覺化，但無法量化資訊保留率。',
    },
    umap: {
      label: 'UMAP（統一流形近似與投影）',
      explain: '保留拓撲結構，適合高維資料探索與視覺化。',
    },
    autoencoder: {
      label: 'Autoencoder（自編碼器）',
      explain: '使用神經網路壓縮與重建資料，中間層即為降維後特徵。',
    },
  };

  const chartData = {
    datasets: [
      {
        label: '降維後資料分布',
        data: reducedData.map((row) => ({ x: row.x, y: row.y })),
        backgroundColor: '#34d399',
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

  const { retention, accuracy } = metrics[method];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-dimensionality-reduction">
      <h2 className="text-xl font-bold mb-4">降維模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：資料原始維度為 10，請選擇降維方法並觀察資訊保留率與模型效能。
      </p>

      {/* 方法選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇降維方法：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="pca">PCA（主成分分析）</option>
          <option value="tsne">t-SNE（非線性嵌入）</option>
          <option value="umap">UMAP（拓撲保留）</option>
          <option value="autoencoder">Autoencoder（神經壓縮）</option>
        </select>
      </div>

      {/* 模擬效能與資訊保留率 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>資訊保留率：<strong>{retention}</strong> 模擬準確率：<strong>{accuracy}%</strong></p>
      </div>

      {/* 降維後資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">降維後資料（2 維表示）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">特徵 1</th>
              <th className="border px-2 py-1">特徵 2</th>
            </tr>
          </thead>
          <tbody>
            {reducedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.x}</td>
                <td className="border px-2 py-1">{row.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 降維後視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">降維後資料分布視覺化</h3>
        <Scatter data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          模擬將原始 10 維資料降至 2 維後的分布。不同方法會產生不同的投影結構。
        </p>
      </div>

            {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 降維邏輯與適用情境</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600 mb-4">{methodDescriptions[method].explain}</p>

        <ul className="list-disc pl-5 space-y-1">
          <li><strong>PCA：</strong>適合用於資料壓縮與視覺化，能保留最大變異方向，但無法捕捉非線性結構。</li>
          <li><strong>t-SNE：</strong>適合分群視覺化，能保留局部距離，但不適合用於模型訓練或資訊保留率分析。</li>
          <li><strong>UMAP：</strong>適合探索高維資料的拓撲結構，能保留全局與局部關係，但解釋性較弱。</li>
          <li><strong>Autoencoder：</strong>適合深度學習場景，能捕捉非線性特徵，但需較多資料與訓練時間。</li>
        </ul>

        <p className="mt-4 text-sm text-gray-500">
          降維不是刪除資訊，而是將資訊重新編碼為更簡潔的表示方式。選擇方法應根據資料型態、任務目標與可解釋性需求。
        </p>
      </div>
    </div>
  );
};

export default DimensionalityReductionModule;
