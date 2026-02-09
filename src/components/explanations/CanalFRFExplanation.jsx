import { useLanguage } from '../../contexts/LanguageContext';
import frfImg from '../../assets/sidebar_outerear_frf.png';
import './ExplanationSidebar.css';

const CanalFRFExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('outerEar.frfExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('outerEar.frfExplanationBullet1')}</li>
          <li>{t('outerEar.frfExplanationBullet3')}</li>
        </ul>
        <img src={frfImg} alt="Ear canal FRF" className="explanation-image outerear-frf-image" />
        <ul>
         <li>{t('outerEar.frfExplanationBullet2')}</li>
          <li>{t('outerEar.frfExplanationBullet4')}</li>
          <li>{t('outerEar.frfExplanationBullet5')}</li>
          <li>{t('outerEar.frfExplanationBullet6')}</li>
          <li>{t('outerEar.frfExplanationBullet7')}</li>
        </ul>
      </div>
    </div>
  );
};

export default CanalFRFExplanation;
