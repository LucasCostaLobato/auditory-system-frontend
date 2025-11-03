import React, { useState } from 'react';
import { BarChart3, BookOpen, Home, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import GraphPanel from './components/GraphPanel';
import ContentPanel from './components/ContentPanel';
import './App.css';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'graphs', label: 'Gráficos', icon: BarChart3 },
    { id: 'content', label: 'Conteúdo', icon: BookOpen },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="app-container">
      <Sidebar 
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="main-content">
        <GraphPanel />
        <ContentPanel />
      </main>
    </div>
  );
}