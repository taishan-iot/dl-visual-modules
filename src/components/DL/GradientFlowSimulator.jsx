// src/components/DL/GradientFlowSimulator.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const activationDecay = {
  relu: 0.95,
  sigmoid: 0.6,
  tanh: 0.75,
};

const initMultiplier = {
  random: 1.0,
  xavier: 0.8,
  he: 1.2,
};

const GradientFlowSimulator = () => {
  const [layers, setLayers] = useState(10);
  const [activation, setActivation] = useState('relu');
  const [init, setInit] = useState('random');

  const decay = activationDecay[activation];
  const multiplier = initMultiplier[init];

  const gradients = Array.from({ length: layers }, (_, i) => {
    const value = Math.pow(decay * multiplier, i + 1);
    return { layer: `L${i + 1}`, value: parseFloat(value.toFixed(4)) };
  });

  const chartData = {
    labels: gradients.map((g) => g.layer),
    datasets: [
      {
        label: '模擬梯度大小',
        data: gradients.map((g) => g.value),
        backgroundColor: '#f59e0b',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1.2,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-gradient-flow">
      <h2 className="text-xl font-bold mb-4">🧩 梯度消失與爆炸模擬器</h2>

      {/* 層數設定器 */}
      <div className="mb-4">
        <label className="font-medium mr-2">層數：</label>
        <input
          type="range"
          min={3}
          max={20}
          value={layers}
          onChange={(e) => setLayers(parseInt(e.target.value))}
          className="w-40"
        />
        <span className="ml-2 text-sm text-gray-700">{layers} 層</span>
      </div>

      {/* 激活函數與初始化策略選擇器 */}
      <div className="mb-4 flex space-x-6">
        <div>
          <label className="font-medium mr-2">激活函數：</label>
          <select
            value={activation}
            onChange={(e) => setActivation(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="tanh">Tanh</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">初始化策略：</label>
          <select
            value={init}
            onChange={(e) => setInit(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="random">Random</option>
            <option value="xavier">Xavier</option>
            <option value="he">He</option>
          </select>
        </div>
      </div>

      {/* 梯度視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📊 模擬梯度流動（每層）</h3>
        <Bar data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          梯度值若快速衰減 → 梯度消失；若快速放大 → 梯度爆炸。穩定梯度有助於模型訓練。
        </p>
      </div>

      {/* 詞彙解釋區（與 DeepLearningGlossary.jsx 同步） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={[
                '梯度消失與爆炸',
                activation === 'relu' ? 'ReLU' : activation === 'sigmoid' ? 'Sigmoid' : 'Tanh',
                init === 'random' ? 'random（初始化策略）' : init === 'xavier' ? 'xavier（初始化策略）' : 'he（初始化策略）',
                'BatchNorm',
            ]}
        />

      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          深度網路若梯度在反向傳播中逐層衰減，會導致前層無法更新 → 梯度消失；
          若逐層放大，則會導致不穩定訓練 → 梯度爆炸。
        </p>
        <p className="mt-2">
          可透過激活函數選擇、初始化策略、BatchNorm 等方式改善梯度流動。
        </p>
      </div>
    </div>
  );
};

export default GradientFlowSimulator;