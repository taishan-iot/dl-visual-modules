import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ModuleNavigator from './components/ModuleNavigator';
import ModuleContainer from './components/ModuleContainer';
import Router from './router';

const App = () => {
  return (
    <div>
      <nav className="mb-6 space-x-4">
        <a href="/" className="text-blue-600 hover:underline">資料前處理教學</a>
        <a href="/feature-engineering" className="text-blue-600 hover:underline">特徵工程教學</a>
        <a href="/deep-learning" className="text-blue-600 hover:underline">特徵工程教學</a>
      </nav>
      <Router />
    </div>
  );
};

export default App;