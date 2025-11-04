import React, { useState } from 'react';
import { BarChart3, BookOpen, Home, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import GraphPanel from './components/GraphPanel';
import ContentPanel from './components/ContentPanel';
import HomePanel from './components/HomePanel';
import outerEarIcon from './assets/outer_ear_icon.svg';
import middleEarIcon from './assets/middle_ear_icon.svg';
import innerEarIcon from './assets/inner_ear_icon.svg';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'settings', label: 'Configurações gerais', icon: Settings },
    { id: 'outerEarMenu', label: 'Orelha externa', icon: outerEarIcon },
    { id: 'middleEarMenu', label: 'Orelha média', icon: middleEarIcon },
    { id: 'innerEarMenu', label: 'Orelha interna', icon: innerEarIcon },
  ];

  return (
    <div className="app-container">
      <Sidebar 
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="main-content">
        {activeSection === 'home' && <HomePanel />}
        {activeSection !== 'home' && (
          <>
            <GraphPanel />
            <ContentPanel />
          </>
        )}
      </main>
    </div>
  );
}