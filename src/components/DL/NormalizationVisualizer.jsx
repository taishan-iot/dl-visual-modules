// src/components/DL/NormalizationVisualizer.jsx
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const NormalizationVisualizer = () => {
  const [method, setMethod] = useState('batchnorm');

  // 模擬激活值分布
  const activations = Array.from({ length: 10 }, (_, i) => {
    const base = Math.random() * 2 - 1;
    if (method === 'batchnorm') return parseFloat((base / 1.5).toFixed(2));
    if (method === 'layernorm') return parseFloat((base / 1.2).toFixed(2));
    return parseFloat(base.toFixed(2));
  });

  const activationData = {
    labels: activations.map((_, i) => `N${i + 1}`),
    datasets: [
      {
        label: '激活值',
        data: activations,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const activationOptions = {
    scales: {
      y: { beginAtZero: false, min: -2, max: 2 },
    },
    plugins: {
      legend: { display: false },
    },
  };

  // 模擬損失下降曲線
  const lossCurve = Array.from({ length: 30 }, (_, i) => {
    const base = Math.exp(-i / 8);
    const noise = Math.random() * 0.05;
    const factor = method === 'batchnorm' ? 1 : method === 'layernorm' ? 1.2 : 1.5;
    return parseFloat((base * factor + noise).toFixed(3));
  });

  const lossData = {
    labels: Array.from({ length: 30 }, (_, i) => `E${i + 1}`),
    datasets: [
      {
        label: '模擬損失值',
        data: lossCurve,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245,158,11,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const lossOptions = {
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const glossaryTerm =
  method === 'batchnorm'
    ? 'BatchNorm'
    : method === 'layernorm'
    ? 'LayerNorm'
    : '激活值分布';

  return (
    <div className="p-4 bg-white rounded shadow" id="module-normalization-visualizer">
      <h2 className="text-xl font-bold mb-4">🧩 正規化視覺化模組</h2>

      {/* 正規化方式選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇正規化方式：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="batchnorm">Batch Normalization</option>
          <option value="layernorm">Layer Normalization</option>
          <option value="none">無正規化</option>
        </select>
      </div>

      {/* 激活值分布模擬 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📊 激活值分布（模擬）</h3>
        <Bar data={activationData} options={activationOptions} />
        <p className="mt-2 text-sm text-gray-500">
          正規化能使激活值分布更集中，減少梯度爆炸與消失。
        </p>
      </div>

      {/* 收斂速度模擬 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📉 模擬損失下降曲線</h3>
        <Line data={lossData} options={lossOptions} />
        <p className="mt-2 text-sm text-gray-500">
          正規化可加速收斂並提升訓練穩定性。
        </p>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary selected={['正規化視覺化', glossaryTerm]} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          BatchNorm 在 mini-batch 上進行標準化，LayerNorm 在每個樣本內進行標準化，兩者皆可穩定激活分布並提升訓練效率。
        </p>
        <p className="mt-2">
          可搭配 GradientFlowSimulator 與 LossOptimizerSimulator 使用，建立完整的訓練穩定性理解。
        </p>
      </div>
    </div>
  );
};

export default NormalizationVisualizer;