import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import travellingImg from '../../assets/sidebar_innerear_trevelling.png';
import './ExplanationSidebar.css';

const renderWithBoldQuotes = (text) => {
  const parts = text.split(/(".*?")/g);
  return parts.map((part, i) => {
    if (part.startsWith('"') && part.endsWith('"')) {
      return <strong key={i}>{part.slice(1, -1)}</strong>;
    }
    return part;
  });
};

const InnerEarTravellingWavesExplanation = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className={`explanation-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="explanation-close">
        <button className="explanation-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      <h3 className="explanation-title">{t('innerEar.travellingWavesExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('innerEar.travellingWavesExplanationBullet1')}</li>
          <li>{t('innerEar.travellingWavesExplanationBullet2')}</li>
          <li>{renderWithBoldQuotes(t('innerEar.travellingWavesExplanationBullet3'))}</li>
          <li>{t('innerEar.travellingWavesExplanationBullet4')}</li>
        </ul>
        <img src={travellingImg} alt="Travelling waves" className="explanation-image innerear-travelling-image" />
        <ul>
          <li>{t('innerEar.travellingWavesExplanationBullet5')}</li>
          <li>{t('innerEar.travellingWavesExplanationBullet6')}</li>
        </ul>
      </div>
    </div>
  );
};

export default InnerEarTravellingWavesExplanation;
