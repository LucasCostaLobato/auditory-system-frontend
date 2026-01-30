import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const InnerEarEnvelopeExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('innerEar.envelopeExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('innerEar.envelopeExplanationContent')}</p>
      </div>
    </div>
  );
};

export default InnerEarEnvelopeExplanation;
