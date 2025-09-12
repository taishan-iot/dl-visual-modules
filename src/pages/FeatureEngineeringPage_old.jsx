// src/pages/FeatureEngineeringPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import FeatureCreationModule from '../components/FeatureCreationModule';
import CategoryEncodingModule from '../components/CategoryEncodingModule';
import NumericTransformModule from '../components/NumericTransformModule';
import FeatureScalingModule from '../components/FeatureScalingModule';
import FeatureSelectionModule from '../components/FeatureSelectionModule';
import FeatureExtractionModule from '../components/FeatureExtractionModule';
import DimensionalityReductionModule from '../components/DimensionalityReductionModule';
import FeatureInteractionModule from '../components/FeatureInteractionModule';
import FeatureStabilityModule  from '../components/FeatureStabilityModule';
import FeatureImportanceComparer from '../components/FeatureImportanceComparer';
import FeatureStrategyOverview from '../components/FeatureStrategyOverview';

const FeatureEngineeringPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 導覽列 */}
      <nav className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">特徵工程互動教學</h1>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm"
        >
          ➤ 回到資料前處理教學分頁
        </Link>
        <Link
          to="/deep-learning"
          className="text-blue-600 hover:underline text-sm"
        >
          ➤ 前往深度學習教學分頁
        </Link>
      </nav>

      {/* 模組區塊 */}
      <div className="space-y-10">
        <FeatureCreationModule />
        {/* 後續模組可依序加入 */}
        <CategoryEncodingModule />
        <NumericTransformModule />
        <FeatureScalingModule />
        <FeatureSelectionModule />
        <FeatureExtractionModule />
        <DimensionalityReductionModule />
        <FeatureInteractionModule />
        <FeatureStabilityModule />
        <FeatureImportanceComparer />
        <FeatureStrategyOverview />
      </div>
    </div>
  );
};

export default FeatureEngineeringPage;