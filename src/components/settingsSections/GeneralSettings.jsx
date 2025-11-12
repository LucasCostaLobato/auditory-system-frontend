import React from 'react';
import { getInputSignal } from '../../services/api';

export default function GeneralSettings({ settings, handleInputChange, onClose, onAnalysisAction }) {

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
            <option value="narrowBandSignalLowFreq">Sinal de banda estreita (baixa frequência)</option>
            <option value="narrowBandSignalMidFreq">Sinal de banda estreita (média frequência)</option>
            <option value="narrowBandSignalHighFreq">Sinal de banda estreita (alta frequência)</option>

            
          </select>
        </div>

        <button
          className="btn-primary"
          onClick={() => onAnalysisAction(
            'inputSpectrum',              // Unique key for this analysis result
            getInputSignal,                // API function to call
            settings,                      // Parameters to pass to the API
            { title: 'Espectro de magnitude do sinal de entrada', color: '#3b82f6' }  // Chart config
          )}
        >
          Ver espectro
        </button>

        {/* EXAMPLE: How to add more buttons - just follow the same pattern:

        <button
          className="btn-primary"
          onClick={() => onAnalysisAction(
            'outputSpectrum',             // Different unique key
            getOutputSignal,              // Different API function (add to api.jsx first)
            settings,                     // Same or different parameters
            { title: 'Espectro de saída', color: '#ef4444' }  // Different title/color
          )}
        >
          Ver espectro de saída
        </button>

        <button
          className="btn-secondary"
          onClick={() => onAnalysisAction(
            'phaseResponse',
            getPhaseResponse,
            settings,
            { title: 'Resposta de fase', color: '#10b981' }
          )}
        >
          Ver resposta de fase
        </button>
        */}
      </div>
    </>
  );
}
