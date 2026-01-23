import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import OuterEarPage from './components/OuterEarPage';
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
        return <div className="page-placeholder">Orelha média - Em desenvolvimento</div>;
      case 'innerEar':
        return <div className="page-placeholder">Orelha interna - Em desenvolvimento</div>;
      default:
        return <HomePage />;
    }
  };

  return (
    <LanguageProvider>
      <div className="app">
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
