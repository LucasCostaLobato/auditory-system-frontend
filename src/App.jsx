import React, { useState } from 'react';
import {Home, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import GraphPanel from './components/GraphPanel';
import ContentPanel from './components/ContentPanel';
import HomePanel from './components/HomePanel';
import SettingsPanel from './components/SettingsPanel'

import outerEarIcon from './assets/outer_ear_icon.svg';
import middleEarIcon from './assets/middle_ear_icon.svg';
import innerEarIcon from './assets/inner_ear_icon.svg';
import './App.css';

const MENU_ITEMS = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'generalSettings', label: 'Configurações gerais', icon: Settings },
  { id: 'outerEarMenu', label: 'Orelha externa', icon: outerEarIcon },
  { id: 'middleEarMenu', label: 'Orelha média', icon: middleEarIcon },
  { id: 'innerEarMenu', label: 'Orelha interna', icon: innerEarIcon },
];

const SETTINGS_SECTIONS = ['generalSettings'];

const TITLES = {
  generalSettings: 'Configurações Gerais',
  outerEarMenu: 'Orelha Externa',
  middleEarMenu: 'Orelha Média',
  innerEarMenu: 'Orelha Interna'
};

// ✅ Valores iniciais padrão - FORA da função
const INITIAL_GENERAL_SETTINGS = {
  frequencyMin: 20,
  frequencyMax: 10000,
  numberOfFrequencies: 300,
  inputSignal: 'idealWhiteNoise'
};


// ===== COMPONENTE PRINCIPAL =====
export default function App() {

  // ✅ ESTADOS - DENTRO da função (obrigatório)
  const [activeSection, setActiveSection] = useState('home');
  const [generalSettings, setGeneralSettings] = useState(INITIAL_GENERAL_SETTINGS);
  // const [outerEarSettings, setOuterEarSettings] = useState(INITIAL_OUTER_EAR_SETTINGS);
  // const [middleEarSettings, setMiddleEarSettings] = useState(INITIAL_MIDDLE_EAR_SETTINGS);
  // const [innerEarSettings, setInnerEarSettings] = useState(INITIAL_INNER_EAR_SETTINGS);

  // ✅ FUNÇÕES que usam estado - DENTRO da função (obrigatório)
  const handleCloseSettings = () => {
    setActiveSection('home');
  };

  const getSettingsForSection = () => {
    switch(activeSection) {
      case 'generalSettings':
        return { settings: generalSettings, setSettings: setGeneralSettings };
      // case 'outerEarMenu':
      //   return { settings: outerEarSettings, setSettings: setOuterEarSettings };
      // case 'middleEarMenu':
      //   return { settings: middleEarSettings, setSettings: setMiddleEarSettings };
      // case 'innerEarMenu':
      //   return { settings: innerEarSettings, setSettings: setInnerEarSettings };
      default:
        return { settings: {}, setSettings: () => {} };
    }
  };

  // ✅ VARIÁVEIS derivadas - DENTRO da função
  const showSettingsPanel = SETTINGS_SECTIONS.includes(activeSection);
  const { settings: currentSettings, setSettings: setCurrentSettings } = getSettingsForSection();
  const settingsTitle = TITLES[activeSection] || 'Configurações';

  return (
    <div className="app-container">
      <Sidebar 
        menuItems={MENU_ITEMS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {showSettingsPanel && (
        <SettingsPanel
          title={settingsTitle}
          onClose={handleCloseSettings}
          settings={currentSettings}
          onSettingsChange={setCurrentSettings}
          panelType={activeSection}
        />
      )}

      <main className="main-content">
        {activeSection === 'home' && <HomePanel />}

        {showSettingsPanel && (
          <>
            <GraphPanel />
            <ContentPanel />
          </>
        )}
      </main>
    </div>
  );
}



//   return (
//     <div className="app-container">
//       <Sidebar 
//         menuItems={menuItems}
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//       />

//       <main className="main-content">
//         {activeSection === 'home' && <HomePanel />}
//         {activeSection !== 'home' && (
//           <>
//             <GraphPanel />
//             <ContentPanel />
//           </>
//         )}
//       </main>
//     </div>
//   );
// }