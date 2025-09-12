// src/components/DL/ModelEvaluationPanel.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const classificationMetrics = [
  {
    name: 'Accuracy',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    meaning: '整體預測正確率',
  },
  {
    name: 'Precision',
    formula: 'TP / (TP + FP)',
    meaning: '預測為正例中，實際為正例的比例',
  },
  {
    name: 'Recall',
    formula: 'TP / (TP + FN)',
    meaning: '實際正例中，被正確預測的比例',
  },
  {
    name: 'F1-score',
    formula: '2 × (Precision × Recall) / (Precision + Recall)',
    meaning: 'Precision 與 Recall 的調和平均',
  },
];

const regressionMetrics = [
  {
    name: 'MSE',
    formula: '(1/n) ∑(y - ŷ)²',
    meaning: '均方誤差，衡量預測與真實值的差距',
  },
  {
    name: 'MAE',
    formula: '(1/n) ∑|y - ŷ|',
    meaning: '平均絕對誤差，對離群值較不敏感',
  },
  {
    name: 'R²',
    formula: '1 - (∑(y - ŷ)² / ∑(y - ȳ)²)',
    meaning: '解釋變異比例，越接近 1 表示模型越好',
  },
];

const confusionMatrix = {
  TP: 45,
  FP: 10,
  FN: 5,
  TN: 40,
};

const ModelEvaluationPanel = () => {
  const [task, setTask] = useState('classification');
  const metrics = task === 'classification' ? classificationMetrics : regressionMetrics;

  return (
    <div className="p-4 bg-white rounded shadow" id="module-model-evaluation">
      <h2 className="text-xl font-bold mb-4">📊 模型評估模組</h2>
      <p className="text-sm text-gray-700 mb-4">
        模型評估是深度學習流程中不可或缺的一環。它不僅用來衡量模型效能，更是判斷模型是否適合實際應用的依據。透過正確的評估指標，我們能了解模型在不同任務（分類或回歸）中的表現，並進一步調整架構、參數或資料策略。
      </p>
      {/* 任務類型選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇任務類型：</label>
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="classification">分類任務</option>
          <option value="regression">回歸任務</option>
        </select>
      </div>

      {/* 評估指標展示 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📐 評估指標與公式</h3>
        <ul className="list-disc pl-5 space-y-2">
          {metrics.map((m, idx) => (
            <li key={idx}>
              <strong>{m.name}</strong> — {m.meaning}
              <div className="font-mono text-blue-700">{m.formula}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* 混淆矩陣視覺化（分類任務） */}
      {task === 'classification' && (
        <div className="mb-6 text-sm text-gray-700">
          <h3 className="text-lg font-semibold mb-2">🧮 混淆矩陣（模擬）</h3>
          <table className="table-auto border text-center text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 bg-gray-100">實際 / 預測</th>
                <th className="px-2 py-1 bg-gray-100">正例</th>
                <th className="px-2 py-1 bg-gray-100">負例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-2 py-1 font-medium bg-gray-50">正例</td>
                <td className="px-2 py-1">{confusionMatrix.TP}</td>
                <td className="px-2 py-1">{confusionMatrix.FN}</td>
              </tr>
              <tr>
                <td className="px-2 py-1 font-medium bg-gray-50">負例</td>
                <td className="px-2 py-1">{confusionMatrix.FP}</td>
                <td className="px-2 py-1">{confusionMatrix.TN}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-gray-500">
            混淆矩陣可視化模型在不同類別上的預測準確性與偏誤。
          </p>
        </div>
      )}

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={
                task === 'classification'
                ? ['分類任務評估', 'Accuracy', 'Precision', 'Recall', 'F1-score']
                : ['回歸任務評估', 'MSE', 'MAE', 'R²']
            }
        />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          模型評估不僅是效能指標，更是業務決策的依據。不同任務需選擇不同指標，並考慮資料偏差與任務目標。
        </p>
        <p className="mt-2">
          可搭配 EthicsAndBiasPanel、LossOptimizerSimulator 使用，建立完整的模型評估與公平性理解。
        </p>
      </div>
    </div>
  );
};

export default ModelEvaluationPanel;