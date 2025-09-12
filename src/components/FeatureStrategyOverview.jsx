// src/components/FeatureStrategyOverview.jsx
import React, { useState } from 'react';

const modules = [
  {
    id: 'feature-creation',
    title: '特徵建立',
    description: '建立衍生欄位、組合欄位，擴充資料語意。',
    useCase: '資料不足、語意擴充',
  },
  {
    id: 'category-encoding',
    title: '類別編碼',
    description: '將類別特徵轉換為數值型態，支援 One-hot、Target Encoding 等。',
    useCase: '類別特徵處理',
  },
  {
    id: 'numeric-transform',
    title: '數值轉換',
    description: '處理偏態、極端值，支援分箱、對數轉換等。',
    useCase: '分布不均、極端值',
  },
  {
    id: 'feature-scaling',
    title: '特徵縮放',
    description: '標準化、正規化特徵，提升模型穩定性與收斂速度。',
    useCase: '模型敏感度高（如 SVM）',
  },
  {
    id: 'feature-selection',
    title: '特徵選擇',
    description: '選出最具預測力的特徵，支援 Filter、Wrapper、Embedded 方法。',
    useCase: '降維、提升效能',
  },
  {
    id: 'feature-extraction',
    title: '特徵提取',
    description: '將原始特徵轉換為抽象特徵，支援 PCA、LDA、Autoencoder。',
    useCase: '抽象化、視覺化',
  },
  {
    id: 'feature-interaction',
    title: '特徵交互',
    description: '建立特徵間的乘積、交互項，捕捉非線性關係。',
    useCase: '交互效應、非線性建模',
  },
  {
    id: 'feature-stability',
    title: '穩定性分析',
    description: '分析特徵在不同資料切分下的選擇一致性。',
    useCase: '泛化能力、部署前驗證',
  },
  {
    id: 'feature-importance',
    title: '重要性比較',
    description: '比較不同模型對特徵的排序結果（線性 / 樹 / SHAP）。',
    useCase: '模型解釋、特徵優先級',
  },
  {
    id: 'dimensionality-reduction',
    title: '降維模擬',
    description: '模擬高維資料的降維效果與資訊保留率。',
    useCase: '高維資料探索、視覺化',
  },
  {
    id: 'feature-glossary',
    title: '詞彙解釋',
    description: '互動式名詞解釋面板，建立語意理解與模型邏輯連結。',
    useCase: '教學補充、詞彙理解',
  },
];

const FeatureStrategyOverview = () => {
  const [selectedType, setSelectedType] = useState('分類任務');

  const strategyMap = {
    '分類任務': ['category-encoding', 'feature-selection', 'feature-importance'],
    '高維資料': ['feature-extraction', 'dimensionality-reduction'],
    '模型解釋': ['feature-importance', 'feature-glossary'],
    '資料偏態': ['numeric-transform', 'feature-scaling'],
    '部署前驗證': ['feature-stability', 'feature-selection'],
  };

  const recommended = strategyMap[selectedType];

  return (
    <div className="p-6 bg-white rounded shadow" id="module-strategy-overview">
      <h2 className="text-2xl font-bold mb-4">🧭 特徵工程策略總覽器</h2>

      {/* 策略導向選擇器 */}
      <div className="mb-6">
        <label className="font-medium mr-4">依任務推薦模組：</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {Object.keys(strategyMap).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* 推薦模組卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {modules
          .filter((m) => recommended.includes(m.id))
          .map((m) => (
            <div key={m.id} className="border rounded p-4 bg-gray-50 hover:bg-gray-100 transition">
              <h3 className="text-lg font-semibold text-blue-700 mb-1">{m.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{m.description}</p>
              <p className="text-xs text-gray-500">📌 適用情境：{m.useCase}</p>
              <a
                href={`#module-${m.id}`}
                className="text-sm text-blue-500 underline mt-2 inline-block"
              >
                前往模組 →
              </a>
            </div>
          ))}
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 特徵工程流程與策略思維</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>特徵工程不是單一步驟，而是資料理解 → 處理 →選擇 →解釋的策略鏈。</li>
          <li>每個模組對應不同資料型態與任務需求，應根據場景選擇。</li>
          <li>策略導向思維能幫助學員建立可遷移的特徵處理能力。</li>
        </ul>
        
      </div>
    </div>
  );
};

export default FeatureStrategyOverview;