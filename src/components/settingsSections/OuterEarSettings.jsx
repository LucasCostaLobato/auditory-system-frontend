import React from 'react';

export default function OuterEarSettings({ settings, handleInputChange, onSettingsChange, onClose }) {
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