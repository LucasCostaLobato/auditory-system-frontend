import React from 'react';

export default function MiddleEarSettings({ settings, handleInputChange }) {
  return (
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
}
