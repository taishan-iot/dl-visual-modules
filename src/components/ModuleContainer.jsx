// src/components/ModuleContainer.jsx
import React from 'react';
import DataSplitModule from './DataSplitModule';
import DataTypeModule from './DataTypeModule';
import MissingValueModule from './MissingValueModule';
import ImbalanceModule from './ImbalanceModule';
import OutlierModule from './OutlierModule';
import FeatureImportanceModule from './FeatureImportanceModule';


// 其他模組稍後加入

const ModuleContainer = () => (
  <div className="space-y-10">
    <section id="module-0">
      <DataSplitModule />
    </section>
    <section id="module-1">
        <DataTypeModule />
    </section>
    <section id="module-2">
        <MissingValueModule />
    </section>
    <section id="module-3">
        <ImbalanceModule />
    </section>
    <section id="module-4">
        <OutlierModule />
    </section>
    <section id="module-5">
        <FeatureImportanceModule />
    </section>

    {/* 後續模組依序加入 */}
  </div>
);




export default ModuleContainer;