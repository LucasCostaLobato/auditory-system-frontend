import React from 'react';
import { X } from 'lucide-react';
import '../styles/SettingsPanel.css';

export default function SettingsPanel({ title, onClose, settings, onSettingsChange }) {
  
  // Função para atualizar um campo específico
  const handleInputChange = (fieldName, value) => {
    onSettingsChange({
      ...settings,
      [fieldName]: value
    });
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
        <div className="settings-section">
          <h3>Configurações Básicas</h3>
          
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
        </div>


        <div className="settings-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={onClose}>
            Salvar Configurações
          </button>
        </div>
      </div>
    </aside>
  );
}