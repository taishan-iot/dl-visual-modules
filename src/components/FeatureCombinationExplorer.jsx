// src/components/FeatureCombinationExplorer.jsx
import React, { useState } from 'react';

const allFeatures = [
  { name: '年齡', relevance: 0.6 },
  { name: '使用時間', relevance: 0.9 },
  { name: '互動次數', relevance: 0.8 },
  { name: '地區', relevance: 0.3 },
  { name: '會員等級', relevance: 0.7 },
];

const FeatureCombinationExplorer = () => {
  const [selected, setSelected] = useState([]);
  const [savedCombos, setSavedCombos] = useState([]);

  const toggleFeature = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const simulateScore = () => {
    const relevanceSum = selected
      .map((name) => allFeatures.find((f) => f.name === name)?.relevance || 0)
      .reduce((a, b) => a + b, 0);
    const accuracy = Math.min(95, 80 + relevanceSum * 3).toFixed(1);
    const precision = Math.min(95, 78 + relevanceSum * 2.5).toFixed(1);
    const recall = Math.min(95, 76 + relevanceSum * 2.8).toFixed(1);
    return { accuracy, precision, recall };
  };

  const handleSave = () => {
    const score = simulateScore();
    setSavedCombos((prev) => [
      ...prev,
      { features: [...selected], ...score },
    ]);
  };

  const score = simulateScore();

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">🔗 特徵組合比較器</h3>

      {/* 特徵選擇器 */}
      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">請選擇任意特徵組合：</p>
        <div className="flex flex-wrap gap-3">
          {allFeatures.map((f) => (
            <label key={f.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected.includes(f.name)}
                onChange={() => toggleFeature(f.name)}
              />
              <span className="text-sm">{f.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 模擬效能區塊 */}
      <div className="mb-4 text-sm text-gray-600">
        <p>模擬準確率：<strong>{score.accuracy}%</strong></p>
        <p>Precision：{score.precision}% Recall：{score.recall}%</p>
        <button
          onClick={handleSave}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
          disabled={selected.length === 0}
        >
          儲存組合
        </button>
      </div>

      {/* 組合比較表格 */}
      {savedCombos.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">已儲存組合比較</h4>
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">特徵組合</th>
                <th className="border px-2 py-1">準確率</th>
                <th className="border px-2 py-1">Precision</th>
                <th className="border px-2 py-1">Recall</th>
              </tr>
            </thead>
            <tbody>
              {savedCombos.map((combo, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{combo.features.join(', ')}</td>
                  <td className="border px-2 py-1">{combo.accuracy}%</td>
                  <td className="border px-2 py-1">{combo.precision}%</td>
                  <td className="border px-2 py-1">{combo.recall}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeatureCombinationExplorer;