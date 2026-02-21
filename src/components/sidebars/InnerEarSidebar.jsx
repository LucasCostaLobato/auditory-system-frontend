import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './InnerEarSidebar.css';

const InnerEarSidebar = ({ onViewEnvelope, onViewTravellingWaves, onHold, onClear, hasCurrentData, hasHeldData, isOpen, onClose }) => {
  const { t } = useLanguage();

  // Estado local para frequência do estímulo
  const [freqStimulus, setFreqStimulus] = useState(1000);

  // Handler para Ver envelope do deslocamento
  const handleViewEnvelope = () => {
    const params = {
      freqStimulus: parseFloat(freqStimulus)
    };
    onViewEnvelope(params);
    onClose?.();
  };

  // Handler para Ver ondas viajantes
  const handleViewTravellingWaves = () => {
    const params = {
      freqStimulus: parseFloat(freqStimulus)
    };
    onViewTravellingWaves(params);
    onClose?.();
  };

  return (
    <div className={`inner-ear-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="page-sidebar-close">
        <button className="page-sidebar-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>

      {/* Seção: Deslocamento da membrana basilar */}
      <div className="inner-ear-section">
        <h4 className="section-title">{t('innerEar.bmDisplacementSection')}</h4>

        <label className="inner-ear-label">{t('innerEar.stimulusFrequency')}</label>
        <input
          type="number"
          className="inner-ear-input"
          value={freqStimulus}
          onChange={(e) => setFreqStimulus(e.target.value)}
          min="20"
          max="20000"
          step="1"
        />
        <span className="input-unit">Hz</span>

        <div className="button-group">
          <button
            className="inner-ear-button"
            onClick={handleViewTravellingWaves}
          >
            {t('innerEar.viewTravellingWaves')}
          </button>

          <button
            className="inner-ear-button"
            onClick={handleViewEnvelope}
          >
            {t('innerEar.viewEnvelope')}
          </button>
        </div>

        <div className="button-group hold-buttons">
          <button
            className="inner-ear-button hold-button"
            onClick={onHold}
            disabled={!hasCurrentData}
          >
            {t('innerEar.holdCurve')}
          </button>

          <button
            className="inner-ear-button clear-button"
            onClick={onClear}
            disabled={!hasHeldData}
          >
            {t('innerEar.clearHeld')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InnerEarSidebar;
