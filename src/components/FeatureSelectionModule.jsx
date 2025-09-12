// src/components/FeatureSelectionModule.jsx
import React, { useState } from 'react';
import FeatureImportanceChart from './FeatureImportanceChart';
import CrossValidationSimulator from './CrossValidationSimulator';
import FeatureCombinationExplorer from './FeatureCombinationExplorer';
import FeatureMeaningPanel from './FeatureMeaningPanel';

const allFeatures = [
  { name: '年齡', type: '數值', relevance: 0.6, source: 'Pearson correlation' },
  { name: '使用時間', type: '數值', relevance: 0.9, source: 'Mutual Information' },
  { name: '互動次數', type: '數值', relevance: 0.8, source: 'Chi-square score' },
  { name: '地區', type: '類別', relevance: 0.3, source: 'ANOVA F-score' },
  { name: '會員等級', type: '類別', relevance: 0.7, source: 'Entropy gain' },
];

const FeatureSelectionModule = () => {
  const [method, setMethod] = useState('filter');

  const selectedFeatures = {
    filter: allFeatures
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 3)
      .map((f) => f.name),
    wrapper: ['使用時間', '互動次數', '會員等級'],
    embedded: ['使用時間', '會員等級'],
  };

  const metrics = {
    filter: { accuracy: 85, precision: 82, recall: 88 },
    wrapper: { accuracy: 90, precision: 89, recall: 91 },
    embedded: { accuracy: 88, precision: 87, recall: 89 },
  };

  const methodDescriptions = {
    filter: {
      label: 'Filter 方法：根據統計指標（如相關係數、卡方）獨立評估每個特徵',
      explain: '快速、模型無關，但可能忽略特徵間的交互作用。',
    },
    wrapper: {
      label: 'Wrapper 方法：使用模型反覆測試不同特徵組合（如遞迴特徵消除）',
      explain: '考慮特徵組合與模型效能，但計算成本高。',
    },
    embedded: {
      label: 'Embedded 方法：特徵選擇嵌入模型訓練過程（如 Lasso、決策樹）',
      explain: '效率高、模型相容性強，但依賴特定模型結構。',
    },
  };

  const { accuracy, precision, recall } = metrics[method];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-selection">
      <h2 className="text-xl font-bold mb-4">特徵選擇模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否流失。請選擇特徵選擇方法，觀察選出特徵與模型效能的變化。
      </p>

      {/* 原始特徵清單 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">原始特徵清單</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">                
              <th className="border px-2 py-1">特徵名稱</th>
              <th className="border px-2 py-1">型態</th>
              <th className="border px-2 py-1">相關性分數</th>
              <th className="border px-2 py-1">指標來源</th>
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((f, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{f.name}</td>
                <td className="border px-2 py-1">{f.type}</td>
                <td className="border px-2 py-1">{f.relevance}</td>
                <td className="border px-2 py-1">{f.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 方法選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇方法：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="filter">Filter（統計指標）</option>
          <option value="wrapper">Wrapper（模型測試）</option>
          <option value="embedded">Embedded（模型內建）</option>
        </select>
      </div>

      {/* 模擬模型效能 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>模擬預測準確率：<strong>{accuracy}%</strong></p>
        <p>Precision：{precision}% Recall：{recall}%</p>
      </div>

      {/* 選出特徵清單 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">選出特徵（{method} 方法）</h3>
        <ul className="list-disc pl-5 space-y-1">
          {selectedFeatures[method].map((feature) => (
            <li key={feature} className="text-blue-600 font-medium">{feature}</li>
          ))}
        </ul>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 方法邏輯與比較</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600 mb-4">{methodDescriptions[method].explain}</p>

        {/* 方法比較表 */}
        <table className="table-auto border-collapse border text-sm mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">方法</th>
              <th className="border px-3 py-2">邏輯</th>
              <th className="border px-3 py-2">優點</th>
              <th className="border px-3 py-2">缺點</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">Filter</td>
              <td className="border px-3 py-2">統計指標獨立評估</td>
              <td className="border px-3 py-2">快速、模型無關</td>
              <td className="border px-3 py-2">忽略特徵交互作用</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Wrapper</td>
              <td className="border px-3 py-2">模型反覆測試組合</td>
              <td className="border px-3 py-2">考慮特徵組合與效能</td>
              <td className="border px-3 py-2">計算成本高</td>
            </tr>
                        <tr>
              <td className="border px-3 py-2">Embedded</td>
              <td className="border px-3 py-2">嵌入模型訓練過程</td>
              <td className="border px-3 py-2">效率高、模型相容性強</td>
              <td className="border px-3 py-2">依賴特定模型結構</td>
            </tr>
          </tbody>
        </table>

        <ul className="list-disc pl-5 space-y-1">
          <li>特徵選擇 ≠ 特徵刪除，而是提升模型表達力與泛化能力</li>
          <li>Filter 適合初步篩選，Wrapper 適合精細優化，Embedded 適合模型整合</li>
          <li>可搭配特徵重要性分析模組進行交叉驗證與視覺化</li>
        </ul>
      </div>
      <FeatureImportanceChart
            features={allFeatures}
            selected={selectedFeatures[method]}
        />
        <CrossValidationSimulator method={method} />
        <FeatureCombinationExplorer />
          <FeatureMeaningPanel />

    </div>
  );
};

export default FeatureSelectionModule;