// src/components/DL/ArchitectureTimeline.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const timeline = [
  {
    id: 'lenet',
    year: 1998,
    name: 'LeNet',
    innovation: '首次使用卷積層進行圖像分類',
    usage: '手寫數字辨識（MNIST）',
    glossaryKey: '卷積（Convolution）',
  },
  {
    id: 'alexnet',
    year: 2012,
    name: 'AlexNet',
    innovation: '使用 ReLU、Dropout、大規模 GPU 訓練',
    usage: 'ImageNet 圖像分類競賽冠軍',
    glossaryKey: 'ReLU',
  },
  {
    id: 'vgg',
    year: 2014,
    name: 'VGG',
    innovation: '使用大量小卷積核（3x3）堆疊，提升深度',
    usage: '圖像分類與特徵提取',
    glossaryKey: '深層網路（Deep Network）',
  },
  {
    id: 'resnet',
    year: 2015,
    name: 'ResNet',
    innovation: '引入殘差連接（Residual Connection），解決梯度消失',
    usage: '深層圖像分類、物件偵測',
    glossaryKey: '殘差連接（Residual）',
  },
  {
    id: 'transformer',
    year: 2017,
    name: 'Transformer',
    innovation: '完全基於注意力機制，取代 RNN 結構',
    usage: '自然語言處理（NLP）、翻譯、生成',
    glossaryKey: '注意力機制（Attention）',
  },
  {
    id: 'vit',
    year: 2020,
    name: 'ViT（Vision Transformer）',
    innovation: '將圖像切片後以 Transformer 處理，無卷積',
    usage: '圖像分類、生成、視覺語意建模',
    glossaryKey: 'Vision Transformer',
  },
];

const ArchitectureTimeline = () => {
  const [selected, setSelected] = useState('resnet');
  const current = timeline.find((t) => t.id === selected);

  return (
    <div className="p-4 bg-white rounded shadow" id="module-architecture-timeline">
      <h2 className="text-xl font-bold mb-4">📜 深度學習架構演進圖</h2>

      {/* 時間軸導覽器 */}
      <div className="flex flex-wrap gap-4 mb-6">
        {timeline.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`px-3 py-1 rounded border ${
              selected === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {t.year} — {t.name}
          </button>
        ))}
      </div>

      {/* 架構卡片展示 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">🧠 {current.name} 架構亮點</h3>
        <p><strong>創新點：</strong>{current.innovation}</p>
        <p><strong>應用場景：</strong>{current.usage}</p>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵技術詞彙</h3>
        <DeepLearningGlossary selected={current.glossaryKey} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          深度學習架構的演進反映了對資料型態、訓練穩定性與語意建模的持續探索。
        </p>
        <p className="mt-2">
          作為模型選擇的歷史脈絡導覽器，理解架構設計背後的問題解法。
        </p>
      </div>
    </div>
  );
};

export default ArchitectureTimeline;