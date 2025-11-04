import React from 'react';
import '../styles/Sidebar.css';
import logo_header from '../assets/ear_header.svg';


function renderIcon(icon) {
  
  if (typeof icon === 'string') {
    return <img src={icon} alt="" className="menu-icon-img" />;
  } else {
    const Icon = icon;
    return <Icon size={20} />;
  }
}



export default function Sidebar({ menuItems, activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo_header} alt="Logo" className="sidebar-logo" />
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
            >
              {renderIcon(item.icon)}
              <span className="menu-button-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <p className="sidebar-version">Versão 1.0</p>
        <p className="sidebar-developed-by">Developed by Lucas Lobato with Claude Code</p>
      </div>
    </aside>
  );
}

