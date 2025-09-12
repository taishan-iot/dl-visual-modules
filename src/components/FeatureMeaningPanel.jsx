// src/components/FeatureMeaningPanel.jsx
import React, { useState } from 'react';

const featureDetails = {
  年齡: {
    indicator: 'Pearson correlation = 0.6',
    modelImpact: '移除後準確率下降 2%',
    businessMeaning: '年齡越高，使用者可能更保守，流失風險略高。',
  },
  使用時間: {
    indicator: 'Mutual Information = 0.9',
    modelImpact: '移除後準確率下降 5%',
    businessMeaning: '使用時間代表黏著度，是流失預測的核心特徵。',
  },
  互動次數: {
    indicator: 'Chi-square score = 0.8',
    modelImpact: '移除後準確率下降 4%',
    businessMeaning: '互動次數代表參與度，低互動可能是流失前兆。',
  },
  地區: {
    indicator: 'ANOVA F-score = 0.3',
    modelImpact: '移除後準確率幾乎不變',
    businessMeaning: '地區差異對流失影響不大，可視為次要特徵。',
  },
  會員等級: {
    indicator: 'Entropy gain = 0.7',
    modelImpact: '移除後準確率下降 3%',
    businessMeaning: '高等級會員通常更穩定，流失風險較低。',
  },
};

const FeatureMeaningPanel = () => {
  const [selected, setSelected] = useState('使用時間');

  const detail = featureDetails[selected];

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">📘 特徵意義解釋面板</h3>

      {/* 特徵選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-2">選擇特徵：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {Object.keys(featureDetails).map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* 解釋區塊 */}
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 space-y-2">
        <p><strong>📊 統計指標：</strong>{detail.indicator}</p>
        <p><strong>🧠 模型貢獻：</strong>{detail.modelImpact}</p>
        <p><strong>💼 業務語意：</strong>{detail.businessMeaning}</p>
      </div>
    </div>
  );
};

export default FeatureMeaningPanel;