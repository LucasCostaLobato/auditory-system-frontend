import React from 'react';
import { X } from 'lucide-react';
import '../styles/SettingsPanel.css';

import GeneralSettings from './settingsSections/GeneralSettings';
import OuterEarSettings from './settingsSections/OuterEarSettings';
import MiddleEarSettings from './settingsSections/MiddleEarSettings';
import InnerEarSettings from './settingsSections/InnerEarSettings';

export default function SettingsPanel({ title, onClose, settings, onSettingsChange, panelType, onAnalysisAction, analysisResults, generalSettings }) {
  
  // Função para atualizar um campo específico
  const handleInputChange = (fieldName, value) => {
    onSettingsChange({
      ...settings,
      [fieldName]: value
    });
  };

  // ===== SWITCH: DECIDE QUAL COMPONENTE RENDERIZAR =====
  const renderFields = () => {
    switch(panelType) {
      case 'generalSettings':
        return (
          <GeneralSettings
            settings={settings}
            handleInputChange={handleInputChange}
            onClose={onClose}
            onAnalysisAction={onAnalysisAction}
            analysisResults={analysisResults}
          />
        );
      
      case 'outerEarMenu':
        return (
          <OuterEarSettings
            settings={settings}
            handleInputChange={handleInputChange}
            onSettingsChange={onSettingsChange}
            onClose={onClose}
            onAnalysisAction={onAnalysisAction}
            generalSettings={generalSettings}
          />
        );
      
      case 'middleEarMenu':
        return (
          <MiddleEarSettings
            settings={settings}
            handleInputChange={handleInputChange}
            onAnalysisAction={onAnalysisAction}
            generalSettings={generalSettings}
          />
        );
      
      case 'innerEarMenu':
        return (
          <InnerEarSettings
            settings={settings}
            handleInputChange={handleInputChange}
            onAnalysisAction={onAnalysisAction}
            generalSettings={generalSettings}
          />
        );
      
      default:
        return <p>Selecione uma opção do menu</p>;
    }
  };

  return (
    <aside className="settings-panel">
      <div className="settings-header">
        <h2 className="settings-title">{title}</h2>
        <button className="settings-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="settings-content">
        {renderFields()}
      </div>
    </aside>
  );
}