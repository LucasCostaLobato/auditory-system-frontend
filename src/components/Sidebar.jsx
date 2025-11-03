import React from 'react';
import './Sidebar.css';

export default function Sidebar({ menuItems, activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Dashboard</h1>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span className="menu-button-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <p className="sidebar-version">Versão 1.0</p>
      </div>
    </aside>
  );
}