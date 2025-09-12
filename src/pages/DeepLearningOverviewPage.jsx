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
    <div className="p-6 bg-gray-50 space-y-12">
        {/* 導覽列 */}
      <nav className="mb-6 flex justify-between items-center">
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧠 深度學習互動導論</h1>

      {/* 教學流程導覽 */}
      <LearningFlowNavigator />

      {/* 概念與結構模組 */}
      <DeepLearningIntro />
      <ModelStructureExplorer />
      <ModelParameterExplorer />
      <ActivationFunctionExplorer />
      <GradientFlowSimulator />

      {/* 訓練與優化模組 */}
      <LossOptimizerSimulator />
      <OverfittingControlPanel />
      <NormalizationVisualizer />
      <TrainingFlowVisualizer />

      {/* 應用與策略模組 */}
      <ApplicationMap />
      <DatasetSelector />
      <TransferLearningPanel />
      <ArchitectureTimeline />
      <AttentionMechanismExplorer />

      {/* 詞彙與補充模組 */}
      <DeepLearningGlossary />
      <EthicsAndBiasPanel />
      <ModelEvaluationPanel task="classification" />
        

        <TrueBackpropSimulator />
    </div>
  );
};

export default DeepLearningOverviewPage;