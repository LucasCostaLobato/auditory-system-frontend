import { useLanguage } from '../contexts/LanguageContext';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1>
      <div className="home-content">
        <p>{t('home.content')}</p>
      </div>
    </div>
  );
};

export default HomePage;
