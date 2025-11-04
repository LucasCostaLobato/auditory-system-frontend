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
  const renderOuterEarSettings = () => {
    // Estado local para armazenar o texto enquanto usuário digita
    const [freqsInputText, setFreqsInputText] = React.useState(() => {
      // Inicializar com o valor atual (se existir)
      if (settings.freqsToAnalyze && Array.isArray(settings.freqsToAnalyze)) {
        return settings.freqsToAnalyze.join(', ');
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
        </div>
      </>
    );
  };

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