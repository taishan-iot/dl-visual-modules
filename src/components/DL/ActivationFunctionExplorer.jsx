// src/components/DL/ActivationFunctionExplorer.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const activationFunctions = {
  relu: {
    label: 'ReLU（Rectified Linear Unit）',
    glossaryKey: 'ReLU',
    formula: 'f(x) = max(0, x)',
    description: 'ReLU 在 x > 0 時為線性，在 x < 0 時為 0，計算效率高，常用於深層網路。',
    gradient: '非飽和、梯度穩定，但可能出現「死亡 ReLU」問題。',
    data: Array.from({ length: 41 }, (_, i) => {
      const x = i - 20;
      return { x, y: Math.max(0, x) };
    }),
  },
  sigmoid: {
    label: 'Sigmoid',
    glossaryKey: 'Sigmoid',
    formula: 'f(x) = 1 / (1 + e^{-x})',
    description: 'Sigmoid 將輸出壓縮在 0 到 1 之間，常用於二分類輸出層。',
    gradient: '容易在極端值出現梯度消失，收斂慢。',
    data: Array.from({ length: 41 }, (_, i) => {
      const x = i - 20;
      const y = 1 / (1 + Math.exp(-x));
      return { x, y: parseFloat(y.toFixed(3)) };
    }),
  },
  tanh: {
    label: 'Tanh',
    glossaryKey: 'Tanh',
    formula: 'f(x) = (e^x - e^{-x}) / (e^x + e^{-x})',
    description: 'Tanh 將輸出壓縮在 -1 到 1 之間，中心化效果比 Sigmoid 好。',
    gradient: '仍有飽和區，但比 Sigmoid 穩定。',
    data: Array.from({ length: 41 }, (_, i) => {
      const x = i - 20;
      const y = Math.tanh(x);
      return { x, y: parseFloat(y.toFixed(3)) };
    }),
  },
  softmax: {
    label: 'Softmax',
    glossaryKey: 'Softmax',
    formula: 'f(x_i) = e^{x_i} / ∑ e^{x_j}',
    description: 'Softmax 將多類輸出轉換為機率分布，常用於多分類輸出層。',
    gradient: '需搭配交叉熵使用，梯度穩定但計算複雜。',
    data: Array.from({ length: 5 }, (_, i) => {
      const raw = [1, 2, 3, 4, 5];
      const exp = raw.map((v) => Math.exp(v));
      const sum = exp.reduce((a, b) => a + b, 0);
      return { x: `x${i + 1}`, y: parseFloat((exp[i] / sum).toFixed(3)) };
    }),
  },
};

const ActivationFunctionExplorer = () => {
  const [selected, setSelected] = useState('relu');
  const func = activationFunctions[selected];

  const chartData = {
    labels: func.data.map((d) => d.x),
    datasets: [
      {
        label: func.label,
        data: func.data.map((d) => d.y),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: { title: { display: true, text: '輸入值 x' } },
      y: { title: { display: true, text: '輸出值 f(x)' } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-activation-functions">
      <h2 className="text-xl font-bold mb-4">🧩 激活函數探索器</h2>

      {/* 函數選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇激活函數：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="relu">ReLU</option>
          <option value="sigmoid">Sigmoid</option>
          <option value="tanh">Tanh</option>
          <option value="softmax">Softmax</option>
        </select>
      </div>

      {/* 函數曲線視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{func.label} 輸入 → 輸出曲線</h3>
        <Line data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          此圖顯示激活函數在不同輸入值下的輸出行為。
        </p>
      </div>

      {/* 數學式與梯度特性 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📐 數學公式</h3>
        <p className="font-mono bg-gray-100 p-2 rounded">{func.formula}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">📘 梯度特性與用途</h3>
        <p>{func.description}</p>
        <p className="mt-2 text-gray-600">{func.gradient}</p>
      </div>

      {/* 詞彙解釋區（與 DeepLearningGlossary.jsx 同步） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary selected={func.glossaryKey} />
      </div>
    </div>
  );
};

export default ActivationFunctionExplorer;