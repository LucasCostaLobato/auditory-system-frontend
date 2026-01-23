import { useState } from 'react';
import axios from 'axios';
import SettingsSidebar from './SettingsSidebar';
import SpectrumGraph from './SpectrumGraph';
import './SettingsPage.css';

const SettingsPage = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewSpectrum = async (params) => {
    setLoading(true);

    try {
      // URL placeholder - será atualizada posteriormente
      const response = await axios.get('https://api.placeholder.com/spectrum', {
        params: {
          signal_type: params.signalType,
          start_freq: params.startFrequency,
          end_freq: params.endFrequency,
          num_points: params.frequencyPoints
        }
      });

      // Assumindo que a API retorna { frequency: [], amplitude: [] }
      // Transformando para o formato do gráfico
      const data = response.data.frequency.map((freq, index) => ({
        frequency: freq,
        amplitude: response.data.amplitude[index]
      }));

      setGraphData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do espectro:', error);

      // Dados de exemplo para teste (remover quando a API estiver funcionando)
      const mockData = [];
      const start = params.startFrequency || 20;
      const end = params.endFrequency || 20000;
      const points = params.frequencyPoints || 100;

      for (let i = 0; i < points; i++) {
        const freq = start + (end - start) * (i / (points - 1));
        const amplitude = -20 + Math.random() * 40;
        mockData.push({ frequency: freq.toFixed(2), amplitude: amplitude.toFixed(2) });
      }

      setGraphData(mockData);
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
    </div>
  );
};

export default SettingsPage;
