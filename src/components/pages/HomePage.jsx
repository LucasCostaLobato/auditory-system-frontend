import { useLanguage } from '../../contexts/LanguageContext';
import homePageFigure from '../../assets/home_page_fig1.svg';
import './HomePage.css';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* Header com título e subtítulo */}
      <header className="home-header">
        <h1 className="home-title">{t('home.welcomeTitle')}</h1>
        <p className="home-subtitle">{t('home.welcomeSubtitle')}</p>
      </header>

      {/* Seção: O que é? */}
      <section className="home-section">
        <h2 className="section-title">{t('home.whatIsTitle')}</h2>
        <ul className="section-list">
          <li>{t('home.whatIsPoint1')}</li>
          <li>{t('home.whatIsPoint2')}</li>
        </ul>
        <div className="figure-container">
          <img src={homePageFigure} alt={t('home.figureAlt')} className="home-figure" />
        </div>
      </section>

      {/* Seção: Como usar? */}
      <section className="home-section">
        <h2 className="section-title">{t('home.howToUseTitle')}</h2>
        <p className="section-intro">{t('home.howToUseIntro')}</p>
        <ol className="section-list numbered">
          <li>{t('home.howToUseStep1')}</li>
          <li>{t('home.howToUseStep2')}</li>
          <li>{t('home.howToUseStep3')}</li>
        </ol>
      </section>

      {/* Seção: Referências */}
      <section className="home-section references-section">
        <h2 className="section-title">{t('home.referencesTitle')}</h2>
        <p className="section-intro">{t('home.referencesIntro')}</p>

        <p className="references-subtitle">{t('home.alsoAccess')}</p>
        <ul className="section-list links-list">
          <li>
            <a href="https://pt.wikiversity.org/wiki/Introdu%C3%A7%C3%A3o_%C3%A0_Audiologia_B%C3%A1sica" target="_blank" rel="noopener noreferrer">
              {t('home.linkAudiologia')}
            </a>
          </li>
          <li>
            <a href="https://amtoolbox.org/" target="_blank" rel="noopener noreferrer">
              {t('home.linkAMToolbox')}
            </a>
          </li>
        </ul>

        <p className="references-subtitle">{t('home.moreDetails')}</p>
        <ul className="section-list references-list">
          <li>
            L. Lobato, I. Bavaresco, S. Paul, e J. Cordioli, "Ajuste de um modelo de parâmetros concentrados da orelha média usando diferentes funções objetivo". <em>Acústica & Vibrações</em>, vol. 51, 2020.{' '}
            <a href="https://doi.org/10.55753/aev.v35e52.34" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.55753/aev.v35e52.34
            </a>
          </li>
          <li>
            L. Lobato, D. Calero, E. Maccarini, S. Paul, e J. Cordioli, 2023, "Modelagem da orelha média humana e validação experimental". Em: <em>XXVIII Encontro da SOBRAC</em>. Campinas: Galoá. 2018.{' '}
            <a href="https://doi.org/10.17648/sobrac-87108" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.17648/sobrac-87108
            </a>
          </li>
          <li>
            L. Lobato, S. Paul, and J. Cordioli, "Statistical analysis of the human middle ear mechanical properties". <em>The Journal of the Acoustical Society of America</em>, vol. 151, no. 3, pp. 2043-2054, 2022.{' '}
            <a href="https://doi.org/10.1121/10.0009890" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.1121/10.0009890
            </a>
          </li>
          <li>
            L. Lobato, S. Paul, J. Cordioli, and T. Ritto, "Stochastic model of the human middle ear using a nonparametric probabilistic approach". <em>The Journal of the Acoustical Society of America</em>, vol. 151, no. 3, pp. 2055-2065, 2022.{' '}
            <a href="https://doi.org/10.1121/10.0009763" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.1121/10.0009763
            </a>
          </li>
          <li>
            L. Lobato, S. Paul, and J. Cordioli, "Stochastic modeling of the human middle ear dynamics under pathological conditions". <em>Computers in Biology and Medicine</em>, vol. 179, 108802, 2024.{' '}
            <a href="https://doi.org/10.1016/j.compbiomed.2024.108802" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.1016/j.compbiomed.2024.108802
            </a>
          </li>
          <li>
            Donald D. Greenwood, "A cochlear frequency-position function for several species - 29 years later". <em>The Journal of the Acoustical Society of America</em>, vol. 87, no. 6, pp 2592–2605.{' '}
            <a href="https://doi.org/10.1121/1.399052" target="_blank" rel="noopener noreferrer">
              https://doi.org/10.1121/1.399052
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
