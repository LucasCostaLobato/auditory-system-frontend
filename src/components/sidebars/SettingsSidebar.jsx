import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import './SettingsSidebar.css';

const SettingsSidebar = ({ onViewSpectrum, isOpen, onClose }) => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useSettings();

  const [signalType, setSignalType] = useState(settings.signalType);
  const [startFrequency, setStartFrequency] = useState(settings.startFrequency);
  const [endFrequency, setEndFrequency] = useState(settings.endFrequency);
  const [frequencyPoints, setFrequencyPoints] = useState(settings.frequencyPoints);

  // Update local state when context changes
  useEffect(() => {
    setSignalType(settings.signalType);
    setStartFrequency(settings.startFrequency);
    setEndFrequency(settings.endFrequency);
    setFrequencyPoints(settings.frequencyPoints);
  }, [settings]);

  const handleViewSpectrum = () => {
    const params = {
      signalType,
      startFrequency: parseFloat(startFrequency),
      endFrequency: parseFloat(endFrequency),
      frequencyPoints: parseInt(frequencyPoints)
    };

    // Save to context for persistence
    updateSettings(params);

    onViewSpectrum(params);
    onClose?.();
  };

  return (
    <div className={`settings-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="page-sidebar-close">
        <button className="page-sidebar-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>

      <div className="settings-section">
        <label className="settings-label">{t('settings.signalType')}</label>
        <select
          className="settings-select"
          value={signalType}
          onChange={(e) => setSignalType(e.target.value)}
        >
          <option value="white_noise">{t('settings.whiteNoise')}</option>
          <option value="speech">{t('settings.speechSignal')}</option>
          <option value="clarinet">{t('settings.clarinet')}</option>
        </select>
      </div>

      <div className="settings-section">
        <h3 className="settings-subtitle">{t('settings.frequencyRange')}</h3>

        <label className="settings-label">{t('settings.startFrequency')}</label>
        <input
          type="number"
          className="settings-input"
          value={startFrequency}
          onChange={(e) => setStartFrequency(e.target.value)}
          placeholder="Hz"
        />

        <label className="settings-label">{t('settings.endFrequency')}</label>
        <input
          type="number"
          className="settings-input"
          value={endFrequency}
          onChange={(e) => setEndFrequency(e.target.value)}
          placeholder="Hz"
        />

        <label className="settings-label">{t('settings.frequencyPoints')}</label>
        <input
          type="number"
          className="settings-input"
          value={frequencyPoints}
          onChange={(e) => setFrequencyPoints(e.target.value)}
        />
      </div>

      <button
        className="view-spectrum-button"
        onClick={handleViewSpectrum}
      >
        {t('settings.viewSpectrum')}
      </button>
    </div>
  );
};

export default SettingsSidebar;
