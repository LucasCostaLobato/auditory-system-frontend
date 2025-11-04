import React from 'react';
import { BookOpen } from 'lucide-react';
import '../styles/ContentPanel.css';

export default function ContentPanel() {
  return (
    <section className="content-panel">
      <div className="content-panel-container">
        <div className="content-panel-header">
          <BookOpen className="content-panel-icon" size={24} />
          <h2 className="content-panel-title">
            Explicações e Conteúdo
          </h2>
        </div>
        
        <div className="content-area">
          <div className="content-text">
            <p className="content-intro">
              Este é o painel de explicações. Aqui você pode adicionar:
            </p>
            
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Textos explicativos sobre os dados apresentados</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Figuras ilustrativas e diagramas</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Documentação e tutoriais</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Análises e insights</span>
              </li>
            </ul>

            <div className="content-tip">
              <p className="content-tip-text">
                💡 <strong>Dica:</strong> Este layout oferece uma base limpa e organizada 
                para você adicionar seu conteúdo específico conforme necessário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}