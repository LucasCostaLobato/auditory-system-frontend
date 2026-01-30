import { useLanguage } from '../../contexts/LanguageContext';
import './ExplanationSidebar.css';

const InnerEarTravellingWavesExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('innerEar.travellingWavesExplanationTitle')}</h3>
      <div className="explanation-content">
        <p>{t('innerEar.travellingWavesExplanationContent')}</p>
      </div>
    </div>
  );
};

export default InnerEarTravellingWavesExplanation;
