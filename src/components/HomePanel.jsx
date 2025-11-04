import React from 'react';
import '../styles/HomePanel.css';

export default function HomePanel() {
  return (
    <section className="home-panel">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Bem-vindo à plataforma Physics of Hearing</h1>
        </div>

        <div className="home-content">
          <div className="home-section">
            <h2>Sobre a plataforma</h2>
            <p>
              Este sistema foi desenvolvido com o objetivo de auxiliar e 
              difundir o ensino e pesquisa sobre mecanismos da audição de
              maneira acessível e multidisciplinar.
            </p>
          </div>

          <div className="home-section">
            <h2>Recursos Disponíveis (versão de teste)</h2>
            <ul>
              <li>⚙️ Definição de características e posição da fonte sonora</li>
              <li>⚙️ Dimensão e condição do sistema auditivo</li>
              <li>📈 Análises no domínio da frequência e do espaço</li>
              <li>📖 Quadros explicativos</li>

               
            </ul>
          </div>

          <div className="home-image-placeholder">
            {/* Aqui você pode adicionar suas imagens */}
            <div className="placeholder-box">
              <p>📷 Área reservada para imagem</p>
              <p className="placeholder-hint">Adicione suas imagens aqui</p>
            </div>
          </div>

          <div className="home-section">
            <h2>Como Começar</h2>
            <ol>
              <li>Selecione uma opção no menu lateral</li>
              <li>Explore os gráficos e visualizações disponíveis</li>
              <li>Configure a plataforma de acordo com suas necessidades</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}