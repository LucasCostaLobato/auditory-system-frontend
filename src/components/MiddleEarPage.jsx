import { useState } from 'react';
import MiddleEarSidebar from './MiddleEarSidebar';
import MiddleEarFRFGraph from './MiddleEarFRFGraph';
import MiddleEarDynamicGraph from './MiddleEarDynamicGraph';
import { getMiddleEarFRF, getMiddleEarDynamicBehavior } from '../services/api';
import './MiddleEarPage.css';

const MiddleEarPage = () => {
  const [frfData, setFrfData] = useState([]);
  const [dynamicData, setDynamicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGraph, setActiveGraph] = useState(null); // 'frf' ou 'dynamic'

  const handleViewFRF = async (params) => {
    setLoading(true);
    setActiveGraph('frf');

    try {
      const data = await getMiddleEarFRF(params);

      // Transformar dados da API para o formato do gráfico
      // A API retorna: { freq_vec: [], measure_name1: [...], measure_name2: [...], ... }
      const frequencies = data.freq_vec || [];

      // Extrai todas as chaves exceto freq_vec (essas são as medidas)
      const measureKeys = Object.keys(data).filter(key => key !== 'freq_vec');

      const chartData = frequencies.map((frequency, index) => {
        const point = { frequency };

        // Adiciona cada série de medida
        measureKeys.forEach(measureKey => {
          point[measureKey] = data[measureKey][index];
        });

        return point;
      });

      setFrfData(chartData);
      setDynamicData([]); // Limpa o outro gráfico

    } catch (error) {
      console.error('Erro ao buscar FRF:', error);
      setFrfData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDynamic = async (params) => {
    setLoading(true);
    setActiveGraph('dynamic');

    try {
      const data = await getMiddleEarDynamicBehavior(params);

      // Transformar dados da API para o formato do gráfico
      // Assumindo que a API retorna: { freq_vec: [], series: { measure_name: [...] } }
      const frequencies = data.freq_vec || [];
      const series = data.series || {};

      const chartData = frequencies.map((frequency, index) => {
        const point = { frequency };

        // Adiciona cada série de medida
        Object.keys(series).forEach(measureKey => {
          point[measureKey] = series[measureKey][index];
        });

        return point;
      });

      setDynamicData(chartData);
      setFrfData([]); // Limpa o outro gráfico

    } catch (error) {
      console.error('Erro ao buscar resposta à excitação:', error);
      setDynamicData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="middle-ear-page">
      <MiddleEarSidebar
        onViewFRF={handleViewFRF}
        onViewDynamic={handleViewDynamic}
      />
      <div className="middle-ear-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeGraph === 'frf' && <MiddleEarFRFGraph data={frfData} />}
            {activeGraph === 'dynamic' && <MiddleEarDynamicGraph data={dynamicData} />}
            {!activeGraph && (
              <div className="graph-placeholder">
                <p>Selecione uma opção na barra lateral</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MiddleEarPage;
