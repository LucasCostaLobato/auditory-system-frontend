import { useLanguage } from '../../contexts/LanguageContext';
import responseImg from '../../assets/sidebar_middleear_response.png';
import './ExplanationSidebar.css';

const MiddleEarDynamicExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('middleEar.dynamicExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('middleEar.dynamicExplanationBullet1')}</li>
          <li>{t('middleEar.dynamicExplanationBullet2')}</li>
        </ul>
        <img src={responseImg} alt="Middle ear response" className="explanation-image middleear-response-image" />
        <ul>
          <li>{t('middleEar.dynamicExplanationBullet3')}</li>
          <li>{t('middleEar.dynamicExplanationBullet4')}</li>
          <li>{t('middleEar.dynamicExplanationBullet5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default MiddleEarDynamicExplanation;
