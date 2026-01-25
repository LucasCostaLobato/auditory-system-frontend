import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const MiddleEarDynamicExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('middleEar.dynamicExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('middleEar.dynamicExplanationContent')}</p>
      </div>
    </div>
  );
};

export default MiddleEarDynamicExplanation;
