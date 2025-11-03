import React from 'react';
import './Sidebar.css';
import logo_header from '../assets/ear_header.svg';

export default function Sidebar({ menuItems, activeSection, onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo_header} alt="Logo" className="sidebar-logo" />
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            // Verifica se é um componente React ou uma imagem (string)
            const isImageIcon = typeof item.icon === 'string';
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
              >
                <img src={item.icon} alt="" className="menu-icon-img" />
                {/* {isImageIcon ? (
                  // Se for string (caminho da imagem)
                  <img src={item.icon} alt="" className="menu-icon-img" />
                ) : (
                  // Se for componente React (lucide-react)
                  <item.icon size={20} />
                )} */}
                <span className="menu-button-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <p className="sidebar-version">Versão de teste</p>
        <p className="sidebar-developed-by">Desenvolvido por Lucas Lobato</p>
      </div>
    </aside>
  );
}