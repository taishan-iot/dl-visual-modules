// src/components/DL/LearningFlowNavigator.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const flowModules = [
  {
    id: 'deep-learning-intro',
    title: '深度學習導論',
    description: '介紹神經網路結構、激活函數與訓練流程',
    glossary: '神經元（Neuron）',
  },
  {
    id: 'model-structure',
    title: '模型結構探索',
    description: '探索 MLP、CNN、RNN、Transformer 架構與用途',
    glossary: '模型架構',
  },
  {
    id: 'model-parameters',
    title: '參數與超參數解釋',
    description: '理解模型參數與訓練前設定的超參數',
    glossary: '超參數（Hyperparameter）',
  },
  {
    id: 'activation-functions',
    title: '激活函數比較',
    description: '比較 ReLU、Sigmoid、Tanh 的輸出與梯度特性',
    glossary: '激活函數（Activation）',
  },
  {
    id: 'gradient-flow',
    title: '梯度流動模擬',
    description: '模擬深層網路中梯度消失與爆炸現象',
    glossary: '梯度消失與爆炸',
  },
  {
    id: 'true-backprop',
    title: '反向傳播模擬器',
    description: '展示 forward → loss → backward 的真實流程',
    glossary: '反向傳播（Backpropagation）',
  },
  {
    id: 'loss-optimizer',
    title: '損失與優化器模擬',
    description: '比較 MSE / CrossEntropy 與 SGD / Adam 的收斂行為',
    glossary: ['損失與優化器模擬', 'MSE', 'CrossEntropy', 'SGD', 'Adam']
  },
  {
    id: 'overfitting-control',
    title: '過擬合與正則化',
    description: '展示 Dropout、L2、EarlyStopping 的效果',
    glossary: ['過擬合與正則化','正則化（Regularization）', 'Dropout', 'L2 正則化', 'EarlyStopping']
  },
  {
    id: 'application-map',
    title: '應用導覽地圖',
    description: '依任務推薦模型與特徵策略',
    glossary: '語意建模',
  },
  {
    id: 'dataset-selector',
    title: '資料集選擇器',
    description: '選擇資料集並顯示型態、任務與推薦模型',
    glossary: '資料型態',
  },
  {
    id: 'transfer-learning',
    title: '遷移學習與微調',
    description: '使用預訓練模型進行下游任務微調',
    glossary: '遷移學習（Transfer Learning）',
  },
  {
    id: 'architecture-timeline',
    title: '架構演進圖',
    description: '導覽 LeNet → ResNet → Transformer 的創新歷程',
    glossary: '架構設計',
  },
  {
    id: 'attention-explorer',
    title: '注意力機制模擬器',
    description: '展示 Self-Attention 的語意對齊與分配邏輯',
    glossary: '注意力機制（Attention）',
  },
  {
    id: 'ethics-bias',
    title: '倫理與偏見模組',
    description: '分析模型偏見與公平性指標',
    glossary: '公平性（Fairness）',
  },
];

const LearningFlowNavigator = () => {
  const [selectedGlossary, setSelectedGlossary] = useState(flowModules[0].glossary);

  return (
    <div className="p-4 bg-white rounded shadow" id="module-learning-flow">
      <h2 className="text-xl font-bold mb-4">🧭 深度學習教學流程導覽器</h2>

      {/* 模組導覽卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {flowModules.map((m) => (
          <div
            key={m.id}
            className="border rounded p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setSelectedGlossary(m.glossary)}
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-1">{m.title}</h3>
            <p className="text-sm text-gray-700 mb-1">{m.description}</p>
            <a
              href={`#module-${m.id}`}
              className="text-sm text-indigo-500 underline mt-2 inline-block"
            >
              前往模組 →
            </a>
          </div>
        ))}
      </div>

      {/* 詞彙解釋區 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        <DeepLearningGlossary selected={selectedGlossary} />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          整合所有模組，依照邏輯排序，建立系統性學習流程。
        </p>
        
      </div>
    </div>
  );
};

export default LearningFlowNavigator;