import React from 'react';
import { BookOpen } from 'lucide-react';
import '../styles/ContentPanel.css';

export default function ContentPanel({ inputSignal }) {

  // Function to render content based on inputSignal
  const renderContent = () => {
    switch(inputSignal) {
      case 'idealWhiteNoise':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Ruído branco ideal</h3>

            <p className="content-intro">
              O ruído branco ideal é um sinal que possui a mesma amplitude em todas as frequêncais de análise.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Espectro de magnitude constante em todas as frequências</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Útil para caracterizar sistemas em geral</span>
              </li>
            </ul>
          </div>
        );

      case 'speech':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Sinal de Fala</h3>

            <p className="content-intro">
              O sinal de fala possui características espectrais complexas e variáveis no tempo,
              concentrando energia principalmente nas frequências de 300 Hz a 3400 Hz.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Espectro não uniforme com picos em formantes vocálicos</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Variação temporal rápida devido à articulação</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Energia concentrada na faixa de 300-3400 Hz</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Importante para estudos de inteligibilidade da fala</span>
              </li>
            </ul>

          </div>
        );
      case 'music':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Sinal Musical</h3>

            <p className="content-intro">
              Sinais musicais apresentam estrutura harmônica rica, com energia distribuída
              em múltiplas frequências relacionadas harmonicamente.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Espectro com componentes harmônicos bem definidos</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Ampla faixa dinâmica de frequências (20 Hz a 20 kHz)</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Desafia a resolução temporal e espectral do sistema auditivo</span>
              </li>
            </ul>

            <div className="content-tip">
              <p className="content-tip-text">
                💡 <strong>Aplicação:</strong> A análise de sinais musicais permite avaliar
                a capacidade do sistema auditivo em processar sons complexos e harmônicos,
                essencial para a apreciação musical.
              </p>
            </div>
          </div>
        );
        case 'narrowBandSignalLowFreq':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Sinal de banda estreita em baixa frequência</h3>

            <p className="content-intro">
              Sinal com amplitude constante na faixa de frequência entre 80 Hz e 120 Hz.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Estudo da tonotopia da orelha interna</span>
              </li>
            </ul>
            
          </div>
        );
        case 'narrowBandSignalMidFreq':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Sinal de banda estreita em média frequência</h3>

            <p className="content-intro">
            Sinal com amplitude constante na faixa de frequência entre 800 Hz e 1200 Hz.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Estudo da tonotopia da orelha interna</span>
              </li>
            </ul>
            
          </div>
        );
        case 'narrowBandSignalHighFreq':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Sinal de banda estreita em alta frequência</h3>

            <p className="content-intro">
            Sinal com amplitude constante na faixa de frequência entre 4800 Hz e 5200 Hz.
            </p>

            <h4 className="content-section-title">Características principais e aplicações:</h4>
            <ul className="content-list">
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Estudo da tonotopia da orelha interna</span>
              </li>
            </ul>
            
          </div>
        );
      default:
        return (
          <div className="content-text">
            <p className="content-intro">
              Selecione um tipo de sinal de entrada nas configurações gerais para visualizar
              informações detalhadas sobre suas características espectrais.
            </p>
          </div>
        );
    }
  };

  return (
    <section className="content-panel">
      <div className="content-panel-container">
        <div className="content-panel-header">
          <BookOpen className="content-panel-icon" size={20} />
          <h2 className="content-panel-title">
            Sobre o Sinal de Entrada
          </h2>
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}