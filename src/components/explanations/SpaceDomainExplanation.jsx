import { useLanguage } from '../../contexts/LanguageContext';
import spacialImg from '../../assets/sidebar_outerear_spacial.png';
import './ExplanationSidebar.css';

const SpaceDomainExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('outerEar.spaceDomainExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li dangerouslySetInnerHTML={{ __html: t('outerEar.spaceDomainBullet1') }} />
          <li>{t('outerEar.spaceDomainBullet2')}</li>
        </ul>
        <img src={spacialImg} alt="Space domain analysis" className="explanation-image outerear-spacial-image" />
        <ul>
          <li>{t('outerEar.spaceDomainBullet3')}</li>
          <li>{t('outerEar.spaceDomainBullet4')}</li>
          <li>{t('outerEar.spaceDomainBullet5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default SpaceDomainExplanation;
