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
import './styles/App.css';

// Import APIs
import { getInputSignal } from './services/api';



const MENU_ITEMS = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'generalSettings', label: 'Configurações gerais', icon: Settings },
  { id: 'outerEarMenu', label: 'Orelha externa', icon: Settings },
  { id: 'middleEarMenu', label: 'Orelha média', icon: Settings },
  { id: 'innerEarMenu', label: 'Orelha interna', icon: Settings },
];

const SETTINGS_SECTIONS = [
  'generalSettings',
  'outerEarMenu',
  'middleEarMenu',
  'innerEarMenu'
];

const TITLES = {
  generalSettings: 'Configurações Gerais',
  outerEarMenu: 'Orelha Externa',
  middleEarMenu: 'Orelha Média',
  innerEarMenu: 'Orelha Interna'
};

// Valores iniciais padrão
const INITIAL_GENERAL_SETTINGS = {
  frequencyMin: 20,
  frequencyMax: 10000,
  numberOfFrequencies: 3000,
  inputSignal: 'idealWhiteNoise'
};

const INITIAL_OUTER_EAR = {
  earCanalLength: 30,
  freqsToAnalyze: [200,750,6200],
  positionsToAnalyze: [],
};


// ===== COMPONENTE PRINCIPAL =====
export default function App() {
  
  // ================================================
  // STATES

  // Estados gerais
  const [activeSection, setActiveSection] = useState('home');
  const [generalSettings, setGeneralSettings] = useState(INITIAL_GENERAL_SETTINGS);
  const [outerEarSettings, setOuterEarSettings] = useState(INITIAL_OUTER_EAR);
  const [middleEarSettings, setMiddleEarSettings] = useState(INITIAL_GENERAL_SETTINGS);
  const [innerEarSettings, setInnerEarSettings] = useState(INITIAL_GENERAL_SETTINGS);


  // Estados de requisições http - unified approach for scalability
  // This single state object handles ALL analysis results from any button
  const [analysisResults, setAnalysisResults] = useState({
    inputSpectrum: { data: null, loading: false, timestamp: null },
    frequencyDomainAnalysis: { data: null, loading: false, timestamp: null }
    // To add more analysis types, simply add new keys here:
    // outputSpectrum: { data: null, loading: false, timestamp: null },
    // phaseResponse: { data: null, loading: false, timestamp: null },
    // spatialAnalysis: { data: null, loading: false, timestamp: null },
  });



  // ================================================
  // HANDLERS

  // Generic handler for any analysis action - scalable approach
  const handleAnalysisAction = async (resultKey, apiFunction, params, chartConfig = {}) => {
    try {
      // Set loading state for this specific result with timestamp
      setAnalysisResults(prev => ({
        ...prev,
        [resultKey]: { ...prev[resultKey], loading: true, timestamp: Date.now() }
      }));

      // Call the API
      const data = await apiFunction(params);

      // Debug: Log the received data
      console.log(`Data received from API for ${resultKey}:`, data);
      console.log('Keys in data:', Object.keys(data));

      // Update state with received data, chart configuration, and timestamp
      setAnalysisResults(prev => ({
        ...prev,
        [resultKey]: {
          data,
          loading: false,
          chartConfig, // Store custom chart configuration if provided
          timestamp: Date.now() // Update timestamp when data is received
        }
      }));

    } catch (error) {
      // Reset data and stop loading on error
      setAnalysisResults(prev => ({
        ...prev,
        [resultKey]: { data: null, loading: false, chartConfig: {}, timestamp: null }
      }));
      console.error(`❌ Erro ao carregar ${resultKey}:`, error);
      alert(`Erro ao gerar ${resultKey}. Verifique a conexão com o servidor.`);
    }
  };


  const handleCloseSettings = () => {
    setActiveSection('home');
  };

  const getSettingsForSection = () => {
    switch(activeSection) {
      case 'generalSettings':
        return { settings: generalSettings, setSettings: setGeneralSettings };
      case 'outerEarMenu':
        return { settings: outerEarSettings, setSettings: setOuterEarSettings };
      case 'middleEarMenu':
        return { settings: middleEarSettings, setSettings: setMiddleEarSettings };
      case 'innerEarMenu':
        return { settings: innerEarSettings, setSettings: setInnerEarSettings };
      default:
        return { settings: {}, setSettings: () => {} };
    }
  };

  // VARIÁVEIS derivadas - DENTRO da função
  const showSettingsPanel = SETTINGS_SECTIONS.includes(activeSection);
  const { settings: currentSettings, setSettings: setCurrentSettings } = getSettingsForSection();
  const settingsTitle = TITLES[activeSection] || 'Configurações';




  // RETURN DA FUNÇÃO APP
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
          onAnalysisAction={handleAnalysisAction}
          analysisResults={analysisResults}
          generalSettings={generalSettings}
        />
      )}

      <main className="main-content">
        {activeSection === 'home' && <HomePanel />}

        {showSettingsPanel && (
          <>
            <GraphPanel
              analysisResults={analysisResults}
            />
            <ContentPanel
              inputSignal={generalSettings.inputSignal}
              activeSection={activeSection}
            />
          </>
        )}
      </main>
    </div>
  );
}