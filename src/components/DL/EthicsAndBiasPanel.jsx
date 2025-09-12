// src/components/DL/EthicsAndBiasPanel.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const biasCases = {
  gender: {
    label: '性別偏見',
    groups: ['男性', '女性'],
    accuracy: [0.92, 0.78],
    glossary: '性別偏見',
    mitigation: ['重加權訓練', '遮蔽性別特徵', '公平性損失函數'],
  },
  race: {
    label: '種族偏見',
    groups: ['群體 A', '群體 B'],
    accuracy: [0.88, 0.72],
    glossary: '種族偏見',
    mitigation: ['群體平衡抽樣', '對抗式訓練', '公平性正則化'],
  },
  region: {
    label: '地區偏見',
    groups: ['都市', '鄉村'],
    accuracy: [0.90, 0.76],
    glossary: '地區偏見',
    mitigation: ['資料擴充', '地區特徵重編碼', '公平性監控'],
  },
  language: {
    label: '語言偏見',
    groups: ['英文', '非英文'],
    accuracy: [0.93, 0.70],
    glossary: '語言偏見',
    mitigation: ['多語語料訓練', '語言嵌入調整', '語言識別前處理'],
  },
};

const fairnessMetrics = [
  {
    name: 'Demographic Parity',
    formula: 'P(ŷ = 1 | A = group1) = P(ŷ = 1 | A = group2)',
    meaning: '不同群體的預測機率應相等',
  },
  {
    name: 'Equal Opportunity',
    formula: 'P(ŷ = 1 | Y = 1, A = group1) = P(ŷ = 1 | Y = 1, A = group2)',
    meaning: '在真實為正例時，各群體的預測機率應相等',
  },
  {
    name: 'Equalized Odds',
    formula: 'P(ŷ = y | Y = y, A = group1) = P(ŷ = y | Y = y, A = group2)',
    meaning: '各群體在真實標籤下的預測分布應一致',
  },
];

const EthicsAndBiasPanel = () => {
  const [selected, setSelected] = useState('gender');
  const caseData = biasCases[selected];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-ethics-bias">
      <h2 className="text-xl font-bold mb-4">⚖️ 深度學習倫理與偏見模組</h2>

      {/* 偏見案例選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇偏見案例：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="gender">性別偏見</option>
          <option value="race">種族偏見</option>
          <option value="region">地區偏見</option>
          <option value="language">語言偏見</option>
        </select>
      </div>

      {/* 模擬偏見現象 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 模型預測差異</h3>
        <ul className="list-disc pl-5">
          {caseData.groups.map((g, idx) => (
            <li key={idx}>
              <strong>{g}</strong> → 準確率：{caseData.accuracy[idx]}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-gray-500">
          差距可能來自資料不平衡、特徵偏差或訓練策略不當。
        </p>
      </div>

      {/* 公平性指標展示 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📐 公平性指標</h3>
        <ul className="list-disc pl-5 space-y-1">
          {fairnessMetrics.map((m, idx) => (
            <li key={idx}>
              <strong>{m.name}</strong> — {m.meaning}
              <div className="font-mono text-blue-700">{m.formula}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* 偏見緩解策略 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">🛠️ 偏見緩解策略</h3>
        <ul className="list-disc pl-5 space-y-1">
          {caseData.mitigation.map((m, idx) => (
            <li key={idx}>{m}</li>
          ))}
        </ul>
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        <DeepLearningGlossary selected={caseData.glossary} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          模型偏見不僅是技術問題，更是社會責任。公平性評估應成為模型部署前的必要步驟。
        </p>
        <p className="mt-2">
          作為深度學習倫理教學的起點，搭配模型評估與資料分析模組使用效果更佳。
        </p>
      </div>
    </div>
  );
};

export default EthicsAndBiasPanel;