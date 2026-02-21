import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import frequencyImg from '../../assets/sidebar_outerear_frequency.png';
import './ExplanationSidebar.css';

const FrequencyDomainExplanation = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className={`explanation-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="explanation-close">
        <button className="explanation-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      <h3 className="explanation-title">{t('outerEar.frequencyDomainExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('outerEar.frequencyDomainBullet1')}</li>
          <li>{t('outerEar.frequencyDomainBullet2')}</li>
        </ul>
        <img src={frequencyImg} alt="Frequency domain analysis" className="explanation-image outerear-frequency-image" />
        <ul>
          <li>{t('outerEar.frequencyDomainBullet3')}</li>
          <li>{t('outerEar.frequencyDomainBullet4')}</li>
        </ul>
      </div>
    </div>
  );
};

export default FrequencyDomainExplanation;
