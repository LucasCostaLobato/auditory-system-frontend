import { useLanguage } from '../../contexts/LanguageContext';
import envelopeImg from '../../assets/sidebar_innerear_envelope.png';
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

const InnerEarEnvelopeExplanation = () => {
  const { t } = useLanguage();

  return (
    <div className="explanation-sidebar">
      <h3 className="explanation-title">{t('innerEar.envelopeExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('innerEar.envelopeExplanationBullet1')}</li>
          <li>{t('innerEar.envelopeExplanationBullet2')}</li>
          <li>{renderWithBoldQuotes(t('innerEar.envelopeExplanationBullet3'))}</li>
          <li>{t('innerEar.envelopeExplanationBullet4')}</li>
        </ul>
        <img src={envelopeImg} alt="Displacement envelope" className="explanation-image innerear-envelope-image" />
        <ul>
          <li>{t('innerEar.envelopeExplanationBullet5')}</li>
          <li>{t('innerEar.envelopeExplanationBullet55')}</li>
          <li>{t('innerEar.envelopeExplanationBullet6')}</li>
        </ul>
      </div>
    </div>
  );
};

export default InnerEarEnvelopeExplanation;
