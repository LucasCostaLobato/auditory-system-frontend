import { useState } from 'react';
import InnerEarSidebar from '../sidebars/InnerEarSidebar';
import InnerEarEnvelopeGraph from '../graphs/InnerEarEnvelopeGraph';
import InnerEarTravellingWavesGraph from '../graphs/InnerEarTravellingWavesGraph';
import InnerEarEnvelopeExplanation from '../explanations/InnerEarEnvelopeExplanation';
import InnerEarTravellingWavesExplanation from '../explanations/InnerEarTravellingWavesExplanation';
import { getInnerEarBMEnvelope, getInnerEarTravellingWaves } from '../../services/api';
import './InnerEarPage.css';

const InnerEarPage = () => {
  const [envelopeData, setEnvelopeData] = useState([]);
  const [travellingWavesData, setTravellingWavesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeGraph, setActiveGraph] = useState(null); // 'envelope' ou 'travellingWaves'

  // Estado para curvas "held" - armazena séries com metadados
  const [heldEnvelopeSeries, setHeldEnvelopeSeries] = useState([]);

  // Parâmetros da requisição atual
  const [currentEnvelopeParams, setCurrentEnvelopeParams] = useState(null);

  // Gera um sufixo único baseado na frequência
  const getFrequencySuffix = (params) => {
    return `${params.freqStimulus}`;
  };

  // Transforma dados da API para formato do gráfico
  const transformEnvelopeData = (apiData, frequencySuffix) => {
    const xVec = apiData.x_vec || [];
    const envelope = apiData.envelope || [];

    const chartData = xVec.map((x, index) => ({
      x,
      [`envelope_${frequencySuffix}`]: envelope[index]
    }));

    const seriesInfo = [{
      dataKey: `envelope_${frequencySuffix}`,
      freqStimulus: frequencySuffix
    }];

    return { chartData, seriesInfo };
  };

  // Mescla dados held com dados atuais
  const mergeData = (currentData, heldSeries) => {
    if (heldSeries.length === 0) return currentData;

    // Cria um mapa de x -> dados
    const xMap = new Map();

    // Adiciona dados held
    heldSeries.forEach(series => {
      series.data.forEach(point => {
        const existing = xMap.get(point.x) || { x: point.x };
        Object.keys(point).forEach(key => {
          if (key !== 'x') {
            existing[key] = point[key];
          }
        });
        xMap.set(point.x, existing);
      });
    });

    // Adiciona dados atuais
    currentData.forEach(point => {
      const existing = xMap.get(point.x) || { x: point.x };
      Object.keys(point).forEach(key => {
        if (key !== 'x') {
          existing[key] = point[key];
        }
      });
      xMap.set(point.x, existing);
    });

    // Converte de volta para array e ordena por x
    return Array.from(xMap.values()).sort((a, b) => a.x - b.x);
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

  const handleViewEnvelope = async (params) => {
    setLoading(true);
    setActiveGraph('envelope');

    try {
      const data = await getInnerEarBMEnvelope(params);
      const frequencySuffix = getFrequencySuffix(params);
      const { chartData, seriesInfo } = transformEnvelopeData(data, frequencySuffix);

      setEnvelopeData(chartData);
      setCurrentEnvelopeParams({ ...params, seriesInfo });
      setTravellingWavesData(null);

    } catch (error) {
      console.error('Erro ao buscar envelope da MB:', error);
      setEnvelopeData([]);
      setCurrentEnvelopeParams(null);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTravellingWaves = async (params) => {
    setLoading(true);
    setActiveGraph('travellingWaves');

    try {
      const data = await getInnerEarTravellingWaves(params);
      setTravellingWavesData(data);
      setEnvelopeData([]);
      setCurrentEnvelopeParams(null);

    } catch (error) {
      console.error('Erro ao buscar ondas viajantes:', error);
      setTravellingWavesData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handler para "Hold" - salva a curva atual
  const handleHold = () => {
    if (activeGraph === 'envelope' && envelopeData.length > 0 && currentEnvelopeParams) {
      setHeldEnvelopeSeries(prev => [
        ...prev,
        {
          data: envelopeData,
          seriesInfo: currentEnvelopeParams.seriesInfo,
          params: currentEnvelopeParams
        }
      ]);
    }
  };

  // Handler para "Clear" - limpa curvas held
  const handleClear = () => {
    if (activeGraph === 'envelope') {
      setHeldEnvelopeSeries([]);
    }
  };

  // Verifica se há dados atuais para segurar
  const hasCurrentData = () => {
    if (activeGraph === 'envelope') return envelopeData.length > 0;
    return false;
  };

  // Verifica se há curvas held
  const hasHeldData = () => {
    if (activeGraph === 'envelope') return heldEnvelopeSeries.length > 0;
    return false;
  };

  // Prepara dados mesclados para o gráfico de envelope
  const getMergedEnvelopeData = () => {
    return mergeData(envelopeData, heldEnvelopeSeries);
  };

  // Prepara metadados das séries para o gráfico de envelope
  const getEnvelopeSeriesMetadata = () => {
    const currentSeriesInfo = currentEnvelopeParams?.seriesInfo || [];
    return collectSeriesMetadata(currentSeriesInfo, heldEnvelopeSeries);
  };

  return (
    <div className="inner-ear-page">
      <InnerEarSidebar
        onViewEnvelope={handleViewEnvelope}
        onViewTravellingWaves={handleViewTravellingWaves}
        onHold={handleHold}
        onClear={handleClear}
        hasCurrentData={hasCurrentData()}
        hasHeldData={hasHeldData()}
      />
      <div className="inner-ear-content">
        {loading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <>
            {activeGraph === 'envelope' && (
              <InnerEarEnvelopeGraph
                data={getMergedEnvelopeData()}
                seriesMetadata={getEnvelopeSeriesMetadata()}
              />
            )}
            {activeGraph === 'travellingWaves' && (
              <InnerEarTravellingWavesGraph data={travellingWavesData} />
            )}
            {!activeGraph && (
              <div className="graph-placeholder">
                <p>Selecione uma opção na barra lateral</p>
              </div>
            )}
          </>
        )}
      </div>
      {activeGraph === 'envelope' && <InnerEarEnvelopeExplanation />}
      {activeGraph === 'travellingWaves' && <InnerEarTravellingWavesExplanation />}
    </div>
  );
};

export default InnerEarPage;
