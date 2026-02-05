import { useState } from 'react';
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
      {activeGraph === 'acoustics' && <FundamentalsAcousticsExplanation />}
      {activeGraph === 'vibrations' && <FundamentalsVibrationsExplanation />}
    </div>
  );
};

export default FundamentalsPage;
