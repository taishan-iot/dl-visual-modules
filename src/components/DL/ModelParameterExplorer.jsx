// src/components/DL/ModelParameterExplorer.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const parameterMap = {
  mlp: {
    parameters: ['權重（Weights）', '偏差（Bias）'],
    hyperparameters: ['學習率（Learning Rate）', '層數（Hidden Layers）', '激活函數（Activation）'],
  },
  cnn: {
    parameters: ['卷積核（Kernel）', '偏差（Bias）'],
    hyperparameters: ['Kernel Size', 'Stride', 'Dropout', '激活函數（Activation）'],
  },
  rnn: {
    parameters: ['狀態轉移矩陣（Transition Matrix）', '嵌入矩陣（Embedding）'],
    hyperparameters: ['Hidden Size', '梯度截斷（Gradient Clipping）', '激活函數（Activation）'],
  },
  transformer: {
    parameters: ['注意力權重（Attention Weights）', '嵌入矩陣（Embedding）'],
    hyperparameters: ['Head 數', 'Embedding Size', 'Layer Depth', '學習率調度策略'],
  },
};

const ModelParameterExplorer = () => {
  const [selectedModel, setSelectedModel] = useState('mlp');
  const [selectedTerm, setSelectedTerm] = useState('權重（Weights）');

  const { parameters, hyperparameters } = parameterMap[selectedModel];
  const allTerms = [...parameters, ...hyperparameters];

  return (
    <div className="p-4 bg-white rounded shadow" id="module-model-parameters">
      <h2 className="text-xl font-bold mb-4">🧩 模型參數與超參數解釋器</h2>
      <p className="text-sm text-gray-700 mb-4">
        深度學習模型的效能不只來自架構設計，更仰賴參數與超參數的正確設定與理解。參數是模型透過訓練學習出的知識，而超參數則是我們在訓練前所做的策略性選擇。兩者共同決定模型的預測能力、學習速度與泛化效果。
      </p>
      {/* 模型選擇器 */}
      <div className="mb-4">
        <label className="font-medium mr-4">選擇模型：</label>
        <select
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value);
            setSelectedTerm(parameterMap[e.target.value].parameters[0]);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="mlp">MLP（表格資料）</option>
          <option value="cnn">CNN（圖像資料）</option>
          <option value="rnn">RNN（序列資料）</option>
          <option value="transformer">Transformer（語意建模）</option>
        </select>
      </div>

      {/* 參數與超參數分類展示 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📘 模型參數</h3>
        <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
          {parameters.map((term) => (
            <li
              key={term}
              className={`cursor-pointer ${selectedTerm === term ? 'text-blue-600 font-medium' : ''}`}
              onClick={() => setSelectedTerm(term)}
            >
              {term}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">⚙️ 超參數</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          {hyperparameters.map((term) => (
            <li
              key={term}
              className={`cursor-pointer ${selectedTerm === term ? 'text-green-600 font-medium' : ''}`}
              onClick={() => setSelectedTerm(term)}
            >
              {term}
            </li>
          ))}
        </ul>
      </div>

      {/* 詞彙解釋區（與 DeepLearningGlossary.jsx 同步） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
        <DeepLearningGlossary
            selected={[
                selectedTerm,
                ...[...parameters, ...hyperparameters].filter((term) => term !== selectedTerm),
            ]}
            />
      </div>

      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          模型參數是訓練中學習出的值，決定模型如何預測；超參數則是訓練前設定的策略，影響模型的學習速度、表達能力與泛化效果。
        </p>
        <p className="mt-2">
          調參是一門藝術，理解每個參數的作用是建立穩定模型的關鍵。
        </p>
      </div>
    </div>
  );
};

export default ModelParameterExplorer;