import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, X } from 'lucide-react';
import './FundamentalsSidebar.css';

const FundamentalsSidebar = ({ onViewSignal, onViewSpectrum }) => {
  const { t } = useLanguage();

  const [sineWaves, setSineWaves] = useState([
    { amplitude: 1, frequency: 10, phase: 0 }
  ]);

  const [mass, setMass] = useState(1);
  const [stiffness, setStiffness] = useState(1000);
  const [damping, setDamping] = useState(150);

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

  const handleViewSpectrum = () => {
    const params = {
      mass: parseFloat(mass),
      stiffness: parseFloat(stiffness),
      damping: parseFloat(damping)
    };
    onViewSpectrum(params);
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

      {/* Seção: Vibrações */}
      <div className="fundamentals-section">
        <h3 className="section-title">{t('fundamentals.vibrationsSection')}</h3>

        <h4 className="subsection-title">{t('fundamentals.sdofSubsection')}</h4>

        <div className="vibration-fields">
          <div className="field-group">
            <label className="field-label">{t('fundamentals.mass')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                step="0.1"
                min="0.01"
              />
              <span className="input-unit">kg</span>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t('fundamentals.stiffness')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={stiffness}
                onChange={(e) => setStiffness(e.target.value)}
                step="1"
                min="0.01"
              />
              <span className="input-unit">kN/m</span>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t('fundamentals.damping')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={damping}
                onChange={(e) => setDamping(e.target.value)}
                step="0.1"
                min="0"
              />
              <span className="input-unit">Ns/m</span>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            className="fundamentals-button"
            onClick={handleViewSpectrum}
          >
            {t('fundamentals.viewSpectrum')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundamentalsSidebar;
