// src/components/FeatureImportanceModule.jsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const featureSets = {
  purchase: [
    { name: '年齡', importance: 0.35, hint: '可能影響購買意願' },
    { name: '收入', importance: 0.25, hint: '與消費能力相關' },
    { name: '教育程度', importance: 0.20, hint: '可能影響品牌偏好' },
    { name: '婚姻狀態', importance: 0.10, hint: '與家庭支出模式有關' },
    { name: '居住地區', importance: 0.10, hint: '可能影響物流與偏好' },
  ],
  churn: [
    { name: '使用頻率', importance: 0.30, hint: '低頻率可能預示流失' },
    { name: '客服互動次數', importance: 0.25, hint: '高互動可能代表不滿' },
    { name: '訂閱時長', importance: 0.20, hint: '短期用戶流失率高' },
    { name: '付款方式', importance: 0.15, hint: '自動扣款用戶流失率低' },
    { name: '裝置類型', importance: 0.10, hint: '行動裝置用戶流失率高' },
  ],
};

const FeatureImportanceModule = () => {
  const [task, setTask] = useState('purchase');
  const [removed, setRemoved] = useState([]);
  const [shuffled, setShuffled] = useState([]);

  const features = featureSets[task];

  const toggleRemove = (name) => {
    setRemoved((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const toggleShuffle = (name) => {
    setShuffled((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const filteredFeatures = features.map((f) => ({
    ...f,
    status: removed.includes(f.name)
      ? '移除'
      : shuffled.includes(f.name)
      ? '打亂'
      : '正常',
  }));

  const chartData = {
    labels: filteredFeatures.map((f) => f.name),
    datasets: [
      {
        label: '特徵重要性分數',
        data: filteredFeatures.map((f) => f.status === '移除' ? 0 : f.importance),
        backgroundColor: filteredFeatures.map((f) =>
          f.status === '移除' ? '#d1d5db' :
          f.status === '打亂' ? '#fbbf24' : '#60a5fa'
        ),
      },
    ],
  };

  const accuracy = Math.round(
    90 -
      removed.reduce((acc, name) => {
        const f = features.find((f) => f.name === name);
        return acc + f.importance * 20;
      }, 0) -
      shuffled.reduce((acc, name) => {
        const f = features.find((f) => f.name === name);
        return acc + f.importance * 10;
      }, 0)
  );

  const precision = Math.max(60, Math.round(accuracy - removed.length * 2));
  const recall = Math.max(55, Math.round(accuracy - shuffled.length * 3));
  const f1 = Math.round((2 * precision * recall) / (precision + recall));

  return (
    <div className="p-4 bg-white rounded shadow" id="module-5">
      <h2 className="text-xl font-bold mb-4">特徵重要性分析器</h2>

      {/* 任務選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇預測任務：</label>
        <select
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setRemoved([]);
            setShuffled([]);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="purchase">預測是否購買產品</option>
          <option value="churn">預測是否流失</option>
        </select>
      </div>

      {/* 特徵操作區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">特徵操作</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.name} className="flex items-center justify-between border px-3 py-2 rounded bg-gray-50">
              <div>
                <span className="font-medium" title={f.hint}>{f.name}</span>
                <span className="ml-2 text-xs text-gray-500">({f.hint})</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => toggleRemove(f.name)}
                  className={`px-2 py-1 rounded text-sm ${
                    removed.includes(f.name)
                      ? 'bg-red-200'
                      : 'bg-gray-200'
                  }`}
                >
                  移除
                </button>
                <button
                  onClick={() => toggleShuffle(f.name)}
                  className={`px-2 py-1 rounded text-sm ${
                    shuffled.includes(f.name)
                      ? 'bg-yellow-200'
                      : 'bg-gray-200'
                  }`}
                >
                  打亂
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 特徵重要性圖表 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">特徵重要性視覺化</h3>
        <Bar data={chartData} />
      </div>

      {/* 模型指標模擬 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📊 模型指標模擬</h3>
        <p>預估準確率：<strong>{accuracy}%</strong></p>
        <p>Precision：{precision}% Recall：{recall}% F1 Score：{f1}%</p>
        <p className="text-xs text-gray-500">
          模擬假設：移除或打亂特徵會影響模型的預測準確性與偏差。
        </p>
      </div>

      {/* 混淆矩陣視覺化 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 混淆矩陣範例</h3>
        <table className="table-auto border-collapse border text-sm mb-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">實際＼預測</th>
              <th className="border px-3 py-2">正類</th>
              <th className="border px-3 py-2">負類</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">正類</td>
              <td className="border px-3 py-2 text-green-600">TP</td>
              <td className="border px-3 py-2 text-red-600">FN</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">負類</td>
              <td className="border px-3 py-2 text-red-600">FP</td>
              <td className="border px-3 py-2 text-green-600">TN</td>
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-gray-500">
          Precision = TP / (TP + FP) Recall = TP / (TP + FN) F1 Score = 2 × (P × R) / (P + R)
        </p>
      </div>

      {/* 方法說明區 */}
      <div className="text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📘 特徵重要性方法說明</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>SHAP（SHapley Additive Explanations）</strong>：基於博弈論，衡量每個特徵在所有可能組合中對預測結果的平均邊際貢獻。
            <div className="font-mono bg-gray-100 p-2 rounded text-sm mt-1">
              φᵢ = Σ<sub>S⊆N-i</sub> [ (|S|! × (|N|-|S|-1)! ) / |N|! ] × [ f(S ∪ i) − f(S) ]
            </div>
            <p className="text-xs text-gray-500 mt-1">
              其中 S 為不包含特徵 i 的特徵子集，f(S) 表示僅使用 S 特徵時模型的預測值。
            </p>
          </li>
          <li>
            <strong>Permutation Importance</strong>：將某特徵的值隨機打亂，觀察模型準確率下降幅度。
            <div className="font-mono bg-gray-100 p-2 rounded text-sm mt-1">
              PIᵢ = A₍orig₎ − A₍perm₎
            </div>
            <p className="text-xs text-gray-500 mt-1">
              A₍orig₎ 為原始準確率，A₍perm₎ 為打亂特徵 i 後的準確率。
            </p>
          </li>
          <li>
            SHAP 適合個別預測解釋，Permutation Importance 適合整體模型評估。
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureImportanceModule;
// ...existing code...