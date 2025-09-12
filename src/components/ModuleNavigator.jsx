// src/components/ModuleNavigator.jsx
import React from 'react';

const modules = [
  '資料分割模擬器',
  '資料型別轉換器',
  '缺值處理模擬器',
  '資料不平衡模擬器',
  '資料異常值偵測器',
  '特徵重要性分析器',
];

const ModuleNavigator = () => (
  <nav className="mb-6">
    <ul className="flex flex-wrap gap-4">
      {modules.map((mod, index) => (
        <li key={index}>
          <a href={`#module-${index}`} className="text-blue-600 hover:underline">
            {mod}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default ModuleNavigator;