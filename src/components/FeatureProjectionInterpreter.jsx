// src/components/FeatureProjectionInterpreter.jsx
import React, { useState } from 'react';

const rawData = [
  { name: 'Alice', features: [0.2, 0.8, 0.5, 0.1, 0.6] },
  { name: 'Bob', features: [0.9, 0.4, 0.7, 0.3, 0.2] },
  { name: 'Charlie', features: [0.3, 0.6, 0.4, 0.2, 0.5] },
  { name: 'Dana', features: [0.8, 0.7, 0.9, 0.6, 0.3] },
  { name: 'Eve', features: [0.1, 0.2, 0.3, 0.9, 0.8] },
];

const FeatureProjectionInterpreter = ({ method = 'pca' }) => {
  const [selected, setSelected] = useState('Alice');

  const extract = (features) => {
    const [f1, f2, f3, f4, f5] = features;
    if (method === 'pca') {
      return {
        x: (f1 * 0.5 + f2 * 0.3 + f3 * 0.2).toFixed(2),
        y: (f4 * 0.6 + f5 * 0.4).toFixed(2),
        meaning: '此投影代表使用者在「活躍度」與「黏著度」上的綜合表現。',
      };
    } else if (method === 'lda') {
      return {
        x: (f1 * 0.4 + f3 * 0.4 + f5 * 0.2).toFixed(2),
        y: (f2 * 0.5 + f4 * 0.5).toFixed(2),
        meaning: '此投影代表使用者在「流失 vs 留存」分類軸上的位置。',
      };
    } else {
      return {
        x: Math.tanh(f1 + f2 - f3).toFixed(2),
        y: Math.tanh(f4 - f5).toFixed(2),
        meaning: '此投影代表使用者的隱性行為特徵（非線性壓縮結果）。',
      };
    }
  };

  const selectedData = rawData.find((r) => r.name === selected);
  const projection = extract(selectedData.features);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-2">🔍 特徵投影解釋器</h3>

      {/* 資料點選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-2">選擇資料點：</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {rawData.map((r) => (
            <option key={r.name} value={r.name}>{r.name}</option>
          ))}
        </select>
      </div>

      {/* 解釋區塊 */}
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 space-y-2">
        <p><strong>原始特徵：</strong>{selectedData.features.join(', ')}</p>
        <p><strong>降維後位置：</strong>X = {projection.x}, Y = {projection.y}</p>
        <p><strong>語意解釋：</strong>{projection.meaning}</p>
      </div>
    </div>
  );
};

export default FeatureProjectionInterpreter;