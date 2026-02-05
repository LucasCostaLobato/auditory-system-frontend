import { useState } from 'react';
import FundamentalsSidebar from '../sidebars/FundamentalsSidebar';
import FundamentalsSignalGraph from '../graphs/FundamentalsSignalGraph';
import FundamentalsAcousticsExplanation from '../explanations/FundamentalsAcousticsExplanation';
import { getFundamentalsAcoustics } from '../../services/api';
import './FundamentalsPage.css';

const FundamentalsPage = () => {
  const [signalData, setSignalData] = useState(null);
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

  return (
    <div className="fundamentals-page">
      <FundamentalsSidebar
        onViewSignal={handleViewSignal}
      />
      <div className="fundamentals-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeGraph === 'acoustics' && (
              <FundamentalsSignalGraph data={signalData} />
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
    </div>
  );
};

export default FundamentalsPage;
