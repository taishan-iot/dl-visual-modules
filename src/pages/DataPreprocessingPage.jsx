// src/pages/DataPreprocessingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import DataSplitModule from '../components/DataSplitModule';
import DataTypeModule from '../components/DataTypeModule';
import MissingValueModule from '../components/MissingValueModule';
import ImbalanceModule from '../components/ImbalanceModule';
import OutlierModule from '../components/OutlierModule';
import FeatureImportanceModule from '../components/FeatureImportanceModule';

const DataPreprocessingPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 導覽列 */}
      <nav className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">資料品質與前處理互動教學</h1>
        <Link
          to="/feature-engineering"
          className="text-blue-600 hover:underline text-sm"
        >
          ➤ 前往特徵工程教學分頁
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
        <DataSplitModule />
        <DataTypeModule />
        <MissingValueModule />
        <ImbalanceModule />
        <OutlierModule />
        <FeatureImportanceModule />
      </div>
    </div>
  );
};

export default DataPreprocessingPage;