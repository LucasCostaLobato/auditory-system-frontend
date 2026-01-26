import { useState } from 'react';
import MiddleEarSidebar from '../sidebars/MiddleEarSidebar';
import MiddleEarFRFGraph from '../graphs/MiddleEarFRFGraph';
import MiddleEarDynamicGraph from '../graphs/MiddleEarDynamicGraph';
import MiddleEarFRFExplanation from '../explanations/MiddleEarFRFExplanation';
import MiddleEarDynamicExplanation from '../explanations/MiddleEarDynamicExplanation';
import { getMiddleEarFRF, getMiddleEarDynamicBehavior } from '../../services/api';
import './MiddleEarPage.css';

const MiddleEarPage = () => {
  const [frfData, setFrfData] = useState([]);
  const [dynamicData, setDynamicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeGraph, setActiveGraph] = useState(null); // 'frf' ou 'dynamic'

  // Estado para curvas "held" - armazena séries com metadados
  const [heldFrfSeries, setHeldFrfSeries] = useState([]);
  const [heldDynamicSeries, setHeldDynamicSeries] = useState([]);

  // Parâmetros da requisição atual (para saber qual condição foi usada)
  const [currentFrfParams, setCurrentFrfParams] = useState(null);
  const [currentDynamicParams, setCurrentDynamicParams] = useState(null);

  // Gera um sufixo único baseado na condição e severidade
  const getConditionSuffix = (params) => {
    if (params.meCondition === 'healthy') {
      return 'healthy';
    }
    return `${params.meCondition}_${params.meSeverity}`;
  };

  // Transforma dados da API para formato do gráfico com sufixo de condição
  const transformData = (apiData, conditionSuffix) => {
    const frequencies = apiData.freq_vec || [];
    const measureKeys = Object.keys(apiData).filter(key => key !== 'freq_vec');

    const chartData = frequencies.map((frequency, index) => {
      const point = { frequency };
      measureKeys.forEach(measureKey => {
        // Adiciona sufixo da condição à chave
        point[`${measureKey}_${conditionSuffix}`] = apiData[measureKey][index];
      });
      return point;
    });

    // Retorna dados e metadados das séries
    const seriesInfo = measureKeys.map(key => ({
      dataKey: `${key}_${conditionSuffix}`,
      measure: key,
      conditionSuffix
    }));

    return { chartData, seriesInfo };
  };

  // Mescla dados held com dados atuais
  const mergeData = (currentData, heldSeries) => {
    if (heldSeries.length === 0) return currentData;

    // Cria um mapa de frequência -> dados
    const frequencyMap = new Map();

    // Adiciona dados held
    heldSeries.forEach(series => {
      series.data.forEach(point => {
        const existing = frequencyMap.get(point.frequency) || { frequency: point.frequency };
        Object.keys(point).forEach(key => {
          if (key !== 'frequency') {
            existing[key] = point[key];
          }
        });
        frequencyMap.set(point.frequency, existing);
      });
    });

    // Adiciona dados atuais
    currentData.forEach(point => {
      const existing = frequencyMap.get(point.frequency) || { frequency: point.frequency };
      Object.keys(point).forEach(key => {
        if (key !== 'frequency') {
          existing[key] = point[key];
        }
      });
      frequencyMap.set(point.frequency, existing);
    });

    // Converte de volta para array e ordena por frequência
    return Array.from(frequencyMap.values()).sort((a, b) => a.frequency - b.frequency);
  };

  // Coleta metadados de todas as séries (held + atual)
  const collectSeriesMetadata = (currentSeriesInfo, heldSeries) => {
    const metadata = [];

    // Adiciona metadados das séries held
    heldSeries.forEach(series => {
      series.seriesInfo.forEach(info => {
        metadata.push({
          ...info,
          isHeld: true
        });
      });
    });

    // Adiciona metadados das séries atuais
    currentSeriesInfo.forEach(info => {
      metadata.push({
        ...info,
        isHeld: false
      });
    });

    return metadata;
  };

  const handleViewFRF = async (params) => {
    setLoading(true);
    setActiveGraph('frf');

    try {
      const data = await getMiddleEarFRF(params);
      const conditionSuffix = getConditionSuffix(params);
      const { chartData, seriesInfo } = transformData(data, conditionSuffix);

      setFrfData(chartData);
      setCurrentFrfParams({ ...params, seriesInfo });
      setDynamicData([]);
      setCurrentDynamicParams(null);

    } catch (error) {
      console.error('Erro ao buscar FRF:', error);
      setFrfData([]);
      setCurrentFrfParams(null);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDynamic = async (params) => {
    setLoading(true);
    setActiveGraph('dynamic');

    try {
      const data = await getMiddleEarDynamicBehavior(params);
      const conditionSuffix = getConditionSuffix(params);
      const { chartData, seriesInfo } = transformData(data, conditionSuffix);

      setDynamicData(chartData);
      setCurrentDynamicParams({ ...params, seriesInfo });
      setFrfData([]);
      setCurrentFrfParams(null);

    } catch (error) {
      console.error('Erro ao buscar resposta à excitação:', error);
      setDynamicData([]);
      setCurrentDynamicParams(null);
    } finally {
      setLoading(false);
    }
  };

  // Handler para "Hold" - salva a curva atual
  const handleHold = () => {
    if (activeGraph === 'frf' && frfData.length > 0 && currentFrfParams) {
      setHeldFrfSeries(prev => [
        ...prev,
        {
          data: frfData,
          seriesInfo: currentFrfParams.seriesInfo,
          params: currentFrfParams
        }
      ]);
    } else if (activeGraph === 'dynamic' && dynamicData.length > 0 && currentDynamicParams) {
      setHeldDynamicSeries(prev => [
        ...prev,
        {
          data: dynamicData,
          seriesInfo: currentDynamicParams.seriesInfo,
          params: currentDynamicParams
        }
      ]);
    }
  };

  // Handler para "Clear" - limpa curvas held
  const handleClear = () => {
    if (activeGraph === 'frf') {
      setHeldFrfSeries([]);
    } else if (activeGraph === 'dynamic') {
      setHeldDynamicSeries([]);
    }
  };

  // Verifica se há dados atuais para segurar
  const hasCurrentData = () => {
    if (activeGraph === 'frf') return frfData.length > 0;
    if (activeGraph === 'dynamic') return dynamicData.length > 0;
    return false;
  };

  // Verifica se há curvas held
  const hasHeldData = () => {
    if (activeGraph === 'frf') return heldFrfSeries.length > 0;
    if (activeGraph === 'dynamic') return heldDynamicSeries.length > 0;
    return false;
  };

  // Prepara dados mesclados para o gráfico FRF
  const getMergedFrfData = () => {
    return mergeData(frfData, heldFrfSeries);
  };

  // Prepara dados mesclados para o gráfico Dynamic
  const getMergedDynamicData = () => {
    return mergeData(dynamicData, heldDynamicSeries);
  };

  // Prepara metadados das séries para o gráfico FRF
  const getFrfSeriesMetadata = () => {
    const currentSeriesInfo = currentFrfParams?.seriesInfo || [];
    return collectSeriesMetadata(currentSeriesInfo, heldFrfSeries);
  };

  // Prepara metadados das séries para o gráfico Dynamic
  const getDynamicSeriesMetadata = () => {
    const currentSeriesInfo = currentDynamicParams?.seriesInfo || [];
    return collectSeriesMetadata(currentSeriesInfo, heldDynamicSeries);
  };

  return (
    <div className="middle-ear-page">
      <MiddleEarSidebar
        onViewFRF={handleViewFRF}
        onViewDynamic={handleViewDynamic}
        onHold={handleHold}
        onClear={handleClear}
        hasCurrentData={hasCurrentData()}
        hasHeldData={hasHeldData()}
      />
      <div className="middle-ear-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeGraph === 'frf' && (
              <MiddleEarFRFGraph
                data={getMergedFrfData()}
                seriesMetadata={getFrfSeriesMetadata()}
              />
            )}
            {activeGraph === 'dynamic' && (
              <MiddleEarDynamicGraph
                data={getMergedDynamicData()}
                seriesMetadata={getDynamicSeriesMetadata()}
              />
            )}
            {!activeGraph && (
              <div className="graph-placeholder">
                <p>Selecione uma opção na barra lateral</p>
              </div>
            )}
          </>
        )}
      </div>
      {activeGraph === 'frf' && <MiddleEarFRFExplanation />}
      {activeGraph === 'dynamic' && <MiddleEarDynamicExplanation />}
    </div>
  );
};

export default MiddleEarPage;
