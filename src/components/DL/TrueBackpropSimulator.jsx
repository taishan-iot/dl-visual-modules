// src/components/DL/TrueBackpropSimulator.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const activationFunctions = {
  relu: {
    label: 'ReLU',
    fn: (x) => Math.max(0, x),
    derivative: (x) => (x > 0 ? 1 : 0),
  },
  sigmoid: {
    label: 'Sigmoid',
    fn: (x) => 1 / (1 + Math.exp(-x)),
    derivative: (x) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
  },
};

const initStrategies = {
  random: () => Math.random() * 2 - 1,
  xavier: () => Math.random() * Math.sqrt(1 / 4),
  he: () => Math.random() * Math.sqrt(2 / 4),
};

const TrueBackpropSimulator = () => {
  const [activation, setActivation] = useState('relu');
  const [init, setInit] = useState('xavier');
  const [layers] = useState(5);
  const neurons = 4;
  const input = Array(neurons).fill(0).map(() => Math.random());
  const target = Array(neurons).fill(0.5);

  // 初始化權重
  const weights = Array(layers).fill(0).map(() =>
    Array(neurons).fill(0).map(() => initStrategies[init]())
  );

  // 前向傳播
  const forward = [];
  forward[0] = input;
  for (let l = 1; l < layers; l++) {
    forward[l] = forward[l - 1].map((_, i) => {
      const z = forward[l - 1].reduce((sum, x, j) => sum + x * weights[l][j], 0);
      return activationFunctions[activation].fn(z);
    });
  }

  const output = forward[layers - 1];

  // 損失計算
  const loss = output.reduce((sum, y, i) => sum + Math.pow(y - target[i], 2), 0) / neurons;

  // 反向傳播（簡化）
  const gradients = [];
  gradients[layers - 1] = output.map((y, i) => 2 * (y - target[i]));

  for (let l = layers - 2; l >= 0; l--) {
    gradients[l] = gradients[l + 1].map((g, i) => {
      const z = forward[l][i];
      const d = activationFunctions[activation].derivative(z);
      return g * d;
    });
  }

  const chartData = {
    labels: Array.from({ length: layers }, (_, i) => `L${i + 1}`),
    datasets: [
      {
        label: '每層平均梯度值',
        data: gradients.map((g) =>
          parseFloat((g.reduce((a, b) => a + Math.abs(b), 0) / g.length).toFixed(4))
        ),
        backgroundColor: '#10b981',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, max: 1 },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-true-backprop">
      <h2 className="text-xl font-bold mb-4">🧩 真實反向傳播模擬器</h2>

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

      {/* 損失顯示 */}
      <div className="mb-4 text-sm text-gray-700">
        <p>模擬輸出值：<strong>{output.map((v) => v.toFixed(2)).join(', ')}</strong></p>
        <p>目標值：<strong>{target.join(', ')}</strong></p>
        <p>均方誤差（MSE）：<strong>{loss.toFixed(4)}</strong></p>
      </div>

      {/* 梯度視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📊 每層平均梯度值</h3>
        <Bar data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          梯度值越穩定，模型越容易訓練；若梯度消失或爆炸，模型將難以收斂。
        </p>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={[
                current.glossary,
                'TrueBackpropSimulator',
            ]}
            />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          展示了反向傳播中梯度如何在不同層流動，並受激活函數與初始化策略影響。
        </p>
        <p className="mt-2">
          你可以進一步探索 BatchNorm、Dropout、不同損失函數對梯度穩定性的影響。
        </p>
      </div>
    </div>
  );
};

export default TrueBackpropSimulator;