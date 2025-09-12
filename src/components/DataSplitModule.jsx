// src/components/DataSplitModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const DataSplitModule = () => {
  const [trainRatio, setTrainRatio] = useState(70);
  const [valRatio, setValRatio] = useState(15);

  const testRatio = 100 - trainRatio - valRatio;

  const handleTrainChange = (e) => {
    const value = parseInt(e.target.value);
    const maxVal = 100 - value - 5;
    setTrainRatio(value);
    if (valRatio > maxVal) setValRatio(maxVal);
  };

  const handleValChange = (e) => {
    const value = parseInt(e.target.value);
    const maxVal = 100 - trainRatio;
    setValRatio(value > maxVal ? maxVal : value);
  };

  const data = {
    labels: ['訓練集', '驗證集', '測試集'],
    datasets: [
      {
        label: '資料分割比例 (%)',
        data: [trainRatio, valRatio, testRatio],
        backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: '資料分割比例視覺化',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '比例 (%)',
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">資料分割模擬器</h2>

      {/* 任務情境說明 */}
      <p className="text-sm text-gray-700 mb-4">
        模擬任務：預測使用者是否會購買高價產品。請調整資料分割比例，觀察訓練、驗證、測試集的分配情況。
      </p>

      {/* 滑桿控制區 */}
      <div className="mb-4 space-y-4">
        <div>
          <label className="font-medium mr-4">訓練集比例：</label>
          <input
            type="range"
            min="50"
            max="90"
            value={trainRatio}
            onChange={handleTrainChange}
            className="w-full"
          />
          <span className="ml-2 text-sm text-gray-600">{trainRatio}%</span>
        </div>
        <div>
          <label className="font-medium mr-4">驗證集比例：</label>
          <input
            type="range"
            min="5"
            max={100 - trainRatio}
            value={valRatio}
            onChange={handleValChange}
            className="w-full"
          />
          <span className="ml-2 text-sm text-gray-600">{valRatio}%</span>
        </div>
      </div>

      {/* 圖表呈現 */}
      <Bar data={data} options={options} />

      {/* 分割比例文字 */}
      <p className="mt-4 text-sm text-gray-600">
        訓練集：{trainRatio}%、驗證集：{valRatio}%、測試集：{testRatio}%
      </p>

      {/* 教學補充區塊 */}
      <div className="mt-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 資料分割策略說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>訓練集用於模型學習，比例通常為 70%–80%</li>
          <li>驗證集用於調參與早停，比例約 10%–15%</li>
          <li>測試集用於最終評估模型泛化能力</li>
          <li>比例不當可能導致過擬合或評估失真</li>
          <li>測試集比例過低可能無法有效評估模型效能</li>
        </ul>
      </div>
    </div>
  );
};

export default DataSplitModule;