import { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Sidebar from './components/sidebars/Sidebar';
import MobileHeader from './components/common/MobileHeader';
import HomePage from './components/pages/HomePage';
import SettingsPage from './components/pages/SettingsPage';
import OuterEarPage from './components/pages/OuterEarPage';
import MiddleEarPage from './components/pages/MiddleEarPage';
import InnerEarPage from './components/pages/InnerEarPage';
import FundamentalsPage from './components/pages/FundamentalsPage';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => document.body.classList.remove('drawer-open');
  }, [mobileNavOpen]);

  const handleMenuSelect = (menuId) => {
    setActiveMenu(menuId);
    setMobileNavOpen(false);
  };

  const handleCloseSettings = () => {
    setActiveMenu('home');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <HomePage />;
      case 'fundamentals':
        return <FundamentalsPage />;
      case 'settings':
        return <SettingsPage onClose={handleCloseSettings} />;
      case 'outerEar':
        return <OuterEarPage />;
      case 'middleEar':
        return <MiddleEarPage />;
      case 'innerEar':
        return <InnerEarPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <LanguageProvider>
      <SettingsProvider>
        <div className="app">
          <MobileHeader onMenuOpen={() => setMobileNavOpen(true)} />
          <Sidebar
            activeMenu={activeMenu}
            setActiveMenu={handleMenuSelect}
            isOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
          <div
            className={`sidebar-overlay${mobileNavOpen ? ' is-visible' : ''}`}
            onClick={() => setMobileNavOpen(false)}
          />
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;
