import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
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

const SpectrumExplanation = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className={`explanation-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="explanation-close">
        <button className="explanation-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      <h3 className="explanation-title">{t('settings.spectrumExplanationTitle')}</h3>
      <div className="explanation-content">
        <ul>
          <li>{t('settings.spectrumExplanationBullet1')}</li>
          <li>{renderWithBoldQuotes(t('settings.spectrumExplanationBullet2'))}</li>
          <li>{renderWithBoldQuotes(t('settings.spectrumExplanationBullet3'))}</li>
          <li>{renderWithBoldQuotes(t('settings.spectrumExplanationBullet4'))}</li>
        </ul>
      </div>
    </div>
  );
};

export default SpectrumExplanation;
