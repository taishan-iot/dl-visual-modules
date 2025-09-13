// src/components/DL/TrueBackpropSimulator.jsx
import React, { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import DeepLearningGlossary from './DeepLearningGlossary';

// 激活函數定義
const activationFunctions = {
 relu: {
  label: 'ReLU',
  fn: (x) => Math.max(0, x),
  derivative: (x) => (x > 0 ? 1 : 0),
 },
 sigmoid: {
  label: 'Sigmoid',
  fn: (x) => 1 / (1 + Math.exp(-x)),
  derivative: (x) => {
   const s = 1 / (1 + Math.exp(-x));
   return s * (1 - s);
  },
 },
};

// 初始化策略
const initStrategies = {
 random: () => Math.random() * 2 - 1,
 xavier: () => Math.random() * Math.sqrt(1 / 4),
 he: () => Math.random() * Math.sqrt(2 / 4),
};

const TrueBackpropSimulator = () => {
 const [activation, setActivation] = useState('relu');
 const [init, setInit] = useState('xavier');

 // 網路超參數
 const layers = 5;
 const neurons = 4;
 const input = useMemo(() => Array(neurons).fill(0).map(() => Math.random()), []);
 const target = useMemo(() => Array(neurons).fill(0.5), []);

 // 使用 useMemo 進行性能優化
 const { weights, forward, z_values, output, loss, gradients } = useMemo(() => {
  // 初始化權重
  const weights = Array(layers).fill(0).map(() =>
   Array(neurons).fill(0).map(() => initStrategies[init]())
  );

  // 前向傳播
  const forward = [];
  const z_values = []; // 保存激活函數的輸入值
  forward[0] = input;
  z_values[0] = input;

  for (let l = 1; l < layers; l++) {
   forward[l] = [];
   z_values[l] = [];
   for (let i = 0; i < neurons; i++) {
    const z = forward[l - 1].reduce((sum, x, j) => sum + x * weights[l][j], 0);
    z_values[l][i] = z;
    forward[l][i] = activationFunctions[activation].fn(z);
   }
  }

  const output = forward[layers - 1];

  // 損失計算
  const loss = output.reduce((sum, y, i) => sum + Math.pow(y - target[i], 2), 0) / neurons;

  // 反向傳播
  const gradients = [];
  // 輸出層的梯度
  gradients[layers - 1] = output.map((y, i) => 2 * (y - target[i]));

  // 從倒數第二層開始反向計算
  for (let l = layers - 2; l >= 0; l--) {
   gradients[l] = [];
   for (let i = 0; i < neurons; i++) {
    // 來自後一層所有神經元的梯度之和
    const gradientSumFromNextLayer = gradients[l + 1].reduce(
     (sum, grad_next, j) => sum + grad_next * weights[l + 1][j],
     0
    );
    // 乘以本層神經元激活函數的導數
    gradients[l][i] = gradientSumFromNextLayer * activationFunctions[activation].derivative(z_values[l][i]);
   }
  }

  return { weights, forward, z_values, output, loss, gradients };
 }, [activation, init, layers, neurons, input, target]);

 // 圖表數據
 const chartData = useMemo(() => ({
  labels: Array.from({ length: layers }, (_, i) => `L${i + 1}`),
  datasets: [
   {
    label: '每層平均梯度值',
    data: gradients.map((g) =>
     parseFloat((g.reduce((a, b) => a + Math.abs(b), 0) / g.length).toFixed(4))
    ),
    backgroundColor: '#10b981',
   },
  ],
 }), [gradients, layers]);

 const chartOptions = {
  scales: {
   y: { beginAtZero: true, max: 1 },
  },
  plugins: {
   legend: { display: false },
  },
 };

 return (
  <div className="p-4 bg-white rounded shadow" id="module-true-backprop">
   <h2 className="text-xl font-bold mb-4">🧩 真實反向傳播模擬器</h2>

   {/* 激活函數與初始化策略選擇器 */}
   <div className="mb-4 flex space-x-6">
    <div>
     <label className="font-medium mr-2">激活函數：</label>
     <select
      value={activation}
      onChange={(e) => setActivation(e.target.value)}
      className="border px-2 py-1 rounded"
     >
      <option value="relu">ReLU</option>
      <option value="sigmoid">Sigmoid</option>
     </select>
    </div>
    <div>
     <label className="font-medium mr-2">初始化策略：</label>
     <select
      value={init}
      onChange={(e) => setInit(e.target.value)}
      className="border px-2 py-1 rounded"
     >
      <option value="random">Random</option>
      <option value="xavier">Xavier</option>
      <option value="he">He</option>
     </select>
    </div>
   </div>

   {/* 損失顯示 */}
   <div className="mb-4 text-sm text-gray-700">
    <p>模擬輸出值：<strong>{output.map((v) => v.toFixed(2)).join(', ')}</strong></p>
    <p>目標值：<strong>{target.join(', ')}</strong></p>
    <p>均方誤差（MSE）：<strong>{loss.toFixed(4)}</strong></p>
   </div>

   {/* 梯度視覺化 */}
   <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">📊 每層平均梯度值</h3>
    <Bar data={chartData} options={chartOptions} />
    <p className="mt-2 text-sm text-gray-500">
     梯度值越穩定，模型越容易訓練；若梯度消失或爆炸，模型將難以收斂。
    </p>
   </div>

   {/* 詞彙解釋區 */}
   <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">🔍 詞彙解釋</h3>
    <DeepLearningGlossary
      selected={['TrueBackpropSimulator', 'Backpropagation', 'Gradient Vanishing', 'Gradient Exploding']}
    />
   </div>

   {/* 教學補充 */}
   <div className="text-sm text-gray-600">
    <p>
     展示了反向傳播中梯度如何在不同層流動，並受激活函數與初始化策略影響。
    </p>
    <p className="mt-2">
     可以進一步探索 BatchNorm、Dropout、不同損失函數對梯度穩定性的影響。
    </p>
   </div>
  </div>
 );
};

// 請將它替換成預設匯出
export default TrueBackpropSimulator;