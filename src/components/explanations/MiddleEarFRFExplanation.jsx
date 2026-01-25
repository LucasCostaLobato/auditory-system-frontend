import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const MiddleEarFRFExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('middleEar.frfExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('middleEar.frfExplanationContent')}</p>
      </div>
    </div>
  );
};

export default MiddleEarFRFExplanation;
