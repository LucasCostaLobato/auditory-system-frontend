import React from 'react';

export default function GeneralSettings({ settings, handleInputChange, onClose, onGenerateSpectrum }) {

  return (
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

        <button className="btn-primary" onClick={onGenerateSpectrum}>
          Ver espectro
        </button>
      </div>
    </>
  );
}
