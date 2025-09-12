// src/components/DL/ApplicationMap.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const domainMap = {
  image: {
    label: '圖像辨識',
    model: 'CNN（卷積神經網路）',
    strategy: [
      '使用卷積層提取局部空間特徵',
      '池化層進行降維與平移不變性',
      '適合處理像素矩陣與空間結構資料',
    ],
    glossaryKey: '卷積（Convolution）',
  },
  text: {
    label: '文字分類',
    model: 'RNN / Transformer',
    strategy: [
      'RNN 處理時間序列與上下文依賴',
      'Transformer 使用注意力機制捕捉語意關係',
      '常搭配嵌入層（Embedding）進行語意轉換',
    ],
    glossaryKey: '注意力機制（Attention）',
  },
  tabular: {
    label: '表格預測',
    model: 'MLP（多層感知器）',
    strategy: [
      '使用全連接層處理結構化欄位',
      '需進行特徵縮放與缺值處理',
      '適合回歸與分類任務',
    ],
    glossaryKey: '特徵縮放（Feature Scaling）',
  },
  audio: {
    label: '語音辨識',
    model: 'CNN + RNN',
    strategy: [
      'CNN 處理頻譜圖的空間特徵',
      'RNN 處理時間動態與語音序列',
      '常使用 MFCC 或 Mel-Spectrogram 作為輸入',
    ],
    glossaryKey: '頻譜特徵（Spectrogram）',
  },
};

const ApplicationMap = () => {
  const [selected, setSelected] = useState('image');
  const domain = domainMap[selected];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-application-map">
      <h2 className="text-xl font-bold mb-4">🧭 深度學習應用導覽地圖</h2>

      {/* 應用領域選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇應用領域：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="image">圖像辨識</option>
          <option value="text">文字分類</option>
          <option value="tabular">表格預測</option>
          <option value="audio">語音辨識</option>
        </select>
      </div>

      {/* 模型推薦區塊 */}
      <div className="mb-4 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📌 推薦模型架構</h3>
        <p><strong>{domain.model}</strong> — 適合處理 {domain.label} 資料的特性。</p>
      </div>

      {/* 特徵策略說明 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">🧠 特徵處理策略</h3>
        <ul className="list-disc pl-5 space-y-1">
          {domain.strategy.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        <DeepLearningGlossary selected={domain.glossaryKey} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          每個應用領域都有其資料型態與結構特性，選擇合適的模型架構與特徵策略是成功的關鍵。
        </p>
        <p className="mt-2">
          作為任務導向的模型選擇器，建立「資料 → 模型 → 特徵」的策略思維。
        </p>
      </div>
    </div>
  );
};

export default ApplicationMap;