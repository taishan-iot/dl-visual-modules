// src/components/DL/DatasetSelector.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';


const datasetMap = {
  mnist: {
  label: 'MNIST（手寫數字）',
  type: '圖像',
  task: '分類',
  structure: '28x28 灰階像素矩陣',
  model: 'CNN',
  strategy: [
    '使用卷積層提取局部空間特徵',
    '池化層進行降維與平移不變性',
    '標準化像素值至 [0,1]',
  ],
  glossaryKeys: ['卷積（Convolution）', '池化（Pooling）', '特徵縮放（Feature Scaling）'],
},
  imdb: {
    label: 'IMDB（電影評論）',
    type: '文字',
    task: '情感分類',
    structure: '句子 → 詞彙 → 編碼序列',
    model: 'RNN / Transformer',
    strategy: [
      '使用嵌入層（Embedding）轉換詞彙為向量',
      'RNN 處理序列依賴，Transformer 捕捉語意關係',
      '常用詞彙表大小限制與 padding',
    ],
    glossaryKeys: ['嵌入（Embedding）', '注意力機制（Attention）'],
  },
  titanic: {
    label: 'Titanic（乘客生存預測）',
    type: '表格',
    task: '分類',
    structure: '結構化欄位（年齡、性別、艙等）',
    model: 'MLP',
    strategy: [
      '類別欄位需編碼（One-hot / Target Encoding）',
      '數值欄位需標準化或分箱',
      '處理缺值與欄位互動項',
    ],
    glossaryKeys: ['類別編碼（Encoding）', '特徵縮放（Feature Scaling）'],
  },
  librispeech: {
    label: 'LibriSpeech（語音辨識）',
    type: '語音',
    task: '語音轉文字',
    structure: '音訊 → 頻譜圖 → 時序特徵',
    model: 'CNN + RNN / Transformer',
    strategy: [
      '將音訊轉換為 Mel-Spectrogram 或 MFCC',
      'CNN 處理空間特徵，RNN 處理時間動態',
      '需進行時間對齊與語音標註',
    ],
    glossaryKeys: ['頻譜特徵（Spectrogram）', 'MFCC', 'Mel-Spectrogram'],
  },
};

const DatasetSelector = () => {
  const [selected, setSelected] = useState('mnist');
  const ds = datasetMap[selected];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-dataset-selector">
      <h2 className="text-xl font-bold mb-4">🧬 資料集選擇器</h2>

      {/* 資料集選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇資料集：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="mnist">MNIST（手寫數字）</option>
          <option value="imdb">IMDB（電影評論）</option>
          <option value="titanic">Titanic（乘客預測）</option>
          <option value="librispeech">LibriSpeech（語音辨識）</option>
        </select>
      </div>

      {/* 資料集屬性展示 */}
      <div className="mb-4 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📦 資料集屬性</h3>
        <p><strong>型態：</strong>{ds.type}</p>
        <p><strong>任務：</strong>{ds.task}</p>
        <p><strong>結構：</strong>{ds.structure}</p>
      </div>

      {/* 模型推薦區塊 */}
      <div className="mb-4 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📌 推薦模型架構</h3>
        <p><strong>{ds.model}</strong> — 適合處理此類資料型態與任務。</p>
      </div>

      {/* 特徵策略說明 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">🧠 特徵處理策略</h3>
        <ul className="list-disc pl-5 space-y-1">
          {ds.strategy.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        {ds.glossaryKeys.map((key) => (
            <div key={key} className="mb-4">
                <DeepLearningGlossary selected={key} />
            </div>
            ))}
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          資料集的型態與任務決定了模型架構與特徵處理策略。選擇合適的資料集是建立有效深度學習系統的第一步。
        </p>
        <p className="mt-2">
          作為應用導向的資料集選擇器，搭配 ApplicationMap 使用效果更佳。
        </p>
      </div>
    </div>
  );
};

export default DatasetSelector;