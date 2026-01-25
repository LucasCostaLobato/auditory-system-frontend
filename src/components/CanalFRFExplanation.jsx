import { useLanguage } from '../contexts/LanguageContext';
import './ExplanationSidebar.css';

const CanalFRFExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('outerEar.frfExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('outerEar.frfExplanationContent')}</p>
      </div>
    </div>
  );
};

export default CanalFRFExplanation;
