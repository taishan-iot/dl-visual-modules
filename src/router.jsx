// src/router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataPreprocessingPage from './pages/DataPreprocessingPage';
import FeatureEngineeringPage from './pages/FeatureEngineeringPage';
import DeepLearningOverviewPage from './pages/DeepLearningOverviewPage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DataPreprocessingPage />} />
      <Route path="/feature-engineering" element={<FeatureEngineeringPage />} />
      <Route path="/deep-learning" element={<DeepLearningOverviewPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;