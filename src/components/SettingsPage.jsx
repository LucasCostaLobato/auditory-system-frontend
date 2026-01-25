import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { getInputSignal } from '../services/api';
import SettingsSidebar from './SettingsSidebar';
import SpectrumGraph from './SpectrumGraph';
import SpectrumExplanation from './SpectrumExplanation';
import './SettingsPage.css';

const SettingsPage = () => {
  const { updateSettings } = useSettings();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <SettingsSidebar onViewSpectrum={handleViewSpectrum} />
      <div className="settings-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <SpectrumGraph data={graphData} />
        )}
      </div>
      {graphData.length > 0 && <SpectrumExplanation />}
    </div>
  );
};

export default SettingsPage;
