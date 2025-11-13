import React from 'react';
import { getFrequencyDomainAnalysis } from '../../services/api';

export default function OuterEarSettings({ settings, handleInputChange, onSettingsChange, onClose, onAnalysisAction, generalSettings }) {
  // Estado local para armazenar o texto de frequências enquanto usuário digita
  const [freqsInputText, setFreqsInputText] = React.useState(() => {
    // Inicializar com o valor atual (se existir)
    if (settings.freqsToAnalyze && Array.isArray(settings.freqsToAnalyze)) {
      return settings.freqsToAnalyze.join(', ');
    }
    return '';
  });

  // Estado local para armazenar o texto de posições enquanto usuário digita
  const [positionsInputText, setPositionsInputText] = React.useState(() => {
    // Inicializar com o valor atual (se existir)
    if (settings.positionsToAnalyze && Array.isArray(settings.positionsToAnalyze)) {
      return settings.positionsToAnalyze.join(', ');
    }
    return '';
  });

  // Atualizar o texto quando o usuário digita
  const handleFreqsTextChange = (e) => {
    const text = e.target.value;
    setFreqsInputText(text);  // Atualiza o texto visível
  };

  // Converter para array quando perder o foco (onBlur)
  const handleFreqsBlur = () => {
    const stringArray = freqsInputText.split(',').map(s => s.trim());
    const floatArray = stringArray
      .filter(s => s !== '')
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
    
    // Atualiza o estado principal
    onSettingsChange({
      ...settings,
      freqsToAnalyze: floatArray
    });
  };

  // Converter também ao pressionar Enter
  const handleFreqsKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFreqsBlur();
    }
  };

  // Handlers para posições (similar ao de frequências)
  const handlePositionsTextChange = (e) => {
    const text = e.target.value;
    setPositionsInputText(text);
  };

  const handlePositionsBlur = () => {
    const stringArray = positionsInputText.split(',').map(s => s.trim());
    const floatArray = stringArray
      .filter(s => s !== '')
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));

    onSettingsChange({
      ...settings,
      positionsToAnalyze: floatArray
    });
  };

  const handlePositionsKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePositionsBlur();
    }
  };

  return (
    <>
      <div className="settings-field">
        <label htmlFor="earCanalLength">Comprimento do canal auditivo, em mm</label>
        <input
          type="number"
          id="earCanalLength"
          value={settings.earCanalLength}
          onChange={(e) => handleInputChange('earCanalLength', Number(e.target.value))}
        />
      </div>

      <div className="settings-section">
        <h3>Análise no domínio espacial</h3>

        <div className="settings-field">
          <label htmlFor="freqsToAnalyze">Lista de frequências para analisar, em Hz</label>
          <input
            type="text"
            id="freqsToAnalyze"
            value={freqsInputText}
            onChange={handleFreqsTextChange}
            onBlur={handleFreqsBlur}
            onKeyPress={handleFreqsKeyPress}
            placeholder="Ex: 250, 500, 1000, 2000, 4000"
          />
        </div>

        <button className="btn-primary" onClick={onClose}>
          Executar análise no domínio do espaço
        </button>

        {/* EXAMPLE: How to add a button that uses inputSignal from General Settings:

        import { getSpatialAnalysis } from '../../services/api';  // Add at top of file

        <button
          className="btn-primary"
          onClick={() => onAnalysisAction(
            'spatialAnalysis',              // Unique key
            getSpatialAnalysis,             // API function (create in api.jsx)
            {
              ...settings,                  // Includes earCanalLength, freqsToAnalyze
              inputSignal: generalSettings.inputSignal  // Access from General Settings
            },
            { title: 'Análise Espacial', color: '#8b5cf6' }
          )}
        >
          Executar análise espacial
        </button>
        */}
      </div>

      <div className="settings-section">
        <h3>Análise no domínio da frequência</h3>

        <div className="settings-field">
          <label htmlFor="positionsToAnalyze">Lista de posições para analisar, em mm</label>
          <input
            type="text"
            id="positionsToAnalyze"
            value={positionsInputText}
            onChange={handlePositionsTextChange}
            onBlur={handlePositionsBlur}
            onKeyPress={handlePositionsKeyPress}
            placeholder="Ex: 0, 5, 10, 15, 20, 25"
          />
        </div>

        <button
          className="btn-primary"
          onClick={() => onAnalysisAction(
            'frequencyDomainAnalysis',
            getFrequencyDomainAnalysis,
            {
              ...settings,
              frequencyMin: generalSettings.frequencyMin,
              frequencyMax: generalSettings.frequencyMax,
              numberOfFrequencies: generalSettings.numberOfFrequencies,
              inputSignal: generalSettings.inputSignal
            },
            { title: 'Análise no domínio da frequência', color: '#10b981' }
          )}
        >
          Executar análise no domínio da frequência
        </button>
      </div>
    </>
  );
};