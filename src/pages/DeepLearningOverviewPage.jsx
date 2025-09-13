// src/pages/DeepLearningOverviewPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// 深度學習模組匯入（來自 components/DL）
import DeepLearningIntro from '../components/DL/DeepLearningIntro';
import ModelStructureExplorer from '../components/DL/ModelStructureExplorer';
import ModelParameterExplorer from '../components/DL/ModelParameterExplorer';
import ActivationFunctionExplorer from '../components/DL/ActivationFunctionExplorer';
import GradientFlowSimulator from '../components/DL/GradientFlowSimulator';
import LossOptimizerSimulator from '../components/DL/LossOptimizerSimulator';
import OverfittingControlPanel from '../components/DL/OverfittingControlPanel';
import NormalizationVisualizer from '../components/DL/NormalizationVisualizer';
import TrainingFlowVisualizer from '../components/DL/TrainingFlowVisualizer';
import ApplicationMap from '../components/DL/ApplicationMap';
import DatasetSelector from '../components/DL/DatasetSelector';
import TransferLearningPanel from '../components/DL/TransferLearningPanel';
import ArchitectureTimeline from '../components/DL/ArchitectureTimeline';
import AttentionMechanismExplorer from '../components/DL/AttentionMechanismExplorer';
import DeepLearningGlossary from '../components/DL/DeepLearningGlossary';
import EthicsAndBiasPanel from '../components/DL/EthicsAndBiasPanel';
import LearningFlowNavigator from '../components/DL/LearningFlowNavigator';
import ModelEvaluationPanel from '../components/DL/ModelEvaluationPanel';
import TrueBackpropSimulator from '../components/DL/TrueBackpropSimulator';

const DeepLearningOverviewPage = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* 主要內容容器，設定置中並增加左右邊距 */}
      <div className="container mx-auto px-6 lg:px-20 space-y-16">
        
        {/* 頁面標題 */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">🧠 深度學習互動導論</h1>

        {/* 導覽列 */}
        <nav className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-sm"
          >
            ➤ 回到資料前處理教學分頁
          </Link>
          <Link
            to="/feature-engineering"
            className="text-blue-600 hover:underline text-sm"
          >
            ➤ 前往特徵工程教學分頁
          </Link>
        </nav>

        {/* 教學流程導覽 */}
        <LearningFlowNavigator />
        <hr className="border-t-2 border-gray-200" />

        {/* 概念與結構模組 */}
        <DeepLearningIntro />
        <hr className="border-t-2 border-gray-200" />
        <ModelStructureExplorer />
        <hr className="border-t-2 border-gray-200" />
        <ModelParameterExplorer />
        <hr className="border-t-2 border-gray-200" />
        <ActivationFunctionExplorer />
        <hr className="border-t-2 border-gray-200" />
        <GradientFlowSimulator />
        <hr className="border-t-2 border-gray-200" />
        <TrueBackpropSimulator />
        <hr className="border-t-2 border-gray-200" />

        {/* 訓練與優化模組 */}
        <LossOptimizerSimulator />
        <hr className="border-t-2 border-gray-200" />
        <OverfittingControlPanel />
        <hr className="border-t-2 border-gray-200" />
        <NormalizationVisualizer />
        <hr className="border-t-2 border-gray-200" />
        <TrainingFlowVisualizer />
        <hr className="border-t-2 border-gray-200" />

        {/* 應用與策略模組 */}
        <ApplicationMap />
        <hr className="border-t-2 border-gray-200" />
        <DatasetSelector />
        <hr className="border-t-2 border-gray-200" />
        <TransferLearningPanel />
        <hr className="border-t-2 border-gray-200" />
        <ArchitectureTimeline />
        <hr className="border-t-2 border-gray-200" />
        <AttentionMechanismExplorer />
        <hr className="border-t-2 border-gray-200" />

        {/* 詞彙與補充模組 */}
        <DeepLearningGlossary />
        <hr className="border-t-2 border-gray-200" />
        <EthicsAndBiasPanel />
        <hr className="border-t-2 border-gray-200" />
        <ModelEvaluationPanel task="classification" />
      </div>
    </div>
  );
};

export default DeepLearningOverviewPage;