// src/components/DL/LossOptimizerSimulator.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const lossFunctions = {
  mse: {
    label: '均方誤差（MSE）',
    glossaryKey: 'MSE',
    simulate: (epoch, lr) => Math.exp(-lr * epoch) + 0.05 * Math.random(),
  },
  crossentropy: {
    label: '交叉熵（CrossEntropy）',
    glossaryKey: 'CrossEntropy',
    simulate: (epoch, lr) => Math.exp(-lr * epoch * 1.2) + 0.1 * Math.random(),
  },
};

const optimizers = {
  sgd: {
    label: 'SGD',
    stability: 0.9,
  },
  adam: {
    label: 'Adam',
    stability: 0.98,
  },
  rmsprop: {
    label: 'RMSprop',
    stability: 0.95,
  },
};

const LossOptimizerSimulator = () => {
  const [lossType, setLossType] = useState('mse');
  const [optimizer, setOptimizer] = useState('adam');
  const [lr, setLr] = useState(0.01);

  const epochs = 50;
  const simulateLoss = lossFunctions[lossType].simulate;
  const stability = optimizers[optimizer].stability;

  const lossCurve = Array.from({ length: epochs }, (_, i) => {
    const base = simulateLoss(i + 1, lr);
    const adjusted = base * (1 + (1 - stability));
    return parseFloat(adjusted.toFixed(4));
  });

  const chartData = {
    labels: Array.from({ length: epochs }, (_, i) => `E${i + 1}`),
    datasets: [
      {
        label: '模擬損失值',
        data: lossCurve,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-loss-optimizer">
      <h2 className="text-xl font-bold mb-4">🧩 損失函數與優化器模擬器</h2>

      {/* 選擇器區塊 */}
      <div className="mb-4 flex flex-wrap gap-6">
        <div>
          <label className="font-medium mr-2">損失函數：</label>
          <select
            value={lossType}
            onChange={(e) => setLossType(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="mse">MSE（回歸任務）</option>
            <option value="crossentropy">CrossEntropy（分類任務）</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">優化器：</label>
          <select
            value={optimizer}
            onChange={(e) => setOptimizer(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="sgd">SGD</option>
            <option value="adam">Adam</option>
            <option value="rmsprop">RMSprop</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">學習率：</label>
          <input
            type="range"
            min={0.001}
            max={0.1}
            step={0.001}
            value={lr}
            onChange={(e) => setLr(parseFloat(e.target.value))}
            className="w-40"
          />
          <span className="ml-2 text-sm text-gray-700">{lr.toFixed(3)}</span>
        </div>
      </div>

      {/* 損失曲線視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📉 模擬損失下降曲線</h3>
        <Line data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          不同損失函數與優化器會影響模型的收斂速度與穩定性。
        </p>
      </div>

      {/* 詞彙解釋區 */}
      <DeepLearningGlossary
        selected={[
            lossFunctions[lossType].glossaryKey, // 'MSE' or 'CrossEntropy'
            optimizer.charAt(0).toUpperCase() + optimizer.slice(1), // 'Adam', 'SGD', 'RMSprop'
            '損失函數（Loss Function）',
            '優化器（Optimizer）',
        ]}
      />

      {/* 教學補充 */}
    <div className="text-sm text-gray-600">
        <p>
            損失函數是模型學習的目標指標，用來衡量預測值與真實值的差距。MSE 適用於回歸任務，強調數值誤差；CrossEntropy 適用於分類任務，強調機率分布的準確性。
        </p>
        <p className="mt-2">
            優化器則負責根據損失函數的梯度更新模型參數。Adam 通常收斂快且穩定，SGD 收斂慢但可控，RMSprop 適合非平穩資料。兩者搭配影響模型的學習速度與穩定性。
        </p>
        <p className="mt-2">
            學習率是最關鍵的超參數之一，太大會震盪，太小會收斂慢。可搭配學習率調度策略進行動態調整。
        </p>
    </div>

    </div>
  );
};

export default LossOptimizerSimulator;