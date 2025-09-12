// src/components/FeatureTermGlossary.jsx
import React, { useState } from 'react';

const glossary = {
  '係數（Coefficient）': {
    model: '線性模型',
    explain:
      '係數代表每個特徵對預測結果的線性影響。正值表示正向貢獻，負值表示反向貢獻。絕對值越大，影響力越強。',
    example: '使用時間的係數為 +0.9，表示使用時間越長，流失機率越低。',
  },
  '資訊增益（Information Gain）': {
    model: '樹模型',
    explain:
      '資訊增益衡量使用某特徵分裂資料後，目標變數的不確定性下降程度。代表該特徵的判別力。',
    example: '互動次數的資訊增益高，代表它能有效區分流失與非流失用戶。',
  },
  '分裂次數（Split Count）': {
    model: '樹模型',
    explain:
      '特徵在決策樹中被用來分裂的次數。次數越多，代表該特徵越常被用來做判斷。',
    example: '會員等級在多棵樹中頻繁出現，表示其影響力高。',
  },
  'Shapley Value': {
    model: 'SHAP',
    explain:
      '來自博弈論，衡量每個特徵在所有可能特徵組合中對預測的平均貢獻。具備公平性與解釋力。',
    example: '使用時間的 Shapley Value 為 +0.85，表示它在多數情境下都有正向貢獻。',
  },
  '局部解釋（Local Explanation）': {
    model: 'SHAP',
    explain:
      '針對單一樣本的預測結果進行解釋，顯示每個特徵如何影響該預測。',
    example: '對某用戶來說，年齡的 SHAP 值為 -0.2，表示年齡提高了流失機率。',
  },
  '全局解釋（Global Explanation）': {
    model: 'SHAP',
    explain:
      '針對整體模型進行解釋，顯示哪些特徵在所有預測中最具貢獻力。',
    example: '整體來看，使用時間是最穩定的正向特徵。',
  },
};

const FeatureTermGlossary = () => {
  const [selected, setSelected] = useState('係數（Coefficient）');
  const detail = glossary[selected];

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">📘 特徵工程名詞解釋面板</h3>

      {/* 名詞選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-2">選擇名詞：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {Object.keys(glossary).map((term) => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
      </div>

      {/* 解釋區塊 */}
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 space-y-2">
        <p><strong>模型：</strong>{detail.model}</p>
        <p><strong>說明：</strong>{detail.explain}</p>
        <p><strong>範例：</strong>{detail.example}</p>
      </div>
    </div>
  );
};

export default FeatureTermGlossary;