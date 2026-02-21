import { useState, useEffect } from 'react';
import { Settings, Info } from 'lucide-react';
import FundamentalsSidebar from '../sidebars/FundamentalsSidebar';
import FundamentalsSignalGraph from '../graphs/FundamentalsSignalGraph';
import FundamentalsVibrationGraph from '../graphs/FundamentalsVibrationGraph';
import FundamentalsAcousticsExplanation from '../explanations/FundamentalsAcousticsExplanation';
import FundamentalsVibrationsExplanation from '../explanations/FundamentalsVibrationsExplanation';
import { getFundamentalsAcoustics, getFundamentalsVibrations } from '../../services/api';
import './FundamentalsPage.css';

const FundamentalsPage = () => {
  const [signalData, setSignalData] = useState(null);
  const [vibrationData, setVibrationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeGraph, setActiveGraph] = useState(null);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const anyDrawerOpen = controlsOpen || infoOpen;

  useEffect(() => {
    if (anyDrawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => document.body.classList.remove('drawer-open');
  }, [anyDrawerOpen]);

  const handleViewSignal = async (params) => {
    setLoading(true);
    setActiveGraph('acoustics');

    try {
      const data = await getFundamentalsAcoustics(params);
      setSignalData(data);
    } catch (error) {
      console.error('Erro ao buscar sinal:', error);
      setSignalData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSpectrum = async (params) => {
    setLoading(true);
    setActiveGraph('vibrations');

    try {
      const data = await getFundamentalsVibrations(params);
      setVibrationData(data);
    } catch (error) {
      console.error('Erro ao buscar FRF:', error);
      setVibrationData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fundamentals-page">
      <FundamentalsSidebar
        onViewSignal={handleViewSignal}
        onViewSpectrum={handleViewSpectrum}
        isOpen={controlsOpen}
        onClose={() => setControlsOpen(false)}
      />
      <div
        className={`sidebar-overlay${anyDrawerOpen ? ' is-visible' : ''}`}
        onClick={() => { setControlsOpen(false); setInfoOpen(false); }}
      />
      <div className="fundamentals-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeGraph === 'acoustics' && (
              <FundamentalsSignalGraph data={signalData} />
            )}
            {activeGraph === 'vibrations' && (
              <FundamentalsVibrationGraph data={vibrationData} />
            )}
            {!activeGraph && (
              <div className="graph-placeholder">
                <p>Selecione uma opção na barra lateral</p>
              </div>
            )}
          </>
        )}
      </div>
      {activeGraph === 'acoustics' && (
        <FundamentalsAcousticsExplanation
          isOpen={infoOpen}
          onClose={() => setInfoOpen(false)}
        />
      )}
      {activeGraph === 'vibrations' && (
        <FundamentalsVibrationsExplanation
          isOpen={infoOpen}
          onClose={() => setInfoOpen(false)}
        />
      )}

      <div className="mobile-action-bar">
        <button
          className={`mobile-action-btn${controlsOpen ? ' is-active' : ''}`}
          onClick={() => { setControlsOpen(prev => !prev); setInfoOpen(false); }}
        >
          <Settings size={20} />
          Controles
        </button>
        {activeGraph && (
          <button
            className={`mobile-action-btn${infoOpen ? ' is-active' : ''}`}
            onClick={() => { setInfoOpen(prev => !prev); setControlsOpen(false); }}
          >
            <Info size={20} />
            Explicação
          </button>
        )}
      </div>
    </div>
  );
};

export default FundamentalsPage;
