import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, X } from 'lucide-react';
import './FundamentalsSidebar.css';

const FundamentalsSidebar = ({ onViewSignal }) => {
  const { t } = useLanguage();

  const [sineWaves, setSineWaves] = useState([
    { amplitude: 1, frequency: 10, phase: 0 }
  ]);

  const handleAddWave = () => {
    setSineWaves(prev => [...prev, { amplitude: 1, frequency: 10, phase: 0 }]);
  };

  const handleRemoveWave = (index) => {
    setSineWaves(prev => prev.filter((_, i) => i !== index));
  };

  const handleWaveChange = (index, field, value) => {
    setSineWaves(prev => prev.map((wave, i) =>
      i === index ? { ...wave, [field]: value } : wave
    ));
  };

  const handleViewSignal = () => {
    const params = {
      amplitudes: sineWaves.map(w => parseFloat(w.amplitude)),
      frequencies: sineWaves.map(w => parseFloat(w.frequency)),
      phases: sineWaves.map(w => parseFloat(w.phase))
    };
    onViewSignal(params);
  };

  return (
    <div className="fundamentals-sidebar">
      {/* Seção: Acústica */}
      <div className="fundamentals-section">
        <h3 className="section-title">{t('fundamentals.acousticsSection')}</h3>

        <h4 className="subsection-title">{t('fundamentals.sineWaveSubsection')}</h4>

        {sineWaves.map((wave, index) => (
          <div key={index} className="sine-wave-row">
            <div className="sine-wave-header">
              <span className="wave-label">{t('fundamentals.wave')} {index + 1}</span>
              {sineWaves.length > 1 && (
                <button
                  className="remove-wave-button"
                  onClick={() => handleRemoveWave(index)}
                  title={t('fundamentals.removeWave')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="sine-wave-fields">
              <div className="field-group">
                <label className="field-label">{t('fundamentals.amplitude')}</label>
                <input
                  type="number"
                  className="field-input"
                  value={wave.amplitude}
                  onChange={(e) => handleWaveChange(index, 'amplitude', e.target.value)}
                  step="0.1"
                />
              </div>

              <div className="field-group">
                <label className="field-label">{t('fundamentals.frequency')}</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    className="field-input"
                    value={wave.frequency}
                    onChange={(e) => handleWaveChange(index, 'frequency', e.target.value)}
                    step="1"
                    min="1"
                  />
                  <span className="input-unit">Hz</span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">{t('fundamentals.phase')}</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    className="field-input"
                    value={wave.phase}
                    onChange={(e) => handleWaveChange(index, 'phase', e.target.value)}
                    step="0.1"
                  />
                  <span className="input-unit">deg</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          className="add-wave-button"
          onClick={handleAddWave}
          title={t('fundamentals.addWave')}
        >
          <Plus size={18} />
          {t('fundamentals.addWave')}
        </button>

        <div className="button-group">
          <button
            className="fundamentals-button"
            onClick={handleViewSignal}
          >
            {t('fundamentals.viewSignal')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundamentalsSidebar;
