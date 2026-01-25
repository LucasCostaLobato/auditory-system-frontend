import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const SpaceDomainExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('outerEar.spaceDomainExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('outerEar.spaceDomainExplanationContent')}</p>
      </div>
    </div>
  );
};

export default SpaceDomainExplanation;
