// src/components/DataTypeModule.jsx
import React, { useState } from 'react';

const sampleData = [
  { name: 'Alice', age: 25, gender: 'Female' },
  { name: 'Bob', age: 30, gender: 'Male' },
  { name: 'Charlie', age: 22, gender: 'Other' },
];

const DataTypeModule = () => {
  const [encoding, setEncoding] = useState('onehot');

  const getEncodedData = () => {
    if (encoding === 'onehot') {
      return sampleData.map((row) => ({
        name: row.name,
        age: row.age,
        Female: row.gender === 'Female' ? 1 : 0,
        Male: row.gender === 'Male' ? 1 : 0,
        Other: row.gender === 'Other' ? 1 : 0,
      }));
    } else {
      return sampleData.map((row) => ({
        name: row.name,
        age: row.age,
        gender: row.gender === 'Female' ? 0 : row.gender === 'Male' ? 1 : 2,
      }));
    }
  };

  const encodedData = getEncodedData();
  const columnCount = Object.keys(encodedData[0]).length;

  return (
    <div className="p-4 bg-white rounded shadow" id="module-1">
      <h2 className="text-xl font-bold mb-2">資料型別轉換器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否會購買產品。請選擇資料編碼方式，觀察資料轉換結果與特徵維度變化。
      </p>

      {/* 編碼策略選擇器 */}
      <div className="mb-4">
        <label className="mr-4 font-medium">選擇編碼方式：</label>
        <select
          value={encoding}
          onChange={(e) => setEncoding(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="onehot">One-hot Encoding</option>
          <option value="label">Label Encoding</option>
        </select>
      </div>

      {/* 編碼後欄位數統計 */}
      <p className="mb-4 text-sm text-gray-600">
        編碼後欄位數：<strong>{columnCount}</strong>
      </p>

      {/* 編碼後資料表格 */}
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(encodedData[0]).map((key) => (
              <th key={key} className="border px-2 py-1 text-left">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {encodedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {Object.values(row).map((val, i) => (
                <td key={i} className="border px-2 py-1">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 編碼策略說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>One-hot Encoding</strong>：將每個類別轉為獨立欄位，適合無序類別。</li>
          <li><strong>Label Encoding</strong>：將類別轉為整數標籤，適合有序類別。</li>
          <li>One-hot 可能導致維度爆炸，Label Encoding 可能引入誤解。</li>
          <li>選擇編碼方式需考慮模型類型與資料性質。</li>
        </ul>
      </div>
    </div>
  );
};

export default DataTypeModule;