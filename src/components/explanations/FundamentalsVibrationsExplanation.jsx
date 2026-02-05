import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const FundamentalsVibrationsExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('fundamentals.vibrationExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('fundamentals.vibrationExplanationContent')}</p>
      </div>
    </div>
  );
};

export default FundamentalsVibrationsExplanation;
