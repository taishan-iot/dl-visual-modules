// src/components/DL/TransferLearningPanel.jsx
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

const modelMap = {
  resnet: {
    label: 'ResNet（圖像）',
    baseAccuracy: 0.75,
    glossary: '遷移學習（Transfer Learning）',
  },
  bert: {
    label: 'BERT（文字）',
    baseAccuracy: 0.80,
    glossary: '微調（Fine-tuning）',
  },
  wav2vec: {
    label: 'Wav2Vec（語音）',
    baseAccuracy: 0.78,
    glossary: '語音特徵（Audio Embedding）',
  },
  vit: {
    label: 'ViT（Vision Transformer）',
    baseAccuracy: 0.82,
    glossary: 'Transformer 架構',
  },
};

const strategyMap = {
  full: { label: '全部微調', multiplier: 1.0 },
  freeze: { label: '凍結底層，只訓練分類頭', multiplier: 0.85 },
  head: { label: '只訓練最後一層', multiplier: 0.75 },
};

const dataSizeMap = {
  small: { label: '小型資料集', noise: 0.1 },
  medium: { label: '中型資料集', noise: 0.05 },
  large: { label: '大型資料集', noise: 0.02 },
};

const TransferLearningPanel = () => {
  const [model, setModel] = useState('bert');
  const [strategy, setStrategy] = useState('full');
  const [dataSize, setDataSize] = useState('medium');

  const base = modelMap[model].baseAccuracy;
  const multiplier = strategyMap[strategy].multiplier;
  const noise = dataSizeMap[dataSize].noise;

  const epochs = 30;
  const accCurve = Array.from({ length: epochs }, (_, i) => {
    const progress = Math.tanh(i / 6);
    const acc = base * multiplier * progress + noise * (Math.random() - 0.5);
    return parseFloat(Math.min(acc, 1).toFixed(3));
  });

  const chartData = {
    labels: Array.from({ length: epochs }, (_, i) => `E${i + 1}`),
    datasets: [
      {
        label: '模擬準確率',
        data: accCurve,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.2)',
        fill: true,
        tension: 0.3,
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

  const modelGlossary =
  model === 'resnet'
    ? 'ResNet'
    : model === 'bert'
    ? 'BERT'
    : model === 'wav2vec'
    ? 'Wav2Vec'
    : 'ViT';

const strategyGlossary =
  strategy === 'full'
    ? '全部微調'
    : strategy === 'freeze'
    ? '凍結底層'
    : '分類頭（Classification Head）';


  return (
    <div className="p-4 bg-white rounded shadow" id="module-transfer-learning">
      <h2 className="text-xl font-bold mb-4">🧩 遷移學習與微調模組</h2>

      {/* 選擇器區塊 */}
      <div className="mb-4 flex flex-wrap gap-6">
        <div>
          <label className="font-medium mr-2">預訓練模型：</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="resnet">ResNet（圖像）</option>
            <option value="bert">BERT（文字）</option>
            <option value="wav2vec">Wav2Vec（語音）</option>
            <option value="vit">ViT（圖像 Transformer）</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">微調策略：</label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="full">全部微調</option>
            <option value="freeze">凍結底層</option>
            <option value="head">只訓練分類頭</option>
          </select>
        </div>
        <div>
          <label className="font-medium mr-2">資料量：</label>
          <select
            value={dataSize}
            onChange={(e) => setDataSize(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="small">小型</option>
            <option value="medium">中型</option>
            <option value="large">大型</option>
          </select>
        </div>
      </div>

      {/* 模擬準確率曲線 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📈 模擬模型表現</h3>
        <Line data={chartData} options={chartOptions} />
        <p className="mt-2 text-sm text-gray-500">
          模型表現受資料量、微調策略與預訓練架構影響。資料越多，微調越深，準確率越高。
        </p>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={[
                modelGlossary,
                strategyGlossary,
                dataSize === 'small'
                ? '小型資料集'
                : dataSize === 'medium'
                ? '中型資料集'
                : '大型資料集',
            ]}
            />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          遷移學習能大幅降低訓練成本，尤其在資料量不足時。選擇適當的微調策略能平衡效能與穩定性。
        </p>
        <p className="mt-2">
          可作為模型選擇與訓練策略設計的起點，搭配 DatasetSelector 與 ApplicationMap 使用效果更佳。
        </p>
      </div>
    </div>
  );
};

export default TransferLearningPanel;