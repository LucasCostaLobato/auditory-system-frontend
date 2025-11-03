import React from 'react';
import { BarChart3 } from 'lucide-react';
import './GraphPanel.css';

export default function GraphPanel() {
  return (
    <section className="graph-panel">
      <div className="graph-panel-container">
        <div className="graph-panel-header">
          <BarChart3 className="graph-panel-icon" size={24} />
          <h2 className="graph-panel-title">
            Área de Gráficos
          </h2>
        </div>
        
        <div className="graph-placeholder">
          <div className="graph-placeholder-content">
            <BarChart3 size={48} className="graph-placeholder-icon" />
            <p className="graph-placeholder-title">Gráficos serão exibidos aqui</p>
            <p className="graph-placeholder-subtitle">Área reservada para visualizações de dados</p>
          </div>
        </div>
      </div>
    </section>
  );
}