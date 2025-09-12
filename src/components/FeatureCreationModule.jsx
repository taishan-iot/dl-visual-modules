// src/components/FeatureCreationModule.jsx
import React, { useState } from 'react';

const rawData = [
  { name: 'Alice', age: 25, income: 50000, views: 10, duration: 300, region: 'North', signup: 1000, lastVisit: 1100 },
  { name: 'Bob', age: 40, income: 80000, views: 5, duration: 100, region: 'South', signup: 900, lastVisit: 950 },
  { name: 'Charlie', age: 22, income: 30000, views: 8, duration: 240, region: 'North', signup: 1200, lastVisit: 1250 },
  { name: 'Dana', age: 35, income: 70000, views: 12, duration: 360, region: 'East', signup: 800, lastVisit: 880 },
];

const FeatureCreationModule = () => {
  const [method, setMethod] = useState('ratio');

  const regionIncome = {
    North: 40000,
    South: 60000,
    East: 50000,
  };

  const derivedData = rawData.map((row) => {
    let newFeature;
    if (method === 'ratio') {
      newFeature = (row.duration / row.views).toFixed(1); // 平均停留時間
    } else if (method === 'group') {
      newFeature = (row.income - regionIncome[row.region]); // 地區收入偏差
    } else if (method === 'time') {
      newFeature = row.lastVisit - row.signup; // 活躍週期
    }
    return {
      ...row,
      derived: newFeature,
    };
  });

  const accuracy = method === 'ratio' ? 88 : method === 'group' ? 90 : 87;

  const methodDescriptions = {
    ratio: {
      label: '平均停留時間 = 停留時間 ÷ 瀏覽次數',
      explain: '衡量使用者每次瀏覽的參與程度，適合行為分析任務。',
    },
    group: {
      label: '地區收入偏差 = 個人收入 − 地區平均收入',
      explain: '反映使用者在群體中的相對位置，適合社會經濟分析。',
    },
    time: {
      label: '活躍週期 = 最後瀏覽時間 − 註冊時間',
      explain: '衡量使用者活躍程度，適合流失預測任務。',
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-feature-creation">
      <h2 className="text-xl font-bold mb-4">特徵創造模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否會購買產品。請選擇特徵創造方式，觀察衍生特徵與模型準確率的變化。
      </p>

      {/* 特徵創造方式選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇創造方式：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="ratio">比例特徵（平均停留時間）</option>
          <option value="group">群組統計（地區收入偏差）</option>
          <option value="time">時間差（活躍週期）</option>
        </select>
      </div>

      {/* 模擬準確率 */}
      <p className="mb-4 text-sm text-gray-600">
        模擬預測準確率：<strong>{accuracy}%</strong>
      </p>

      {/* 原始與衍生資料表格 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">資料表格（含衍生特徵）</h3>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">年齡</th>
              <th className="border px-2 py-1">收入</th>
              <th className="border px-2 py-1">瀏覽次數</th>
              <th className="border px-2 py-1">停留時間</th>
              <th className="border px-2 py-1">地區</th>
              <th className="border px-2 py-1">註冊時間</th>
              <th className="border px-2 py-1">最後瀏覽</th>
              <th className="border px-2 py-1 text-blue-600">衍生特徵</th>
            </tr>
          </thead>
          <tbody>
            {derivedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.age}</td>
                <td className="border px-2 py-1">{row.income}</td>
                <td className="border px-2 py-1">{row.views}</td>
                <td className="border px-2 py-1">{row.duration}</td>
                <td className="border px-2 py-1">{row.region}</td>
                <td className="border px-2 py-1">{row.signup}</td>
                <td className="border px-2 py-1">{row.lastVisit}</td>
                <td className="border px-2 py-1 text-blue-600 font-medium">{row.derived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 特徵創造邏輯與公式</h3>
        <p className="font-mono bg-gray-100 p-2 rounded text-sm mb-2">
          {methodDescriptions[method].label}
        </p>
        <p className="text-gray-600">{methodDescriptions[method].explain}</p>
        <ul className="list-disc pl-5 mt-4 space-y-1">
          <li>特徵創造應基於任務邏輯與資料理解</li>
          <li>避免重複或無意義的衍生欄位</li>
          <li>創造後應搭配視覺化與模型驗證</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureCreationModule;