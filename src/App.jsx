import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Sidebar from './components/sidebars/Sidebar';
import HomePage from './components/pages/HomePage';
import SettingsPage from './components/pages/SettingsPage';
import OuterEarPage from './components/pages/OuterEarPage';
import MiddleEarPage from './components/pages/MiddleEarPage';
import InnerEarPage from './components/pages/InnerEarPage';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('home');

  const handleCloseSettings = () => {
    setActiveMenu('home');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <HomePage />;
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
          <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;
