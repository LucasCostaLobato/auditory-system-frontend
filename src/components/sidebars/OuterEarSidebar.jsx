import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import './OuterEarSidebar.css';

const AGE_LENGTHS = {
  infant:     16,
  child:      21,
  adolescent: 25,
  adult:      30
};

const OuterEarSidebar = ({ onGetFRF, onExecuteSpaceDomain, onExecuteFrequencyDomain, isOpen, onClose }) => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useSettings();

  const [ageGroup, setAgeGroup] = useState('adult');
  const [frequencyList, setFrequencyList] = useState(settings.frequencyList);
  const [positionList, setPositionList] = useState(settings.positionList);

  const canalLength = AGE_LENGTHS[ageGroup];

  // Update local state when context changes
  useEffect(() => {
    setFrequencyList(settings.frequencyList);
    setPositionList(settings.positionList);
  }, [settings]);

  const handleGetFRF = () => {
    updateSettings({ canalLength: String(canalLength) });
    onGetFRF({ canalLength });
    onClose?.();
  };

  const handleExecuteSpaceDomain = () => {
    const frequencies = frequencyList
      .split(',')
      .map(f => parseFloat(f.trim()))
      .filter(f => !isNaN(f));

    updateSettings({ canalLength: String(canalLength), frequencyList });
    onExecuteSpaceDomain({ canalLength, frequencies });
    onClose?.();
  };

  const handleExecuteFrequencyDomain = () => {
    const positions = positionList
      .split(',')
      .map(p => parseFloat(p.trim()))
      .filter(p => !isNaN(p));

    updateSettings({ canalLength: String(canalLength), positionList });
    onExecuteFrequencyDomain({ canalLength, positions });
    onClose?.();
  };

  return (
    <div className={`outer-ear-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="page-sidebar-close">
        <button className="page-sidebar-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>

      {/* Seção 1: Anatomia do canal auditivo */}
      <div className="outer-ear-section">
        <h3 className="section-title">{t('outerEar.anatomySection')}</h3>

        <div className="age-group">
          <label className="outer-ear-label">{t('outerEar.ageGroup')}</label>
          <select
            className="outer-ear-select"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="infant">{t('outerEar.ageInfant')}</option>
            <option value="child">{t('outerEar.ageChild')}</option>
            <option value="adolescent">{t('outerEar.ageAdolescent')}</option>
            <option value="adult">{t('outerEar.ageAdult')}</option>
          </select>
        </div>
        <p className="canal-length-info">
          {t('outerEar.canalLengthInfo')} = {canalLength} mm
        </p>

        <button
          className="outer-ear-button"
          onClick={handleGetFRF}
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
          disabled={!frequencyList}
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
          disabled={!positionList}
        >
          {t('outerEar.executeFrequencyDomain')}
        </button>
      </div>
    </div>
  );
};

export default OuterEarSidebar;
