import { useLanguage } from '../../contexts/LanguageContext';
import frfImg from '../../assets/sidebar_middleear_frf.png';
import './ExplanationSidebar.css';

const MiddleEarFRFExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('middleEar.frfExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('middleEar.frfExplanationBullet1')}</li>
        </ul>
        <img src={frfImg} alt="Middle ear FRF" className="explanation-image middleear-frf-image" />
        <ul>
          <li>{t('middleEar.frfExplanationBullet2')}</li>
          <li>{t('middleEar.frfExplanationBullet3')}</li>
          <li>{t('middleEar.frfExplanationBullet4')}</li>
          <li>{t('middleEar.frfExplanationBullet5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default MiddleEarFRFExplanation;
