// src/components/CategoryEncodingModule.jsx
import React, { useState } from 'react';
import TargetEncodingOriginModule from './TargetEncodingOriginModule';

const rawData = [
  { name: 'Alice', gender: 'Female', region: 'North', level: 'Gold', purchased: 1 },
  { name: 'Bob', gender: 'Male', region: 'South', level: 'Silver', purchased: 0 },
  { name: 'Charlie', gender: 'Other', region: 'East', level: 'Bronze', purchased: 0 },
  { name: 'Dana', gender: 'Female', region: 'North', level: 'Gold', purchased: 1 },
];

const CategoryEncodingModule = () => {
  const [method, setMethod] = useState('onehot');

  const encode = () => {
    if (method === 'onehot') {
      return rawData.map((row) => ({
        name: row.name,
        gender_F: row.gender === 'Female' ? 1 : 0,
        gender_M: row.gender === 'Male' ? 1 : 0,
        gender_O: row.gender === 'Other' ? 1 : 0,
        region_N: row.region === 'North' ? 1 : 0,
        region_S: row.region === 'South' ? 1 : 0,
        region_E: row.region === 'East' ? 1 : 0,
        level_G: row.level === 'Gold' ? 1 : 0,
        level_S: row.level === 'Silver' ? 1 : 0,
        level_B: row.level === 'Bronze' ? 1 : 0,
        purchased: row.purchased,
      }));
    } else if (method === 'label') {
      const genderMap = { Female: 0, Male: 1, Other: 2 };
      const regionMap = { North: 0, South: 1, East: 2 };
      const levelMap = { Bronze: 0, Silver: 1, Gold: 2 };
      return rawData.map((row) => ({
        name: row.name,
        gender: genderMap[row.gender],
        region: regionMap[row.region],
        level: levelMap[row.level],
        purchased: row.purchased,
      }));
    } else {
      // Target Encoding (簡化版：根據 purchased 平均值)
      const levelTarget = {
        Bronze: 0,
        Silver: 0,
        Gold: 1,
      };
      return rawData.map((row) => ({
        name: row.name,
        gender: row.gender === 'Female' ? 0.8 : row.gender === 'Male' ? 0.2 : 0.5,
        region: row.region === 'North' ? 0.9 : row.region === 'South' ? 0.3 : 0.4,
        level: levelTarget[row.level],
        purchased: row.purchased,
      }));
    }
  };

  const encoded = encode();
  const columnCount = Object.keys(encoded[0]).length;
  const accuracy = method === 'onehot' ? 88 : method === 'label' ? 85 : 90;

  const methodDescriptions = {
    onehot: '將每個類別轉為獨立欄位，適合無序類別與線性模型。',
    label: '將類別轉為整數標籤，適合有序類別但可能誤導模型。',
    target: '根據目標變數平均值編碼，適合高基數類別但可能過擬合。',
  };

  return (
    <div className="p-4 bg-white rounded shadow" id="module-category-encoding">
      <h2 className="text-xl font-bold mb-4">類別特徵編碼器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否會購買產品。請選擇編碼方式，觀察資料結構與模型準確率的變化。
      </p>

      {/* 編碼方式選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇編碼方式：</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="onehot">One-hot Encoding</option>
          <option value="label">Label Encoding</option>
          <option value="target">Target Encoding</option>
        </select>
      </div>

      {/* 模擬準確率與欄位數 */}
      <p className="mb-2 text-sm text-gray-600">
        模擬預測準確率：<strong>{accuracy}%</strong>
      </p>
      <p className="mb-4 text-sm text-gray-600">
        編碼後欄位數：<strong>{columnCount}</strong>
      </p>

      {/* 編碼後資料表格 */}
      <table className="w-full table-auto border-collapse text-sm mb-6">
        <thead>
          <tr className="bg-gray-200">
            {Object.keys(encoded[0]).map((key) => (
              <th key={key} className="border px-2 py-1 text-left">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {encoded.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {Object.values(row).map((val, i) => (
                <td key={i} className="border px-2 py-1">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 編碼策略說明</h3>
        <ul className="list-disc pl-5 space-y-2">
            {method === 'onehot' && (
            <li>
                <strong>One-hot Encoding：</strong>把每個類別變成一個欄位，只有對應的欄位是 1，其餘是 0。就像「打勾勾」：你是女生 → gender_Female = 1，其它性別欄位都是 0。適合無序類別與線性模型，但類別太多時欄位會爆炸。
            </li>
            )}
            {method === 'label' && (
            <li>
                <strong>Label Encoding：</strong>把每個類別用一個整數代表：女生 = 0，男生 = 1，其他 = 2。就像「編號貼紙」，簡單但可能讓模型誤以為類別有大小順序。適合有序類別。
            </li>
            )}
            {method === 'target' && (
            <>
                <li>
                <strong>Target Encoding：</strong>根據每個類別的「平均結果」來編碼，例如：Gold 會員平均購買率是 0.8 → Gold = 0.8。就像「根據表現打分數」，適合類別很多的欄位，但容易過擬合。
                </li>
                <li>
                <strong>為什麼需要交叉驗證？</strong>如果直接用整份資料的平均值來編碼，模型可能「偷看答案」，導致過擬合。交叉驗證的做法是：將資料分組，每次只用其他組的資料來算平均值，不能用自己那組。這樣模型才能真實學習，不會作弊。
                </li>
                <li className="text-xs text-gray-500">
                比喻：就像考試時不能看答案寫作文。交叉驗證就是「先遮住答案，再練習」，讓模型學得更扎實。
                </li>
            </>
            )}
        </ul>
        {/* 模擬器獨立呈現 */}
        <div className="mt-4">
            <TargetEncodingOriginModule />
        </div>

      </div>
    </div>
  );
};

export default CategoryEncodingModule;