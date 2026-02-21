import { useState, useEffect } from 'react';
import { Settings, Info } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { getInputSignal } from '../../services/api';
import SettingsSidebar from '../sidebars/SettingsSidebar';
import SpectrumGraph from '../graphs/SpectrumGraph';
import SpectrumExplanation from '../explanations/SpectrumExplanation';
import './SettingsPage.css';

const SettingsPage = () => {
  const { updateSettings } = useSettings();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const hasExplanation = graphData.length > 0;
  const anyDrawerOpen = controlsOpen || infoOpen;

  useEffect(() => {
    if (anyDrawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => document.body.classList.remove('drawer-open');
  }, [anyDrawerOpen]);

  const handleViewSpectrum = async (params) => {
    setLoading(true);

    // Salva as configurações no contexto global
    updateSettings({
      signalType: params.signalType,
      startFrequency: params.startFrequency,
      endFrequency: params.endFrequency,
      frequencyPoints: params.frequencyPoints
    });

    try {
      const response = await getInputSignal(params);

      // A API retorna { freq_vec: [], magnitude: [] }
      const xAxis = response.freq_vec || [];
      const yAxis = response.magnitude || [];

      const data = xAxis.map((x, index) => ({
        frequency: x,
        amplitude: yAxis[index]
      }));

      setGraphData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do espectro:', error);
      // Limpa os dados em caso de erro
      setGraphData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <SettingsSidebar
        onViewSpectrum={handleViewSpectrum}
        isOpen={controlsOpen}
        onClose={() => setControlsOpen(false)}
      />
      <div
        className={`sidebar-overlay${anyDrawerOpen ? ' is-visible' : ''}`}
        onClick={() => { setControlsOpen(false); setInfoOpen(false); }}
      />
      <div className="settings-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <SpectrumGraph data={graphData} />
        )}
      </div>
      {hasExplanation && (
        <SpectrumExplanation isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
      )}

      <div className="mobile-action-bar">
        <button
          className={`mobile-action-btn${controlsOpen ? ' is-active' : ''}`}
          onClick={() => { setControlsOpen(prev => !prev); setInfoOpen(false); }}
        >
          <Settings size={20} />
          Controles
        </button>
        {hasExplanation && (
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

export default SettingsPage;
