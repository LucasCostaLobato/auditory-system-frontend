import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const FrequencyDomainExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('outerEar.frequencyDomainExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('outerEar.frequencyDomainExplanationContent')}</p>
      </div>
    </div>
  );
};

export default FrequencyDomainExplanation;
