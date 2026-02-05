import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const FundamentalsAcousticsExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('fundamentals.explanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('fundamentals.explanationContent')}</p>
      </div>
    </div>
  );
};

export default FundamentalsAcousticsExplanation;
