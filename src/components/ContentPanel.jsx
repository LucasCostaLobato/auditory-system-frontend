import React from 'react';
import { BookOpen } from 'lucide-react';
import '../styles/ContentPanel.css';

export default function ContentPanel({ inputSignal, activeSection }) {

  // Function to render content based on active section and inputSignal
  const renderContent = () => {
    // If we're in a non-generalSettings section, show section-specific content
    if (activeSection === 'outerEarMenu') {
      return renderOuterEarContent();
    }
    if (activeSection === 'middleEarMenu') {
      return renderMiddleEarContent();
    }
    if (activeSection === 'innerEarMenu') {
      return renderInnerEarContent();
    }

    // Default: generalSettings section - show input signal content
    return renderInputSignalContent();
  };

  // Content for Outer Ear section
  const renderOuterEarContent = () => {
    return (
      <div className="content-text">
        <h3 className="content-subtitle">Orelha Externa</h3>

        <p className="content-intro">
          A orelha externa é composta pelo pavilhão auricular (pinna) e pelo canal auditivo externo.
          Sua principal função é coletar ondas sonoras e direcioná-las para o tímpano.
        </p>

        <h4 className="content-section-title">Características principais:</h4>
        <ul className="content-list">
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>O pavilhão auricular ajuda na localização espacial do som</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>O canal auditivo atua como um ressonador, amplificando frequências entre 2-5 kHz</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Comprimento típico do canal: 25-30 mm em adultos</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>A ressonância do canal fornece ganho natural de aproximadamente 10-15 dB nas frequências de fala</span>
          </li>
        </ul>
      </div>
    );
  };

  // Content for Middle Ear section
  const renderMiddleEarContent = () => {
    return (
      <div className="content-text">
        <h3 className="content-subtitle">Orelha Média</h3>

        <p className="content-intro">
          A orelha média é uma cavidade preenchida com ar que contém três pequenos ossos (ossículos):
          martelo, bigorna e estribo. Sua função principal é transferir eficientemente a energia sonora
          do ar para o fluido da cóclea.
        </p>

        <h4 className="content-section-title">Características principais:</h4>
        <ul className="content-list">
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Os ossículos formam uma cadeia mecânica que amplifica a pressão sonora</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Fornece ganho de aproximadamente 25-30 dB devido à diferença de área entre tímpano e janela oval</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Resolve o problema de impedância entre o ar e os fluidos cocleares</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Contém músculos que protegem a orelha interna de sons muito intensos (reflexo acústico)</span>
          </li>
        </ul>
      </div>
    );
  };

  // Content for Inner Ear section
  const renderInnerEarContent = () => {
    return (
      <div className="content-text">
        <h3 className="content-subtitle">Orelha Interna</h3>

        <p className="content-intro">
          A orelha interna contém a cóclea, um órgão em forma de espiral preenchido com fluido
          que converte vibrações mecânicas em sinais elétricos neurais. É aqui que ocorre a
          análise de frequência do som.
        </p>

        <h4 className="content-section-title">Características principais:</h4>
        <ul className="content-list">
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>A membrana basilar atua como um analisador de espectro mecânico</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Organização tonotópica: frequências altas na base, frequências baixas no ápice</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Células ciliadas convertem movimento mecânico em impulsos nervosos</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Cerca de 16.000 células ciliadas em cada cóclea humana</span>
          </li>
          <li className="content-list-item">
            <span className="content-list-bullet">•</span>
            <span>Amplificação coclear ativa fornece sensibilidade e seletividade em frequência</span>
          </li>
        </ul>
      </div>
    );
  };

  // Original input signal content for General Settings
  const renderInputSignalContent = () => {
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
      case 'clarinet':
        return (
          <div className="content-text">
            <h3 className="content-subtitle">Clarineta</h3>

            <p className="content-intro">
              O espectro de uma clarineta representa um sinal musical com uma estrutura harmônica rica, com energia distribuída
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
                <span>Ampla faixa em amplitude e frequência</span>
              </li>
              <li className="content-list-item">
                <span className="content-list-bullet">•</span>
                <span>Estudo da resolução espectral do sistema auditivo</span>
              </li>
            </ul>

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

  // Determine panel title based on active section
  const getPanelTitle = () => {
    switch(activeSection) {
      case 'outerEarMenu':
        return 'Sobre a Orelha Externa';
      case 'middleEarMenu':
        return 'Sobre a Orelha Média';
      case 'innerEarMenu':
        return 'Sobre a Orelha Interna';
      default:
        return 'Sobre o Sinal de Entrada';
    }
  };

  return (
    <section className="content-panel">
      <div className="content-panel-container">
        <div className="content-panel-header">
          <BookOpen className="content-panel-icon" size={20} />
          <h2 className="content-panel-title">
            {getPanelTitle()}
          </h2>
        </div>

        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}