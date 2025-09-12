// src/components/DeepLearningIntro.jsx
import React, { useState } from 'react';
import TrainingFlowVisualizer from './TrainingFlowVisualizer';
import DeepLearningGlossary from './DeepLearningGlossary';

const neuronFormulas = {
  input: 'x_i',
  hidden: 'z = σ(Wx + b)',
  output: 'ŷ = σ(Wz + b)',
};

const glossaryTerms = [
  '神經元（Neuron）',
  '權重（Weights）',
  '偏差（Bias）',
  '激活函數（Activation）',
  '損失函數（Loss Function）',
  '前向傳播（Forward Pass）',
  '反向傳播（Backpropagation）',
   'MSE',
  'CrossEntropy',

];

const DeepLearningIntro = () => {
  const [selectedNeuron, setSelectedNeuron] = useState('hidden');
  const [selectedTerm, setSelectedTerm] = useState(glossaryTerms[0]);

  return (
    <div className="p-6 bg-white rounded shadow" id="module-deep-learning-intro">
      <h2 className="text-2xl font-bold mb-4">🧠 深度學習概念導入</h2>

      {/* 概念導入說明 */}
      <div className="mb-6 text-sm text-gray-700">
        <p className="mb-2">
          深度學習是一種以「多層神經網路」為基礎的學習架構，能自動從資料中提取抽象特徵並進行預測。
        </p>
        <p>
          與傳統機器學習不同，深度學習不依賴手動特徵工程，而是透過大量資料與多層結構自動學習表示。
        </p>
      </div>

      {/* 互動式神經網路結構圖 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🧩 神經網路結構圖（點選神經元查看公式）</h3>
        <div className="flex items-center justify-center space-x-6 mb-2">
          <button
            onClick={() => setSelectedNeuron('input')}
            className={`px-3 py-1 rounded ${selectedNeuron === 'input' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            輸入層
          </button>
          <button
            onClick={() => setSelectedNeuron('hidden')}
            className={`px-3 py-1 rounded ${selectedNeuron === 'hidden' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            隱藏層
          </button>
          <button
            onClick={() => setSelectedNeuron('output')}
            className={`px-3 py-1 rounded ${selectedNeuron === 'output' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            輸出層
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded text-sm text-gray-800 font-mono">
          {neuronFormulas[selectedNeuron]}
        </div>
      </div>

      {/* 數學模型區塊 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📐 常見數學模型</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>前向傳播：</strong> 
            <span className="font-mono">ŷ = σ(Wx + b)</span>
          </li>
          <li>
            <strong>均方誤差（MSE）：</strong> 
            <span className="font-mono">Loss = (1/n) ∑(y - ŷ)²</span>
          </li>
          <li>
            <strong>交叉熵（CrossEntropy）：</strong> 
            <span className="font-mono">Loss = -∑ y log(ŷ)</span>
          </li>
        </ul>
      </div>

      {/* 詞彙解釋區（與 DeepLearningGlossary.jsx 同步） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📘 詞彙解釋（點選名詞查看說明）</h3>
        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="border px-2 py-1 rounded mb-2"
        >
          {glossaryTerms.map((term) => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
        <DeepLearningGlossary selected={selectedTerm} />
      </div>

      {/* 簡化版訓練流程動畫 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🎬 模型訓練流程動畫（簡化版）</h3>
        <TrainingFlowVisualizer simplified={true} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          深度學習的核心在於「資料驅動」與「多層抽象」，透過大量樣本與非線性轉換，模型能自動學習複雜的表示與邏輯。
        </p>
        <p className="mt-2">
          接下來你可以探索不同模型結構、訓練策略與應用場景，逐步建立完整的深度學習理解。
        </p>
      </div>
    </div>
  );
};

export default DeepLearningIntro;