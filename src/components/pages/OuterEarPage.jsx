import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { getOuterEarFRF, getSpaceDomainAnalysis, getFrequencyDomainAnalysis } from '../../services/api';
import OuterEarSidebar from '../sidebars/OuterEarSidebar';
import CanalFRFGraph from '../graphs/CanalFRFGraph';
import SpaceDomainGraph from '../graphs/SpaceDomainGraph';
import FrequencyDomainGraph from '../graphs/FrequencyDomainGraph';
import CanalFRFExplanation from '../explanations/CanalFRFExplanation';
import SpaceDomainExplanation from '../explanations/SpaceDomainExplanation';
import FrequencyDomainExplanation from '../explanations/FrequencyDomainExplanation';
import './OuterEarPage.css';

const OuterEarPage = () => {
  const { settings } = useSettings();
  const [activeGraph, setActiveGraph] = useState(null);
  const [frfData, setFrfData] = useState([]);
  const [spaceDomainData, setSpaceDomainData] = useState({ series: [], positions: [] });
  const [frequencyDomainData, setFrequencyDomainData] = useState({ series: [], frequencies: [] });
  const [loading, setLoading] = useState(false);

  const handleGetFRF = async (params) => {
    setLoading(true);
    setActiveGraph('frf');

    try {
      const response = await getOuterEarFRF({
        ecLength: params.canalLength,
        startFrequency: settings.startFrequency,
        endFrequency: settings.endFrequency,
        frequencyPoints: settings.frequencyPoints
      });

      // A API retorna { freq_vec: [], frf: [] }
      const xAxis = response.freq_vec || [];
      const yAxis = response.frf || [];

      const data = xAxis.map((x, index) => ({
        frequency: x,
        magnitude: yAxis[index]
      }));

      setFrfData(data);
    } catch (error) {
      console.error('Erro ao buscar FRF do canal auditivo:', error);
      // Limpa os dados em caso de erro
      setFrfData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteSpaceDomain = async (params) => {
    setLoading(true);
    setActiveGraph('spaceDomain');

    try {
      const response = await getSpaceDomainAnalysis({
        ecLength: params.canalLength,
        frequencies: params.frequencies,
        signalType: settings.signalType
      });

      // A API retorna { x_vec: [], "100.0": [], "500.0": [], "1000.0": [], ... }
      // Extraímos x_vec como eixo X e todas as outras chaves como séries Y
      const positions = response.x_vec || [];

      // Extrai todas as chaves que não sejam 'x_vec'
      const series = [];
      const frequencyLabels = [];

      Object.keys(response).forEach(key => {
        if (key !== 'x_vec') {
          series.push(response[key]);
          frequencyLabels.push(key); // Usa o nome da chave como está (ex: "100.0", "500.0")
        }
      });

      setSpaceDomainData({
        series,
        positions,
        frequencies: frequencyLabels
      });

    } catch (error) {
      console.error('Erro ao executar análise no domínio do espaço:', error);
      // Limpa os dados em caso de erro
      setSpaceDomainData({ series: [], positions: [], frequencies: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteFrequencyDomain = async (params) => {
    setLoading(true);
    setActiveGraph('frequencyDomain');

    try {
      const response = await getFrequencyDomainAnalysis({
        ecLength: params.canalLength,
        positions: params.positions,
        startFrequency: settings.startFrequency,
        endFrequency: settings.endFrequency,
        frequencyPoints: settings.frequencyPoints,
        signalType: settings.signalType
      });

      // A API retorna { freq_vec: [], "7.0": [], "25.0": [], ... }
      // Extraímos freq_vec como eixo X e todas as outras chaves como séries Y
      const frequencies = response.freq_vec || [];

      // Extrai todas as chaves que não sejam 'freq_vec'
      const series = [];
      const positionLabels = [];

      Object.keys(response).forEach(key => {
        if (key !== 'freq_vec') {
          series.push(response[key]);
          positionLabels.push(key); // Usa o nome da chave como está (ex: "7.0", "25.0")
        }
      });

      setFrequencyDomainData({
        series,
        frequencies,
        positions: positionLabels
      });

    } catch (error) {
      console.error('Erro ao executar análise no domínio da frequência:', error);
      // Limpa os dados em caso de erro
      setFrequencyDomainData({ series: [], frequencies: [], positions: [] });
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
      {activeGraph === 'frf' && <CanalFRFExplanation />}
      {activeGraph === 'spaceDomain' && <SpaceDomainExplanation />}
      {activeGraph === 'frequencyDomain' && <FrequencyDomainExplanation />}
    </div>
  );
};

export default OuterEarPage;
