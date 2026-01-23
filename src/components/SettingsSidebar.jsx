import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './SettingsSidebar.css';

const SettingsSidebar = ({ onViewSpectrum }) => {
  const { t } = useLanguage();

  const [signalType, setSignalType] = useState('white_noise');
  const [startFrequency, setStartFrequency] = useState('');
  const [endFrequency, setEndFrequency] = useState('');
  const [frequencyPoints, setFrequencyPoints] = useState('');

  const handleViewSpectrum = () => {
    const params = {
      signalType,
      startFrequency: parseFloat(startFrequency),
      endFrequency: parseFloat(endFrequency),
      frequencyPoints: parseInt(frequencyPoints)
    };
    onViewSpectrum(params);
  };

  return (
    <div className="settings-sidebar">
      <div className="settings-section">
        <label className="settings-label">{t('settings.signalType')}</label>
        <select
          className="settings-select"
          value={signalType}
          onChange={(e) => setSignalType(e.target.value)}
        >
          <option value="white_noise">{t('settings.whiteNoise')}</option>
          <option value="speech_signal">{t('settings.speechSignal')}</option>
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
