// src/components/DL/OverfittingControlPanel.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const OverfittingControlPanel = () => {
  const [useDropout, setUseDropout] = useState(true);
  const [useL2, setUseL2] = useState(false);
  const [useEarlyStopping, setUseEarlyStopping] = useState(false);

  const epochs = 50;
  const trainAcc = [];
  const valAcc = [];

  for (let i = 1; i <= epochs; i++) {
    let train = 0.6 + 0.4 * Math.tanh(i / 10);
    let val = 0.55 + 0.3 * Math.tanh(i / 15);

    if (useDropout) val += 0.02;
    if (useL2) val += 0.015;
    if (useEarlyStopping && i > 35) val -= 0.03;

    trainAcc.push(parseFloat(train.toFixed(3)));
    valAcc.push(parseFloat(Math.min(val, train).toFixed(3)));
  }

  const chartData = {
    labels: Array.from({ length: epochs }, (_, i) => `E${i + 1}`),
    datasets: [
      {
        label: '訓練集準確率',
        data: trainAcc,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        fill: false,
        tension: 0.3,
      },
      {
        label: '驗證集準確率',
        data: valAcc,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.2)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { beginAtZero: true, max: 1 },
    },
    plugins: {
      legend: { position: 'top' },
    },
  };

  const maxGap = Math.max(...trainAcc.map((t, i) => t - valAcc[i])).toFixed(3);

  return (
    <div className="p-4 bg-white rounded shadow" id="module-overfitting-control">
      <h2 className="text-xl font-bold mb-4">🧩 過擬合與正則化互動模組</h2>

      {/* 正則化策略開關 */}
      <div className="mb-4 flex flex-wrap gap-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useDropout}
            onChange={() => setUseDropout(!useDropout)}
          />
          <span>使用 Dropout</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useL2}
            onChange={() => setUseL2(!useL2)}
          />
          <span>使用 L2 正則化</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useEarlyStopping}
            onChange={() => setUseEarlyStopping(!useEarlyStopping)}
          />
          <span>使用 EarlyStopping</span>
        </label>
      </div>

      {/* 準確率曲線視覺化 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📈 模擬訓練與驗證準確率</h3>
        <Line data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          最大準確率差距（過擬合指標）：<strong>{maxGap}</strong>
        </p>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={[
                '過擬合（Overfitting）',
                ...(useDropout ? ['Dropout'] : []),
                ...(useL2 ? ['L2 正則化'] : []),
                ...(useEarlyStopping ? ['EarlyStopping'] : []),
            ]}
            />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          過擬合代表模型在訓練集表現良好，但在驗證集表現不佳，無法泛化。可透過 Dropout、L2、EarlyStopping 等策略改善。
        </p>
        <p className="mt-2">
          本模組展示不同正則化策略對模型泛化能力的影響，幫助學員建立穩定訓練與部署前驗證的觀念。
        </p>
      </div>
    </div>
  );
};

export default OverfittingControlPanel;