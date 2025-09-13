// src/components/DL/DeepLearningGlossary.jsx
import React from 'react';

const glossary = {
  '神經元（Neuron）': {
    category: '結構元件',
    definition: '神經元是神經網路中的基本運算單元，接收輸入並產生輸出。',
    usage: '每個神經元執行加權總和與激活函數運算。',
  },
  '權重（Weights）': {
    category: '參數',
    definition: '權重是神經元輸入的乘數，決定輸入對輸出的影響程度。',
    usage: '透過訓練自動調整以最小化損失。',
  },
  '偏差（Bias）': {
    category: '參數',
    definition: '偏差是加在加權總和上的常數，用來調整輸出範圍。',
    usage: '幫助模型學習非零中心的輸出。',
  },
  '激活函數（Activation）': {
    category: '激活函數',
    definition: '激活函數將神經元的線性輸出轉換為非線性輸出，是深度模型表達能力的關鍵。',
    usage: '常見函數包括 ReLU、Sigmoid、Tanh，選擇會影響梯度穩定性與收斂速度。',
  },
  'ReLU': {
    category: '激活函數',
    definition: 'ReLU 定義為 f(x) = max(0, x)，在 x > 0 時為線性，在 x < 0 時為 0。',
    usage: '計算效率高，減少梯度消失問題。',
    formula: 'f(x) = max(0, x)',
  },
  'Sigmoid': {
    category: '激活函數',
    definition: 'Sigmoid 將輸出壓縮在 0 到 1 之間，常用於二分類任務。',
    usage: '容易在極端值出現梯度消失。',
    formula: 'f(x) = 1 / (1 + e^{-x})',
  },
  'Tanh': {
    category: '激活函數',
    definition: 'Tanh 將輸出壓縮在 -1 到 1 之間，中心化效果比 Sigmoid 好。',
    usage: '仍有飽和區，但比 Sigmoid 穩定。',
    formula: 'f(x) = (e^x - e^{-x}) / (e^x + e^{-x})',
  },
  'Softmax': {
    category: '激活函數 / 輸出層',
    definition: 'Softmax 將多類輸出轉換為機率分布。',
    usage: '常用於多分類任務的輸出層。',
    formula: 'f(x_i) = e^{x_i} / ∑ e^{x_j}',
  },
  '損失函數（Loss Function）': {
    category: '訓練流程',
    definition: '損失函數衡量預測值與真實值的差距。',
    usage: '常見有 MSE、CrossEntropy。',
  },
  'MSE': {
    category: '損失函數',
    definition: '均方誤差，計算預測值與真實值的平方差平均。',
    usage: '適用於回歸任務。',
    formula: 'Loss = (1/n) ∑(y - ŷ)²',
  },
  'CrossEntropy': {
    category: '損失函數',
    definition: '交叉熵衡量預測機率分布與真實分布的差距。',
    usage: '適用於分類任務，常搭配 Softmax。',
    formula: 'Loss = -∑ y log(ŷ)',
  },
  '優化器（Optimizer）': {
    category: '訓練流程',
    definition: '優化器根據梯度更新模型參數以最小化損失。',
    usage: '常見有 SGD、Adam、RMSprop。',
  },
  'Sgd': {
    category: '優化器',
    definition: '隨機梯度下降法，每次使用一小批資料更新參數。',
    usage: '收斂慢但穩定，適合小型資料集。',
  },
  'Adam': {
    category: '優化器',
    definition: '結合 Momentum 與 RMSprop 的自適應優化器。',
    usage: '收斂快且穩定，適用於大多數任務。',
  },
  'Rmsprop': {
    category: '優化器',
    definition: '根據梯度平方的移動平均調整學習率。',
    usage: '適合非平穩資料，如語音與時間序列。',
  },
  '梯度消失與爆炸': {
    category: '訓練穩定性',
    definition: '梯度在反向傳播中逐層衰減或放大，導致模型無法有效學習。',
    usage: '可透過正規化、激活函數選擇與初始化策略改善。',
  },
  '反向傳播（Backpropagation）': {
    category: '訓練流程',
    definition: '根據損失函數計算梯度，從輸出層向前更新參數。',
    usage: '是深度學習模型訓練的核心機制。',
    formula: '∂L/∂W = ∂L/∂ŷ × ∂ŷ/∂W',
  },
  'BatchNorm': {
    category: '正規化',
    definition: '在 mini-batch 上進行標準化，穩定激活分布。',
    usage: '加速收斂並減少梯度爆炸。',
  },
  'LayerNorm': {
    category: '正規化',
    definition: '在每個樣本內進行標準化，常用於 NLP 模型。',
    usage: '適合序列資料與 Transformer 架構。',
  },
  'Dropout': {
    category: '正則化',
    definition: '隨機丟棄神經元以防止過擬合。',
    usage: '訓練時隨機遮蔽，測試時使用全部神經元。',
  },
  '正則化（Regularization）': {
    category: '訓練策略',
    definition: '防止模型過度擬合訓練資料的技術。',
    usage: '常見方法包括 Dropout、L2、EarlyStopping。',
  },
  'EarlyStopping': {
    category: '訓練策略',
    definition: '當驗證集表現不再提升時提前停止訓練。',
    usage: '可防止過擬合並節省訓練時間。',
  },
  '遷移學習（Transfer Learning）': {
    category: '訓練策略',
    definition: '利用預訓練模型的知識快速適應新任務。',
    usage: '常用於資料量不足的情境。',
  },
  '微調（Fine-tuning）': {
    category: '訓練策略',
    definition: '針對預訓練模型進行部分或全部參數的再訓練。',
    usage: '可選擇凍結底層或只訓練分類頭。',
  },
  '注意力機制（Attention）': {
    category: '語意建模',
    definition: '根據語意關係動態分配權重，捕捉長距依賴。',
    usage: 'Transformer 架構的核心技術。',
    formula: 'Attention(Q, K, V) = softmax(QKᵀ / √d) × V',
  },
  'Vision Transformer': {
    category: '架構設計',
    definition: '將圖像切片後以 Transformer 處理，無需卷積。',
    usage: '適用於圖像分類與生成任務。',
  },
  '卷積（Convolution）': {
    category: '結構元件',
    definition: '局部運算，用於提取空間特徵。',
    usage: '常見於 CNN 架構中。',
  },
  '嵌入（Embedding）': {
    category: '特徵轉換',
    definition: '將離散詞彙轉換為連續向量，建立語意空間。',
    usage: '常用於 NLP 任務中。',
  },
  '資料型態': {
    category: '資料結構',
    definition: '資料型態指的是輸入資料的結構形式，如圖像、文字、表格、語音等。',
    usage: '不同型態的資料需搭配不同模型架構與特徵策略。',
  },
  '模型架構': {
    category: '結構元件',
    definition: '模型架構是神經網路的結構設計，包括層數、連接方式與模塊組成。',
    usage: '常見架構有 MLP、CNN、RNN、Transformer。',
  },
  '超參數（Hyperparameter）': {
    category: '訓練策略',
    definition: '超參數是訓練前由人設定的參數，如學習率、層數、Dropout 比例等。',
    usage: '影響模型的學習速度與泛化能力。',
  },
  'Epoch': {
    category: '訓練流程',
    definition: 'Epoch 是指模型完整看過一次訓練資料的過程。',
    usage: '通常需多個 Epoch 才能收斂。',
  },
  '特徵縮放（Feature Scaling）': {
    category: '資料處理',
    definition: '將數值特徵轉換為統一範圍（如 0~1 或標準化）以提升模型穩定性。',
    usage: '常用於 MLP 與回歸任務。',
  },
  '類別編碼（Encoding）': {
    category: '資料處理',
    definition: '將類別型欄位轉換為數值型，如 One-hot 或 Target Encoding。',
    usage: '使模型能處理非數值特徵。',
  },
  '頻譜特徵（Spectrogram）': {
    category: '語音處理',
    definition: '將音訊轉換為時間 × 頻率的圖像表示，用於語音辨識。',
    usage: '常搭配 CNN 或 RNN 處理。',
  },
  '語音特徵（Audio Embedding）': {
    category: '特徵轉換',
    definition: '將語音訊號轉換為向量表示，捕捉語音內容與語者特性。',
    usage: '常用於語音辨識與語者識別任務。',
  },
  '公平性（Fairness）': {
    category: '倫理與偏見',
    definition: '模型在不同群體上的預測表現應一致，避免偏見與歧視。',
    usage: '可透過公平性指標與偏見緩解策略進行評估與改善。',
  },
  'Accuracy': {
    category: '評估指標',
    definition: '整體預測正確率，計算正確預測佔總樣本比例。',
    usage: '適用於分類任務。',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
  },
  'Precision': {
    category: '評估指標',
    definition: '預測為正例中，實際為正例的比例。',
    usage: '適用於需降低誤報的任務。',
    formula: 'TP / (TP + FP)',
  },
  'Recall': {
    category: '評估指標',
    definition: '實際正例中，被正確預測的比例。',
    usage: '適用於需降低漏報的任務。',
    formula: 'TP / (TP + FN)',
  },
  'F1-score': {
    category: '評估指標',
    definition: 'Precision 與 Recall 的調和平均。',
    usage: '適用於需平衡誤報與漏報的任務。',
    formula: '2 × (Precision × Recall) / (Precision + Recall)',
  },
  'MAE': {
    category: '評估指標',
    definition: '平均絕對誤差，衡量預測值與真實值的絕對差距。',
    usage: '適用於回歸任務，對離群值較不敏感。',
    formula: '(1/n) ∑|y - ŷ|',
  },
  'R²': {
    category: '評估指標',
    definition: '解釋變異比例，衡量模型對資料的擬合程度。',
    usage: '越接近 1 表示模型越好。',
    formula: '1 - (∑(y - ŷ)² / ∑(y - ȳ)²)',
  },
  '模型偏見': {
    category: '倫理與偏見',
    definition: '模型在不同群體上的預測表現不一致，可能造成不公平結果。',
    usage: '需透過資料分析與公平性指標進行檢測與修正。',
  },
  'Demographic Parity': {
    category: '公平性指標',
    definition: '不同群體的預測機率應相等。',
    usage: '適用於不考慮真實標籤的公平性評估。',
    formula: 'P(ŷ = 1 | A = group1) = P(ŷ = 1 | A = group2)',
  },
  'Equal Opportunity': {
    category: '公平性指標',
    definition: '在真實為正例時，各群體的預測機率應相等。',
    usage: '適用於正例預測公平性。',
    formula: 'P(ŷ = 1 | Y = 1, A = group1) = P(ŷ = 1 | Y = 1, A = group2)',
  },
  'Equalized Odds': {
    category: '公平性指標',
    definition: '各群體在真實標籤下的預測分布應一致。',
    usage: '同時考慮 TP 與 FP 的公平性。',
    formula: 'P(ŷ = y | Y = y, A = group1) = P(ŷ = y | Y = y, A = group2)',
  },
  '殘差連接（Residual）': {
    category: '架構設計',
    definition: '殘差連接允許訊息繞過某些層，減少梯度消失並提升深層網路的可訓練性。',
    usage: 'ResNet 架構的核心技術，支援極深網路的穩定訓練。',
    formula: 'y = F(x) + x',
  },
  '卷積核（Kernel）': {
    category: 'CNN 結構',
    definition: '卷積層中的運算單元，用於提取局部特徵。',
    usage: '大小與數量影響特徵提取能力。',
  },
  'Kernel Size': {
    category: 'CNN 超參數',
    definition: '卷積核的尺寸（如 3x3），決定感受野大小。',
    usage: '小尺寸可捕捉細節，大尺寸可捕捉整體結構。',
  },
  'Stride': {
    category: 'CNN 超參數',
    definition: '卷積核移動的步長，影響輸出尺寸與計算量。',
    usage: 'Stride 越大，輸出越小，計算越快但資訊損失越多。',
  },
  '激活值分布': {
    category: '訓練穩定性',
    definition: '神經元輸出值的分布情形，影響梯度穩定與收斂速度。',
    usage: '可透過正規化與激活函數選擇改善。',
  },
  '泛化能力': {
    category: '模型效能',
    definition: '模型在未見資料上的表現能力。',
    usage: '泛化能力強表示模型不僅記住訓練資料，也能推論新資料。',
  },
  'MFCC': {
    category: '語音特徵',
    definition: 'Mel 頻率倒譜係數，是語音辨識常用的特徵表示。',
    usage: '將語音訊號轉換為語音內容的向量表示。',
  },
  'Mel-Spectrogram': {
    category: '語音特徵',
    definition: '將音訊轉換為 Mel 頻率尺度的頻譜圖。',
    usage: '常用於語音辨識與語音生成任務。',
  },
  '池化（Pooling）': {
    category: 'CNN 結構',
    definition: '將特徵圖進行降維與平移不變性處理。',
    usage: '常見有 MaxPooling、AveragePooling。',
  },
  '初始化策略（Random / Xavier / He）': {
    category: '訓練穩定性',
    definition: '初始化策略決定參數初始值的分布，影響梯度穩定性。',
    usage: 'Random 為隨機分布，Xavier 適用 Sigmoid/Tanh，He 適用 ReLU。',
  },
  'random（初始化策略）': {
    category: '初始化策略',
    definition: '隨機初始化參數，可能導致梯度不穩定。',
    usage: '適合小型模型或作為 baseline。',
  },
  'xavier（初始化策略）': {
    category: '初始化策略',
    definition: '根據輸入與輸出維度調整初始權重分布，適合 Sigmoid / Tanh。',
    usage: '可減少梯度消失，提升收斂穩定性。',
  },
  'he（初始化策略）': {
    category: '初始化策略',
    definition: '針對 ReLU 設計的初始化策略，提升梯度穩定性。',
    usage: '適用於深層 ReLU 網路。',
  },
  'L2 正則化': {
    category: '正則化',
    definition: '在損失函數中加入權重平方懲罰項，限制模型複雜度。',
    usage: '可減少過擬合並提升泛化能力。',
    formula: 'Loss = 原始損失 + λ ∑W²',
  },
  '前向傳播（Forward Pass）': {
    category: '訓練流程',
    definition: '將輸入資料經由神經網路計算出預測值 ŷ。',
    usage: '是訓練流程的第一步，產生模型輸出。',
    formula: 'ŷ = σ(Wx + b)',
  },
  '學習率（Learning Rate）': {
    category: '超參數',
    definition: '控制每次參數更新的步伐大小。',
    usage: '學習率過大可能震盪，過小則收斂慢。',
  },
  '層數（Hidden Layers）': {
    category: '模型架構',
    definition: '神經網路中隱藏層的數量，決定模型的深度與表達能力。',
    usage: '層數越多，模型越能擬合複雜關係，但也易過擬合。',
  },
  '深層網路（Deep Network）': {
  category: '模型架構',
  definition: '指具有多層隱藏層的神經網路，能擬合複雜非線性關係。',
  usage: '深層網路提升表達能力，但也增加過擬合與梯度問題風險。',
},
'Query': {
  category: '注意力機制',
  definition: 'Query 是注意力機制中的查詢向量，用來與 Key 計算相似度。',
  usage: '每個詞的 Query 用來決定它應該關注哪些其他詞。',
},
'Key': {
  category: '注意力機制',
  definition: 'Key 是注意力機制中的鍵向量，用來與 Query 比對。',
  usage: '每個詞的 Key 表示它的語意特徵，用來被其他詞查詢。',
},
'Value': {
  category: '注意力機制',
  definition: 'Value 是注意力機制中的值向量，代表實際要傳遞的資訊。',
  usage: '注意力分數用來加權 Value，形成最終輸出。',
},
'性別偏見': {
  category: '倫理與偏見',
  definition: '模型在不同性別群體上的預測表現不一致，可能造成性別歧視。',
  usage: '可透過遮蔽性別特徵或公平性損失函數進行修正。',
},
'種族偏見': {
  category: '倫理與偏見',
  definition: '模型在不同種族群體上的預測表現不一致，可能造成種族不公平。',
  usage: '可透過群體平衡抽樣與對抗式訓練進行修正。',
},
'地區偏見': {
  category: '倫理與偏見',
  definition: '模型在不同地理區域上的預測表現不一致，可能忽略地區差異。',
  usage: '可透過資料擴充與地區特徵重編碼進行修正。',
},
'語言偏見': {
  category: '倫理與偏見',
  definition: '模型在不同語言群體上的預測表現不一致，可能造成語言排斥。',
  usage: '可透過多語語料與語言嵌入調整進行修正。',
},
'語意建模': {
  category: '模型應用',
  definition: '語意建模是指模型捕捉語言或圖像中的語意結構與關聯性。',
  usage: '常透過注意力機制與嵌入層進行語意表示學習。',
},
'損失與優化器模擬': {
  category: '模組導覽',
  definition: '比較不同損失函數（如 MSE、CrossEntropy）與優化器（如 SGD、Adam）在訓練過程中的收斂行為與穩定性。',
  usage: '幫助學員理解損失函數與優化器的選擇如何影響模型學習效率與結果品質。',
},
'過擬合與正則化': {
  category: '模組導覽',
  definition: '展示模型在訓練資料上過度擬合的現象，並透過 Dropout、L2 正則化、EarlyStopping 等策略進行改善。',
  usage: '幫助學員理解如何提升模型的泛化能力並避免過度記憶訓練資料。',
},
'架構演進圖': {
  category: '模組導覽',
  definition: '深度學習架構的歷史演進，包括 LeNet、AlexNet、ResNet、Transformer 等代表性模型。',
  usage: '幫助學員理解架構創新背後的技術突破與設計理念。',
},
'模型評估': {
  category: '模組導覽',
  definition: '展示分類與回歸任務的常見評估指標，並透過公式與混淆矩陣幫助理解模型效能。',
  usage: '可用於模型選擇、業務決策與公平性分析。',
},
'分類任務評估': {
  category: '模組導覽',
  definition: '針對分類任務展示常見評估指標，包括 Accuracy、Precision、Recall、F1-score，並透過混淆矩陣幫助理解模型在不同類別上的預測表現。',
  usage: '適用於二元或多元分類任務，協助判斷模型的精準度與錯誤類型。',
},
'回歸任務評估': {
  category: '模組導覽',
  definition: '針對回歸任務展示常見評估指標，包括 MSE、MAE、R²，幫助理解模型在連續數值預測上的準確性與穩定性。',
  usage: '適用於預測數值型資料，協助判斷模型的誤差大小與解釋能力。',
},
'狀態轉移矩陣（Transition Matrix）': {
  category: 'RNN 結構',
  definition: 'RNN 中用來將前一時間步的隱藏狀態轉換為下一步的核心參數矩陣。',
  usage: '決定序列資料的時間依賴性，影響記憶能力與梯度穩定性。',
},
'嵌入矩陣（Embedding）': {
  category: '特徵轉換',
  definition: '將離散詞彙或類別轉換為連續向量的參數矩陣，建立語意或特徵空間。',
  usage: '常用於 NLP 與序列任務中，作為模型的輸入層或特徵表示。',
},
'Hidden Size': {
  category: 'RNN 超參數',
  definition: 'RNN 中隱藏層的向量維度，決定模型的記憶容量與表達能力。',
  usage: 'Hidden Size 越大，模型越能捕捉複雜序列關係，但也增加過擬合風險。',
},
'梯度截斷（Gradient Clipping）': {
  category: '訓練穩定性',
  definition: '限制梯度的最大值以防止梯度爆炸，常用於 RNN 或深層模型訓練。',
  usage: '可提升訓練穩定性，避免參數更新過大導致模型震盪。',
},
'Head 數': {
  category: 'Transformer 超參數',
  definition: '指多頭注意力機制中的注意力頭數量，每個 head 可獨立捕捉不同語意關係。',
  usage: 'Head 數越多，模型能同時關注多種語意特徵，但也增加計算成本。',
},
'Embedding Size': {
  category: 'Transformer 超參數',
  definition: '表示每個詞或位置的向量維度，決定語意表示的精細程度。',
  usage: 'Embedding Size 越大，模型表達能力越強，但也可能導致過擬合或資源消耗增加。',
},
'Layer Depth': {
  category: '模型架構',
  definition: '指 Transformer 中堆疊的編碼器或解碼器層數，影響模型的抽象能力與訓練難度。',
  usage: '深層模型能擬合複雜語意，但需搭配正則化與初始化策略以穩定訓練。',
},
'學習率調度策略': {
  category: '訓練策略',
  definition: '根據訓練進度動態調整學習率的策略，常見有 Step Decay、Cosine Annealing、Warmup 等。',
  usage: '可提升收斂速度並避免震盪，特別適用於 Transformer 等大型模型訓練。',
},
'注意力權重（Attention Weights）': {
  category: '注意力機制',
  definition: '注意力權重是由 Query 與 Key 計算出的相似度分數，代表模型在每個位置上應關注的程度。',
  usage: '在 Self-Attention 中，這些權重用來加權 Value 向量，形成語意對齊後的輸出表示。',
},
'位置編碼（Positional Encoding）': {
  category: 'Transformer 結構',
  definition: '位置編碼是為了讓 Transformer 模型能夠識別序列中詞彙的順序資訊，通常使用正弦與餘弦函數生成。',
  usage: '將位置編碼與詞嵌入相加，提供序列的位置信息給模型。',
  formula: 'PE(pos, 2i) = sin(pos / 10000^(2i/d_model))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))',
},
'全連接層（Dense Layer）': {
  category: '模型結構',
  definition: '每個神經元與前一層所有神經元相連，常用於 MLP 的隱藏層與輸出層。',
  usage: '適用於表格資料與回歸任務，表達能力強但參數量大。',
},
'Self-Attention': {
  category: '注意力機制',
  definition: '讓每個位置的輸入向量根據其他位置的語意關係進行加權，捕捉全局依賴。',
  usage: 'Transformer 的核心機制，適用於 NLP、語音與圖像生成任務。',
},
'卷積層（Convolution）': {
  category: 'CNN 結構',
  definition: '卷積層透過滑動的卷積核（Filter）在輸入資料上提取局部特徵，是 CNN 的核心運算單元。',
  usage: '常用於圖像、語音等空間結構資料中，能有效捕捉位置不變的特徵模式。',
},
'時間序列': {
  category: '資料型態',
  definition: '時間序列是依時間順序排列的資料點，具有時間依賴性與順序性。',
  usage: '常見於金融、氣象、語音、文字等領域，需使用具記憶性的模型如 RNN 或 Transformer 處理。',
},
'時間步展開層': {
  category: 'RNN 結構',
  definition: '將序列資料依時間步展開，使每個時間點的輸入可依序進入 RNN 模型進行處理。',
  usage: '是 RNN 模型中實現時間依賴的關鍵步驟，搭配隱藏狀態層形成序列記憶機制。',
},
'隱藏狀態層': {
  category: 'RNN 結構',
  definition: '儲存並更新模型在每個時間步的內部狀態，捕捉序列中的上下文資訊。',
  usage: '隱藏狀態會在時間步間傳遞，形成模型的記憶能力，是 RNN 的核心特徵之一。',
},
'批次大小（Batch Size）': {
    category: '超參數',
    definition: '每次訓練中使用的樣本數量，影響梯度估計的穩定性與計算效率。',
    usage: '較大批次可提升計算效率，但可能降低泛化能力；較小批次則有助於模型泛化。',
},
'輸入嵌入層': {
  category: 'Transformer 結構',
  definition: '將離散的詞或位置編碼轉換為連續向量表示，是 Transformer 的輸入起點。',
  usage: '結合詞嵌入與位置編碼，建立語意與順序的初始表示，供後續注意力機制處理。',
},
'多頭注意力層': {
  category: 'Transformer 結構',
  definition: '由多個獨立的 Self-Attention 子層組成，每個 head 可捕捉不同語意關係。',
  usage: '透過並行注意力機制提升模型的語意表達能力與上下文理解深度。',
},
'前饋層': {
  category: 'Transformer 結構',
  definition: '在每個編碼器或解碼器中，用於非線性轉換與特徵擴展的全連接層組合。',
  usage: '通常包含兩層 Dense Layer 與激活函數（如 ReLU 或 GELU），提升模型表達能力。',
},
'Transformer': {
  category: '模型架構',
  definition: '基於注意力機制的深度學習架構，完全移除循環與卷積結構，專注於語意對齊與全局依賴建模。',
  usage: '廣泛應用於 NLP、語音、圖像生成等領域，代表性模型包括 BERT、GPT、ViT 等。',
},
'MLP（多層感知器）': {
  category: '模型架構',
  definition: '多層感知器是由多層全連接層組成的前饋神經網路，適用於表格資料與簡單任務。',
  usage: '結構簡單但表達能力有限，常用於基線模型或小型資料集。',
},
'RNN（循環神經網路）': {
  category: '模型架構',
  definition: '循環神經網路能處理序列資料，透過隱藏狀態捕捉時間依賴性。',
    usage: '適用於語音、文字等序列任務，但易受梯度消失與爆炸影響。',
},
'CNN（卷積神經網路）': {
  category: '模型架構',
  definition: '卷積神經網路透過卷積層提取局部特徵，常用於圖像與語音處理。',
  usage: '能有效捕捉空間結構資訊，適用於圖像分類、物體檢測等任務。',
},
'正規化視覺化': {
  category: '模組導覽',
  definition: '透過激活值分布與損失曲線模擬，展示不同正規化技術對訓練穩定性的影響。',
  usage: '可搭配梯度模擬與優化器模組使用，建立完整的訓練理解框架。',
},
'過擬合（Overfitting）': {
  category: '模型效能',
  definition: '過擬合是指模型在訓練資料上表現良好，但在驗證或測試資料上表現不佳，無法有效泛化。',
  usage: '常見於模型過於複雜或訓練過久的情況，可透過 Dropout、L2 正則化、EarlyStopping 等策略改善。',
},
'模型訓練流程': {
  category: '模組導覽',
  definition: '以動畫方式展示深度學習模型的訓練流程，包括前向傳播、損失計算、反向傳播、參數更新與迭代評估。',
  usage: '幫助學員理解每個步驟的角色與公式，建立訓練邏輯的整體概念。',
},
'評估（Evaluation）': {
  category: '訓練流程',
  definition: '在訓練過程中使用驗證集或測試集來衡量模型效能，判斷是否需要調整架構或停止訓練。',
  usage: '常用指標包括 Accuracy、Precision、Recall、F1-score（分類任務）與 MSE、MAE、R²（回歸任務），可搭配 EarlyStopping 使用。',
},
'交叉熵（Cross Entropy）': {
    category: '損失函數',
    definition: '交叉熵衡量預測機率分布與真實分布之間的差異，適用於分類任務。',
    usage: '常用於多類別分類，搭配 Softmax 激活函數。',
    formula: 'Loss = -∑ y log(ŷ)',
},
'凍結底層': {
  category: '微調策略',
  definition: '保留預訓練模型的底層參數不更新，只訓練上層分類器或任務特定模組。',
  usage: '可降低訓練成本並保留通用特徵，適用於資料量較少的情境。',
},
'只訓練分類頭': {
  category: '微調策略',
  definition: '僅更新模型的最後幾層或分類頭，其他層保持不變。',
  usage: '適用於快速適應新任務，減少過擬合風險。',
},
'全模型微調': {
  category: '微調策略',
  definition: '對預訓練模型的所有參數進行再訓練，全面調整模型以適應新任務。',
  usage: '適用於資料量充足且新任務與預訓練任務差異較大的情境。',
},
'資料量（Data Size）': {
  category: '資料特性',
  definition: '指用於微調的訓練資料集大小，影響模型學習深度與泛化能力。',
  usage: '資料越多，模型越能充分學習任務特徵，但也需更高的計算資源。',
},
'資料相似度（Data Similarity）': {
  category: '資料特性',
  definition: '指微調資料與預訓練資料在內容與分布上的相似程度。',
  usage: '相似度高可減少微調難度，提升模型效能；相似度低則需更多調整與正則化。',
},
'語音辨識（ASR）': {
  category: '模型應用',
  definition: '將語音訊號轉換為文字的技術，常用於語音助理與字幕生成。',
},
'語者識別（Speaker Recognition）': {
    category: '模型應用',
    definition: '辨識說話者身份的技術，應用於安全驗證與個人化服務。',
},
'語音合成（TTS）': {
    category: '模型應用',   
    definition: '將文字轉換為自然語音的技術，應用於語音助理與有聲書。',
},
'情感分析（Sentiment Analysis）': {
    category: '模型應用',
    definition: '分析文本中情感傾向的技術，應用於市場調查與社群監控。',
},
'文本分類（Text Classification）': {
    category: '模型應用',
    definition: '將文本分配到預定類別的技術，應用於垃圾郵件過濾與新聞分類。',
},
'命名實體識別（NER）': {
    category: '模型應用',
    definition: '識別文本中具特定意義的實體（如人名、地名）的技術，應用於資訊抽取與問答系統。',
},
'機器翻譯（Machine Translation）': {
    category: '模型應用',
    definition: '將文本從一種語言轉換為另一種語言的技術，應用於跨語言溝通與內容本地化。',
},
'分類頭（Classification Head）': {
  category: '模型結構',
  definition: '預訓練模型最上層的任務特定模組，通常為一層或多層全連接層，用於輸出分類結果。',
  usage: '在遷移學習中常單獨訓練分類頭以快速適應新任務。',
},
'ResNet': {
  category: '模型架構',
  definition: 'ResNet 是一種基於殘差連接的卷積神經網路，能有效訓練深層模型並避免梯度消失。',
  usage: '常用於圖像分類任務，具備穩定性與高效能。',
},

'BERT': {
  category: '模型架構',
  definition: 'BERT 是基於 Transformer 的雙向語言模型，能理解上下文語意，適用於多種 NLP 任務。',
  usage: '廣泛應用於文字分類、問答系統、命名實體識別等。',
},

'Wav2Vec': {
  category: '模型架構',
  definition: 'Wav2Vec 是用於語音任務的預訓練模型，能將語音訊號轉換為語意向量。',
  usage: '適用於語音辨識、語者識別與語音理解任務。',
},

'ViT': {
  category: '模型架構',
  definition: 'ViT（Vision Transformer）是將圖像切片後以 Transformer 處理的架構，能捕捉全局視覺特徵。',
  usage: '適用於高解析度圖像分類與生成任務，具備強大語意建模能力。',
},
'GPT': {
  category: '模型架構',
  definition: 'GPT 是基於 Transformer 的生成式語言模型，專注於文本生成與續寫任務。',
  usage: '廣泛應用於對話系統、內容生成與文本補全等。',
},
'小型資料集': {
  category: '資料特性',
  definition: '資料量有限，模型無法充分學習任務特徵，需依賴預訓練模型的通用表示。',
  usage: '建議凍結底層或只訓練分類頭，以降低過擬合風險並穩定訓練。',
},
'中型資料集': {
  category: '資料特性',
  definition: '資料量適中，模型可學習部分任務特徵，具備一定的泛化能力。',
  usage: '可進行部分微調，平衡效能與穩定性，適合凍結底層或微調上層模組。',
},
'大型資料集': {
  category: '資料特性',
  definition: '資料量充足，模型可深入學習任務特徵並建立強表達能力。',
  usage: '適合全部微調，可充分發揮預訓練模型潛力，但需較高的計算資源與訓練時間。',
},
'高相似度資料': {
  category: '資料特性',
  definition: '微調資料與預訓練資料在內容與分布上高度相似，模型適應新任務較為容易。',
    usage: '可選擇凍結底層或只訓練分類頭，快速適應新任務並保持穩定性。',
},
'中等相似度資料': {
  category: '資料特性',
    definition: '微調資料與預訓練資料在某些方面相似，但仍存在差異，模型需進行一定調整。',
    usage: '建議進行部分微調，調整模型以適應新任務特徵。',
},
'低相似度資料': {
  category: '資料特性',
  definition: '微調資料與預訓練資料在內容與分布上差異較大，模型需全面調整以適應新任務。',
  usage: '適合全部微調，充分調整模型參數以捕捉新任務特徵，但需注意過擬合風險。',
},
'全部微調': {
  category: '微調策略',
  definition: '對整個預訓練模型進行再訓練，包含底層與上層參數，以全面適應新任務。',
  usage: '適用於資料量充足且任務與預訓練模型差異較大的情境，可獲得最佳效能但訓練成本較高。',
},
'部分微調': {
  category: '微調策略',
  definition: '僅更新模型的部分層或模組，通常為中上層，以平衡效能與訓練穩定性。',
  usage: '適用於資料量中等且任務與預訓練模型有一定相似度的情境，能有效提升效能並降低過擬合風險。',
},
'TrueBackpropSimulator': {
    category: '模擬器',
    definition: '一個模擬真實神經網路反向傳播過程的工具，用於視覺化梯度如何在不同層中流動。',
    usage: '幫助理解梯度消失、梯度爆炸等問題，並觀察不同激活函數和初始化方法對梯度穩定性的影響。',
  },
  'Backpropagation': {
    category: '演算法',
    definition: '一種用於訓練多層神經網路的演算法。它利用微積分的連鎖法則，從輸出層開始將誤差梯度反向傳播回每一層，以更新網路中的所有權重。',
    usage: '是訓練絕大多數深度神經網路的基礎演算法。',
    formula: '∇W = δ ⋅ A', // 簡化表示，W為權重，δ為誤差，A為輸入
  },
  'Gradient Vanishing': {
    category: '問題',
    definition: '當梯度在反向傳播過程中通過多層網路時，其值變得越來越小，最終趨近於零，導致靠近輸入層的權重幾乎無法更新。',
    usage: '使用 ReLU 激活函數、殘差網路（ResNet）或 Batch Normalization 等技術可以緩解此問題。',
  },
  'Gradient Exploding': {
    category: '問題',
    definition: '當梯度在反向傳播過程中呈指數級增長，變得異常大，導致模型權重更新幅度過大，使訓練過程變得不穩定。',
    usage: '通常透過梯度裁剪（Gradient Clipping）來解決。',
  },
};


const DeepLearningGlossary = ({ selected }) => {
  // 支援單一詞彙或陣列
  const keys = Array.isArray(selected) ? selected : [selected];

  return (
    <div className="space-y-4">
      {keys.map((key) => {
        const term = glossary[key] || null;

        if (!term) {
          return (
            <div key={key} className="text-sm text-gray-500">
              尚未定義詞彙：<strong>{key}</strong>
            </div>
          );
        }

        return (
          <div key={key} className="text-sm text-gray-700 bg-gray-50 p-4 rounded border">
            <p className="text-base font-semibold mb-2">📘 詞彙：{key}</p>
            <p><strong>分類：</strong>{term.category}</p>
            <p className="mt-1"><strong>定義：</strong>{term.definition}</p>
            <p className="mt-1"><strong>用途：</strong>{term.usage}</p>
            {term.formula && (
              <p className="mt-1 font-mono bg-white p-2 rounded border text-blue-700">
                {term.formula}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};



export default DeepLearningGlossary;