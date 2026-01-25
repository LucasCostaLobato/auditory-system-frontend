import { useLanguage } from '../contexts/LanguageContext';
import './ExplanationSidebar.css';

const SpectrumExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('settings.spectrumExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('settings.spectrumExplanationContent')}</p>
      </div>
    </div>
  );
};

export default SpectrumExplanation;
