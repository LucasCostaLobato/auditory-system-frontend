import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import './OuterEarSidebar.css';

const OuterEarSidebar = ({ onGetFRF, onExecuteSpaceDomain, onExecuteFrequencyDomain }) => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useSettings();

  const [canalLength, setCanalLength] = useState(settings.canalLength);
  const [frequencyList, setFrequencyList] = useState(settings.frequencyList);
  const [positionList, setPositionList] = useState(settings.positionList);

  // Update local state when context changes
  useEffect(() => {
    setCanalLength(settings.canalLength);
    setFrequencyList(settings.frequencyList);
    setPositionList(settings.positionList);
  }, [settings]);

  const handleGetFRF = () => {
    const params = {
      canalLength: parseFloat(canalLength)
    };

    // Save to context for persistence
    updateSettings({ canalLength });

    onGetFRF(params);
  };

  const handleExecuteSpaceDomain = () => {
    // Converte string separada por vírgulas em array de floats
    const frequencies = frequencyList
      .split(',')
      .map(f => parseFloat(f.trim()))
      .filter(f => !isNaN(f));

    const params = {
      canalLength: parseFloat(canalLength),
      frequencies
    };

    // Save to context for persistence
    updateSettings({ canalLength, frequencyList });

    onExecuteSpaceDomain(params);
  };

  const handleExecuteFrequencyDomain = () => {
    // Converte string separada por vírgulas em array de floats
    const positions = positionList
      .split(',')
      .map(p => parseFloat(p.trim()))
      .filter(p => !isNaN(p));

    const params = {
      canalLength: parseFloat(canalLength),
      positions
    };

    // Save to context for persistence
    updateSettings({ canalLength, positionList });

    onExecuteFrequencyDomain(params);
  };

  return (
    <div className="outer-ear-sidebar">
      {/* Seção 1: Anatomia do canal auditivo */}
      <div className="outer-ear-section">
        <h3 className="section-title">{t('outerEar.anatomySection')}</h3>

        <label className="outer-ear-label">{t('outerEar.canalLength')}</label>
        <input
          type="number"
          className="outer-ear-input"
          value={canalLength}
          onChange={(e) => setCanalLength(e.target.value)}
          placeholder="mm"
          step="0.1"
        />

        <button
          className="outer-ear-button"
          onClick={handleGetFRF}
          disabled={!canalLength}
        >
          {t('outerEar.getFRF')}
        </button>
      </div>

      {/* Seção 2: Análise no domínio do espaço */}
      <div className="outer-ear-section">
        <h3 className="section-title">{t('outerEar.spaceDomainSection')}</h3>

        <label className="outer-ear-label">{t('outerEar.frequencyList')}</label>
        <input
          type="text"
          className="outer-ear-input"
          value={frequencyList}
          onChange={(e) => setFrequencyList(e.target.value)}
          placeholder="Ex: 100, 500, 1000, 2000"
        />

        <button
          className="outer-ear-button"
          onClick={handleExecuteSpaceDomain}
          disabled={!canalLength || !frequencyList}
        >
          {t('outerEar.executeSpaceDomain')}
        </button>
      </div>

      {/* Seção 3: Análise no domínio da frequência */}
      <div className="outer-ear-section">
        <h3 className="section-title">{t('outerEar.frequencyDomainSection')}</h3>

        <label className="outer-ear-label">{t('outerEar.positionList')}</label>
        <input
          type="text"
          className="outer-ear-input"
          value={positionList}
          onChange={(e) => setPositionList(e.target.value)}
          placeholder="Ex: 0, 5, 10, 15, 20"
        />

        <button
          className="outer-ear-button"
          onClick={handleExecuteFrequencyDomain}
          disabled={!canalLength || !positionList}
        >
          {t('outerEar.executeFrequencyDomain')}
        </button>
      </div>
    </div>
  );
};

export default OuterEarSidebar;
