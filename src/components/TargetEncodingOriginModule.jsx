// src/components/TargetEncodingOriginModule.jsx
import React from 'react';

const rawData = [
  { name: 'Alice', level: 'Gold', purchased: 1 },
  { name: 'Bob', level: 'Silver', purchased: 0 },
  { name: 'Charlie', level: 'Bronze', purchased: 0 },
  { name: 'Dana', level: 'Gold', purchased: 1 },
];

const TargetEncodingOriginModule = () => {
  const levelGroups = {};
  rawData.forEach((row) => {
    if (!levelGroups[row.level]) levelGroups[row.level] = [];
    levelGroups[row.level].push(row.purchased);
  });

  const encodingMap = {};
  Object.entries(levelGroups).forEach(([level, values]) => {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    encodingMap[level] = parseFloat(avg.toFixed(2));
  });

  const encodedData = rawData.map((row) => ({
    name: row.name,
    level: row.level,
    encoded: encodingMap[row.level],
    purchased: row.purchased,
  }));

  const accuracy = 90;

  return (
    <div className="p-4 bg-white rounded shadow mt-10" id="module-target-origin">
      <h3 className="text-xl font-bold mb-4">Target Encoding 來源模擬器</h3>

      {/* 原始資料表格 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">原始資料</h4>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">會員等級</th>
              <th className="border px-2 py-1">是否購買</th>
            </tr>
          </thead>
          <tbody>
            {rawData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.level}</td>
                <td className="border px-2 py-1">{row.purchased}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 編碼對照表 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">編碼對照表（平均購買率）</h4>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">會員等級</th>
              <th className="border px-2 py-1">平均 purchased</th>
              <th className="border px-2 py-1">編碼值</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(encodingMap).map(([level, value]) => (
              <tr key={level} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{level}</td>
                <td className="border px-2 py-1">{value}</td>
                <td className="border px-2 py-1 text-blue-600 font-medium">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 編碼後資料表格 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">編碼後資料</h4>
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">姓名</th>
              <th className="border px-2 py-1">原始等級</th>
              <th className="border px-2 py-1">編碼值</th>
              <th className="border px-2 py-1">是否購買</th>
            </tr>
          </thead>
          <tbody>
            {encodedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{row.name}</td>
                <td className="border px-2 py-1">{row.level}</td>
                <td className="border px-2 py-1 text-blue-600">{row.encoded}</td>
                <td className="border px-2 py-1">{row.purchased}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 模擬準確率 */}
      <p className="mb-4 text-sm text-gray-600">
        模擬預測準確率：<strong>{accuracy}%</strong>
      </p>

      {/* 教學補充區塊 */}
      <div className="text-sm text-gray-700">
        <h4 className="text-lg font-semibold mb-2">📘 Target Encoding 是怎麼來的？</h4>
        <p>每個類別的編碼值是根據該類別的「平均購買率」計算出來的。例如：</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Gold：purchased = [1, 1] → 平均 = 1.0 → 編碼值 = 1.0</li>
          <li>Silver：purchased = [0] → 平均 = 0.0 → 編碼值 = 0.0</li>
          <li>Bronze：purchased = [0] → 平均 = 0.0 → 編碼值 = 0.0</li>
        </ul>
        <p className="mt-2">
          這個編碼值代表「該類別的平均表現」，模型可以用這個資訊來預測新資料。
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-2">📘 為什麼需要交叉驗證？</h4>
        <p>
          如果直接用整份資料來算平均，模型可能「偷看答案」，導致過擬合。交叉驗證的做法是：將資料分組，每次只用其他組的資料來算平均值，不能用自己那組。這樣模型才不會作弊，能真實學習類別的影響力。
        </p>
        <p className="text-xs text-gray-500 mt-1">
          比喻：就像考試時不能看答案寫作文。交叉驗證就是「先遮住答案，再練習」，讓模型學得更扎實。
        </p>
      </div>
    </div>
  );
};

export default TargetEncodingOriginModule;