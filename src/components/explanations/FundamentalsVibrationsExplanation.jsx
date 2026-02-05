import { useLanguage } from '../../contexts/LanguageContext';
import vibrationsImg from '../../assets/sidebar_fundamentals_vibration.png';
import './ExplanationSidebar.css';

const FundamentalsVibrationsExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('fundamentals.vibrationExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('fundamentals.vibrationExplanationBullet1')}</li>
          <li>{t('fundamentals.vibrationExplanationBullet2')}</li>
        </ul>
        <img src={vibrationsImg} alt="SDOF system" className="explanation-image vibrations-image" />
        <ul>
          <li>{t('fundamentals.vibrationExplanationBullet3')}</li>
          <li>{t('fundamentals.vibrationExplanationBullet4')}</li>
          <li>{t('fundamentals.vibrationExplanationBullet5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default FundamentalsVibrationsExplanation;
