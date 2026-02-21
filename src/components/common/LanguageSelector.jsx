import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageSelector.css';

const LanguageSelector = ({ compact = false }) => {
  const { language, setLanguage, t } = useLanguage();

  const languages = compact
    ? [
        { code: 'pt', label: 'PT' },
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' }
      ]
    : [
        { code: 'pt', label: 'Português' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' }
      ];

  if (compact) {
    return (
      <div className="language-selector language-selector--compact">
        <span className="language-icon">🌐</span>
        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="language-selector">
      <label className="language-label">
        <span className="language-icon">🌐</span>
        {t('language.selector')}:
      </label>
      <select
        className="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
