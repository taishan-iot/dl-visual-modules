// src/components/DL/ModelStructureExplorer.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const modelData = {
  mlp: {
    name: 'MLP（多層感知器）',
    layers: ['輸入層', '隱藏層 1', '隱藏層 2', '輸出層'],
    details: [
      '每層皆為全連接層（Dense Layer）',
      '激活函數：ReLU / Sigmoid',
      '適用於表格資料、回歸與分類任務',
    ],
  },
  cnn: {
    name: 'CNN（卷積神經網路）',
    layers: ['輸入層', '卷積層', '池化層', '全連接層', '輸出層'],
    details: [
      '卷積層提取局部特徵，池化層降維',
      '激活函數：ReLU',
      '適用於圖像辨識、空間結構資料',
    ],
  },
  rnn: {
    name: 'RNN（循環神經網路）',
    layers: ['輸入層', '時間步展開層', '隱藏狀態層', '輸出層'],
    details: [
      '能處理時間序列資料，具記憶性',
      '激活函數：Tanh / ReLU',
      '適用於文字、語音、序列預測',
    ],
  },
  transformer: {
    name: 'Transformer（注意力機制模型）',
    layers: ['輸入嵌入層', '多頭注意力層', '前饋層', '輸出層'],
    details: [
      '使用 Self-Attention 捕捉全局依賴',
      '激活函數：ReLU / GELU',
      '適用於 NLP、語音、圖像生成',
    ],
  },
};

const ModelStructureExplorer = () => {
  const [selectedModel, setSelectedModel] = useState('mlp');
  const model = modelData[selectedModel];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-model-structure">
      <h2 className="text-xl font-bold mb-4">🧩 模型結構探索器</h2>

      {/* 模型選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇模型：</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="mlp">MLP（表格資料）</option>
          <option value="cnn">CNN（圖像資料）</option>
          <option value="rnn">RNN（序列資料）</option>
          <option value="transformer">Transformer（語意建模）</option>
        </select>
      </div>

      {/* 結構圖展示（簡化版） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{model.name} 結構圖</h3>
        <div className="flex space-x-4 justify-center items-center">
          {model.layers.map((layer, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded border border-blue-300 text-sm"
            >
              {layer}
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500 text-center">
          每個區塊代表模型中的一層結構，依序處理輸入資料。
        </p>
      </div>

      {/* 層級細節說明 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 結構說明與用途</h3>
        <ul className="list-disc pl-5 space-y-1">
          {model.details.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>
      </div>
    

        {/* 詞彙解釋區（與 DeepLearningGlossary.jsx 同步） */}
        <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        <DeepLearningGlossary
            selected={
            selectedModel === 'mlp'
                ? ['全連接層（Dense Layer）', '激活函數（Activation）']
                : selectedModel === 'cnn'
                ? ['卷積層（Convolution）', '池化（Pooling）', '激活函數（Activation）']
                : selectedModel === 'rnn'
                ? ['時間序列', '時間步展開層', '隱藏狀態層', '激活函數（Activation）']
                : ['Transformer', '輸入嵌入層', '多頭注意力層', '前饋層', 'Self-Attention', 'GELU', '激活函數（Activation）']
            }
        />
        </div>
    </div>
  );
};

export default ModelStructureExplorer;