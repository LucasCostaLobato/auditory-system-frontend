import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import './MiddleEarSidebar.css';

const MiddleEarSidebar = ({ onViewFRF, onViewDynamic }) => {
  const { t } = useLanguage();
  const { settings, updateSettings } = useSettings();

  // Estado local para condição e severidade
  const [meCondition, setMeCondition] = useState(settings.meCondition);
  const [meSeverity, setMeSeverity] = useState(settings.meSeverity);

  // Estado local para checkboxes
  const [selectedMeasures, setSelectedMeasures] = useState({
    tympanicMembrane: false,
    malleus: false,
    incus: false,
    stapes: false
  });

  // Sincroniza com o contexto
  useEffect(() => {
    setMeCondition(settings.meCondition);
    setMeSeverity(settings.meSeverity);
  }, [settings.meCondition, settings.meSeverity]);

  // Atualiza o contexto quando meCondition ou meSeverity mudam
  const handleConditionChange = (newCondition) => {
    setMeCondition(newCondition);
    updateSettings({ meCondition: newCondition });
  };

  const handleSeverityChange = (newSeverity) => {
    setMeSeverity(newSeverity);
    updateSettings({ meSeverity: newSeverity });
  };

  // Toggle de checkboxes
  const handleCheckboxChange = (measure) => {
    setSelectedMeasures(prev => ({
      ...prev,
      [measure]: !prev[measure]
    }));
  };

  // Função para obter a lista de medidas selecionadas
  const getSelectedMeasuresList = () => {
    const measureMap = {
      tympanicMembrane: 'tympanic_membrane',
      malleus: 'malleus',
      incus: 'incus',
      stapes: 'stapes'
    };

    return Object.keys(selectedMeasures)
      .filter(key => selectedMeasures[key])
      .map(key => measureMap[key]);
  };

  // Handler para Ver FRF
  const handleViewFRF = () => {
    const measures = getSelectedMeasuresList();
    if (measures.length === 0) {
      alert(t('middleEar.selectAtLeastOne'));
      return;
    }

    const params = {
      startFrequency: settings.startFrequency,
      endFrequency: settings.endFrequency,
      frequencyPoints: settings.frequencyPoints,
      meCondition,
      meSeverity,
      measures
    };

    onViewFRF(params);
  };

  // Handler para Ver resposta à excitação
  const handleViewDynamic = () => {
    const measures = getSelectedMeasuresList();
    if (measures.length === 0) {
      alert(t('middleEar.selectAtLeastOne'));
      return;
    }

    const params = {
      startFrequency: settings.startFrequency,
      endFrequency: settings.endFrequency,
      frequencyPoints: settings.frequencyPoints,
      meCondition,
      meSeverity,
      inputSignal: settings.signalType,
      measures
    };

    onViewDynamic(params);
  };

  return (
    <div className="middle-ear-sidebar">
      {/* Seção 1: Condição da Orelha Média */}
      <div className="middle-ear-section">
          <h4 className="section-title">{t('middleEar.condition')}</h4>

          <label className="middle-ear-label">{t('middleEar.conditionType')}</label>
          <select
            className="middle-ear-select"
            value={meCondition}
            onChange={(e) => handleConditionChange(e.target.value)}
          >
            <option value="healthy">{t('middleEar.healthy')}</option>
            <option value="otosclerosis">{t('middleEar.otosclerosis')}</option>
            <option value="malleus_fixation">{t('middleEar.malleusFixation')}</option>
          </select>

          <label className="middle-ear-label">{t('middleEar.severity')}</label>
          <select
            className="middle-ear-select"
            value={meSeverity}
            onChange={(e) => handleSeverityChange(e.target.value)}
            disabled={meCondition === 'healthy'}
          >
            <option value="low">{t('middleEar.low')}</option>
            <option value="medium">{t('middleEar.medium')}</option>
            <option value="high">{t('middleEar.high')}</option>
          </select>
        </div>

        {/* Seção 2: Comportamento Vibratório */}
        <div className="middle-ear-section">
          <h4 className="section-title">{t('middleEar.vibratoryBehavior')}</h4>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedMeasures.tympanicMembrane}
              onChange={() => handleCheckboxChange('tympanicMembrane')}
            />
            {t('middleEar.tympanicMembrane')}
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedMeasures.malleus}
              onChange={() => handleCheckboxChange('malleus')}
            />
            {t('middleEar.malleus')}
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedMeasures.incus}
              onChange={() => handleCheckboxChange('incus')}
            />
            {t('middleEar.incus')}
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedMeasures.stapes}
              onChange={() => handleCheckboxChange('stapes')}
            />
            {t('middleEar.stapes')}
          </label>

          <div className="button-group">
            <button
              className="middle-ear-button"
              onClick={handleViewFRF}
            >
              {t('middleEar.viewFRF')}
            </button>

            <button
              className="middle-ear-button"
              onClick={handleViewDynamic}
            >
              {t('middleEar.viewDynamic')}
            </button>
          </div>
        </div>
    </div>
  );
};

export default MiddleEarSidebar;
