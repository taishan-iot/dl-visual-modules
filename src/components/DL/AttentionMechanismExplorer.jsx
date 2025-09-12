// src/components/DL/AttentionMechanismExplorer.jsx
import React, { useState } from 'react';
import DeepLearningGlossary from './DeepLearningGlossary';

const softmax = (arr) => {
  const exp = arr.map((x) => Math.exp(x));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map((x) => parseFloat((x / sum).toFixed(3)));
};

const AttentionMechanismExplorer = () => {
  const [sentence, setSentence] = useState('The cat sat on the mat');
  const tokens = sentence.trim().split(/\s+/).slice(0, 6);
  const d = 4;

  const glossaryKeys = ['注意力機制（Attention）', 'Softmax', 'Query', 'Key', 'Value'];

  const vectors = tokens.map(() => ({
    q: Array(d).fill(0).map(() => Math.random()),
    k: Array(d).fill(0).map(() => Math.random()),
    v: Array(d).fill(0).map(() => Math.random()),
  }));

  const attentionMatrix = tokens.map((_, i) => {
    const qi = vectors[i].q;
    const scores = tokens.map((_, j) => {
      const kj = vectors[j].k;
      const dot = qi.reduce((sum, qv, idx) => sum + qv * kj[idx], 0);
      return dot / Math.sqrt(d);
    });
    return softmax(scores);
  });


  return (
    <div className="p-4 bg-white rounded shadow" id="module-attention-explorer">
      <h2 className="text-xl font-bold mb-4">🧠 注意力機制模擬器</h2>

      {/* 文字輸入區 */}
      <div className="mb-4">
        <label className="font-medium mr-2">輸入句子：</label>
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          className="border px-2 py-1 rounded w-full max-w-xl"
        />
        <p className="text-sm text-gray-500 mt-1">最多顯示前 6 個詞的注意力分布</p>
      </div>

      {/* 注意力矩陣展示 */}
      <div className="mb-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">📊 注意力分布矩陣</h3>
        <table className="table-auto border text-sm text-center">
          <thead>
            <tr>
              <th className="px-2 py-1 bg-gray-100">Query ↓ / Key →</th>
              {tokens.map((t, idx) => (
                <th key={idx} className="px-2 py-1 bg-gray-100">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((t, i) => (
              <tr key={i}>
                <td className="px-2 py-1 font-medium bg-gray-50">{t}</td>
                {attentionMatrix[i].map((score, j) => (
                  <td key={j} className="px-2 py-1">{score}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-gray-500">
          每個 Query 對所有 Key 的注意力分數，越高表示越關注。
        </p>
      </div>

      {/* Self-Attention 公式展示 */}
      <div className="mb-6 text-sm text-gray-700">
        <h3 className="text-lg font-semibold mb-2">📐 Self-Attention 公式</h3>
        <p className="font-mono bg-gray-100 p-2 rounded">
          Attention(Q, K, V) = softmax(QKᵀ / √d) × V
        </p>
        <p className="mt-2">
          Q = Query、K = Key、V = Value，d 為向量維度。softmax 用來分配注意力權重。
        </p>
      </div>

      {/* 詞彙解釋區（修正後） */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">🔍 關鍵詞彙解釋</h3>
        {glossaryKeys.map((key) => (
          <div key={key} className="mb-4">
            <DeepLearningGlossary selected={key} />
          </div>
        ))}
      </div>



      {/* 教學補充 */}
      <div className="text-sm text-gray-600">
        <p>
          注意力機制能讓模型根據語意關係動態分配權重，捕捉長距依賴與關鍵詞對齊，是 Transformer 架構的核心。
        </p>
        <p className="mt-2">
          作為 NLP、語音、圖像生成等任務的語意建模起點，搭配 Transformer 模型探索效果更佳。
        </p>
      </div>
    </div>
  );
};

export default AttentionMechanismExplorer;