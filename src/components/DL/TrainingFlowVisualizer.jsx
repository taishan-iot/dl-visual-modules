// src/components/DL/TrainingFlowVisualizer.jsx
import React, { useState, useEffect } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const steps = [
  {
    id: 'forward',
    title: '前向傳播（Forward Pass）',
    description: '將輸入資料經由神經網路計算出預測值 ŷ。',
    formula: 'ŷ = σ(Wx + b)',
    glossary: '前向傳播（Forward Pass）',
  },
  {
    id: 'loss',
    title: '損失計算（Loss Computation）',
    description: '比較預測值與真實值，計算誤差。',
    formula: 'Loss = (1/n) ∑(y - ŷ)²',
    glossary: '損失函數（Loss Function）',
  },
  {
    id: 'backward',
    title: '反向傳播（Backpropagation）',
    description: '根據損失計算梯度，從輸出層向前更新。',
    formula: '∂L/∂W = ∂L/∂ŷ × ∂ŷ/∂W',
    glossary: '反向傳播（Backpropagation）',
  },
  {
    id: 'update',
    title: '參數更新（Parameter Update）',
    description: '使用優化器根據梯度更新權重與偏差。',
    formula: 'W = W - η × ∂L/∂W',
    glossary: '優化器（Optimizer）',
  },
  {
    id: 'evaluate',
    title: '評估與迭代（Evaluation & Epoch）',
    description: '在驗證集上評估模型表現，進行下一輪訓練。',
    formula: 'Accuracy = (# correct) / (# total)',
    glossary: ['Epoch', '評估（Evaluation）']
  },
];

const TrainingFlowVisualizer = ({ simplified = false }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [stepIndex, autoPlay]);

  const current = steps[stepIndex];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-training-flow">
      <h2 className="text-xl font-bold mb-4">🔄 模型訓練流程動畫</h2>

      {/* 動畫控制器 */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="px-3 py-1 rounded bg-indigo-600 text-white"
        >
          {autoPlay ? '⏸ 暫停播放' : '▶️ 自動播放'}
        </button>
        <button
          onClick={() => setStepIndex((stepIndex + 1) % steps.length)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          ➡️ 下一步
        </button>
        <button
          onClick={() => setStepIndex(0)}
          className="px-3 py-1 rounded bg-gray-200"
        >
          🔁 重播
        </button>
      </div>

      {/* 流程步驟展示 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold text-indigo-700 mb-1">{current.title}</h3>
        <p className="mb-2">{current.description}</p>
        <p className="font-mono bg-gray-100 p-2 rounded text-blue-700">{current.formula}</p>
      </div>

      {/* 詞彙解釋區 */}
      {!simplified && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
          <DeepLearningGlossary selected={Array.isArray(current.glossary) ? current.glossary : [current.glossary]} />
        </div>
      )}

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          深度學習訓練流程是由資料驅動的迭代過程，每一步都影響模型的學習與泛化能力。
        </p>
        <p className="mt-2">
          可搭配 TrueBackpropSimulator、LossOptimizerSimulator 使用，建立完整的訓練理解。
        </p>
      </div>
    </div>
  );
};

export default TrainingFlowVisualizer;