import React from 'react';
import { X } from 'lucide-react';
import '../styles/SettingsPanel.css';



export default function SettingsPanel({ title, onClose, settings, onSettingsChange, panelType }) {
  
  // Função para atualizar um campo específico
  const handleInputChange = (fieldName, value) => {
    onSettingsChange({
      ...settings,
      [fieldName]: value
    });
  };


  // Função para converter string em array de floats
  const handleFloatListChange = (fieldName, textValue) => {
    // Remove espaços e divide por vírgula
    const stringArray = textValue.split(',').map(s => s.trim());
    
    // Converte para números (floats)
    const floatArray = stringArray
      .filter(s => s !== '')  // Remove strings vazias
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));  // Remove valores inválidos
    
    // Atualiza o estado
    onSettingsChange({
      ...settings,
      [fieldName]: floatArray
    });
  };

  // Função para converter array de floats em string
  const floatListToString = (array) => {
    if (!array || !Array.isArray(array)) return '';
    return array.join(', ');
  };


  // ===== CONFIGURAÇÕES GERAIS =====
  const renderGeneralSettings = () => (
    <>
      <div className="settings-section">
        <h3>Faixa de frequência de análise</h3>
        
        <div className="settings-field">
          <label htmlFor="frequencyMin">Frequência inicial, em Hz</label>
          <input
            type="number"
            id="frequencyMin"
            value={settings.frequencyMin}
            onChange={(e) => handleInputChange('frequencyMin', e.target.value)}
          />
        </div>
        
        <div className="settings-field">
          <label htmlFor="frequencyMax">Frequência final, em Hz</label>
          <input
            type="number"
            id="frequencyMax"
            value={settings.frequencyMax}
            onChange={(e) => handleInputChange('frequencyMax', e.target.value)}
          />
        </div>
        
        <div className="settings-field">
          <label htmlFor="numberOfFrequencies">Número de frequências a serem calculadas</label>
          <input
            type="number"
            id="numberOfFrequencies"
            value={settings.numberOfFrequencies}
            onChange={(e) => handleInputChange('numberOfFrequencies', e.target.value)}
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>Sinal sonoro de entrada</h3>
        
        <div className="settings-field">
          <label htmlFor="inputSignal">Fonte sonora</label>
          <select
            id="inputSignal"
            value={settings.inputSignal}
            onChange={(e) => handleInputChange('inputSignal', e.target.value)}
          >
            <option value="idealWhiteNoise">Ruído branco ideal</option>
            <option value="speech">Fala</option>
            <option value="music">Musica</option>
          </select>
        </div>

        <button className="btn-primary" onClick={onClose}>
          Ver espectro
        </button>
      </div>

    </>
  );

  // ===== ORELHA EXTERNA =====
  const renderOuterEarSettings = () => (
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
            value={floatListToString(settings.freqsToAnalyze)}
            onChange={(e) => handleFloatListChange('freqsToAnalyze', e.target.value)}
          />
          
        </div>

        <button className="btn-primary" onClick={onClose}>
          Executar análise no domínio do espaço
        </button>
       
      </div>
    </>
  );

  // ===== ORELHA MÉDIA =====
  const renderMiddleEarSettings = () => (
    <>
      <div className="settings-section">
        <h3>Propriedades Mecânicas</h3>
        
        <div className="settings-field">
          <label htmlFor="impedance">Impedância (Ohms)</label>
          <input
            type="number"
            id="impedance"
            value={settings.impedance || 500}
            onChange={(e) => handleInputChange('impedance', Number(e.target.value))}
            min="0"
            max="2000"
          />
        </div>

        <div className="settings-field">
          <label htmlFor="resonanceFreq">Frequência de Ressonância (Hz)</label>
          <input
            type="number"
            id="resonanceFreq"
            value={settings.resonanceFreq || 1000}
            onChange={(e) => handleInputChange('resonanceFreq', Number(e.target.value))}
            min="500"
            max="2000"
          />
        </div>

        <div className="settings-field">
          <label htmlFor="dampingFactor">Fator de Amortecimento: {settings.dampingFactor || 0.5}</label>
          <input
            type="range"
            id="dampingFactor"
            value={settings.dampingFactor || 0.5}
            onChange={(e) => handleInputChange('dampingFactor', Number(e.target.value))}
            min="0"
            max="1"
            step="0.1"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>Simulação</h3>
        
        <div className="settings-field checkbox-field">
          <input
            type="checkbox"
            id="enableSimulation"
            checked={settings.enableSimulation || false}
            onChange={(e) => handleInputChange('enableSimulation', e.target.checked)}
          />
          <label htmlFor="enableSimulation">Habilitar simulação</label>
        </div>
      </div>
    </>
  );

  // ===== ORELHA INTERNA =====
  const renderInnerEarSettings = () => (
    <>
      <div className="settings-section">
        <h3>Em construção...</h3>
        
      </div>

    </>
  );

  // ===== SWITCH: DECIDE QUAL RENDERIZAR BASEADO NO panelType =====
  const renderFields = () => {
    switch(panelType) {
      case 'generalSettings':
        return renderGeneralSettings();
      case 'outerEarMenu':
        return renderOuterEarSettings();
      case 'middleEarMenu':
        return renderMiddleEarSettings();
      case 'innerEarMenu':
        return renderInnerEarSettings();
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
