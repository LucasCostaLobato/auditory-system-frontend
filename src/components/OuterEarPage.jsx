import { useState } from 'react';
import axios from 'axios';
import OuterEarSidebar from './OuterEarSidebar';
import CanalFRFGraph from './CanalFRFGraph';
import SpaceDomainGraph from './SpaceDomainGraph';
import FrequencyDomainGraph from './FrequencyDomainGraph';
import './OuterEarPage.css';

const OuterEarPage = () => {
  const [activeGraph, setActiveGraph] = useState(null);
  const [frfData, setFrfData] = useState([]);
  const [spaceDomainData, setSpaceDomainData] = useState([]);
  const [frequencyDomainData, setFrequencyDomainData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetFRF = async (params) => {
    setLoading(true);
    setActiveGraph('frf');

    try {
      // URL placeholder - será atualizada posteriormente
      const response = await axios.get('https://api.placeholder.com/outer-ear/frf', {
        params: {
          canal_length: params.canalLength
        }
      });

      // Assumindo que a API retorna { frequency: [], magnitude: [] }
      const data = response.data.frequency.map((freq, index) => ({
        frequency: freq,
        magnitude: response.data.magnitude[index]
      }));

      setFrfData(data);
    } catch (error) {
      console.error('Erro ao buscar FRF do canal auditivo:', error);

      // Dados de exemplo para teste (remover quando a API estiver funcionando)
      const mockData = [];
      for (let i = 0; i < 100; i++) {
        const freq = 20 + (20000 - 20) * (i / 99);
        const magnitude = -10 + Math.sin(freq / 1000) * 15 + Math.random() * 5;
        mockData.push({
          frequency: freq.toFixed(2),
          magnitude: magnitude.toFixed(2)
        });
      }

      setFrfData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteSpaceDomain = async (params) => {
    setLoading(true);
    setActiveGraph('spaceDomain');

    try {
      // URL placeholder - será atualizada posteriormente
      const response = await axios.get('https://api.placeholder.com/outer-ear/space-domain', {
        params: {
          canal_length: params.canalLength,
          frequencies: params.frequencies.join(',')
        }
      });

      // Assumindo que a API retorna { position: [], pressure: [] }
      const data = response.data.position.map((pos, index) => ({
        position: pos,
        pressure: response.data.pressure[index]
      }));

      setSpaceDomainData(data);
    } catch (error) {
      console.error('Erro ao executar análise no domínio do espaço:', error);

      // Dados de exemplo para teste (remover quando a API estiver funcionando)
      const mockData = [];
      const canalLength = params.canalLength || 25;

      for (let i = 0; i < 50; i++) {
        const position = (canalLength * i) / 49;
        const pressure = 0.02 + Math.sin(position / 5) * 0.01 + Math.random() * 0.005;
        mockData.push({
          position: position.toFixed(2),
          pressure: pressure.toFixed(4)
        });
      }

      setSpaceDomainData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteFrequencyDomain = async (params) => {
    setLoading(true);
    setActiveGraph('frequencyDomain');

    try {
      // URL placeholder - será atualizada posteriormente
      const response = await axios.get('https://api.placeholder.com/outer-ear/frequency-domain', {
        params: {
          canal_length: params.canalLength,
          positions: params.positions.join(',')
        }
      });

      // Assumindo que a API retorna { frequency: [], magnitude: [] }
      const data = response.data.frequency.map((freq, index) => ({
        frequency: freq,
        magnitude: response.data.magnitude[index]
      }));

      setFrequencyDomainData(data);
    } catch (error) {
      console.error('Erro ao executar análise no domínio da frequência:', error);

      // Dados de exemplo para teste (remover quando a API estiver funcionando)
      const mockData = [];

      for (let i = 0; i < 100; i++) {
        const freq = 20 + (20000 - 20) * (i / 99);
        const magnitude = 60 + Math.sin(freq / 2000) * 20 + Math.random() * 10;
        mockData.push({
          frequency: freq.toFixed(2),
          magnitude: magnitude.toFixed(2)
        });
      }

      setFrequencyDomainData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const renderGraph = () => {
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    switch (activeGraph) {
      case 'frf':
        return <CanalFRFGraph data={frfData} />;
      case 'spaceDomain':
        return <SpaceDomainGraph data={spaceDomainData} />;
      case 'frequencyDomain':
        return <FrequencyDomainGraph data={frequencyDomainData} />;
      default:
        return (
          <div className="graph-placeholder">
            <p>Selecione uma análise na barra lateral</p>
          </div>
        );
    }
  };

  return (
    <div className="outer-ear-page">
      <OuterEarSidebar
        onGetFRF={handleGetFRF}
        onExecuteSpaceDomain={handleExecuteSpaceDomain}
        onExecuteFrequencyDomain={handleExecuteFrequencyDomain}
      />
      <div className="outer-ear-content">
        {renderGraph()}
      </div>
    </div>
  );
};

export default OuterEarPage;
