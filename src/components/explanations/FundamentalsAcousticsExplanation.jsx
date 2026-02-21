import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import acousticsImg from '../../assets/sidebar_fundamentals_acoustics2.png';
import './ExplanationSidebar.css';

const FundamentalsAcousticsExplanation = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className={`explanation-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="explanation-close">
        <button className="explanation-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      <h3 className="explanation-title">{t('fundamentals.explanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('fundamentals.explanationBullet1')}</li>
          <li>{t('fundamentals.explanationBullet2')}</li>
        </ul>
        <img src={acousticsImg} alt="Acoustics" className="explanation-image acoustics-image" />
        <ul>
          <li>{t('fundamentals.explanationBullet3')}</li>
          <li>{t('fundamentals.explanationBullet31')}</li>
          <li>{t('fundamentals.explanationBullet4')}</li>
          <li>{t('fundamentals.explanationBullet45')}</li>
          <li>{t('fundamentals.explanationBullet5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default FundamentalsAcousticsExplanation;
