import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './FundamentalsSignalGraph.css';
import '../common/GraphScaleControls.css';

const FundamentalsSignalGraph = ({ data }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);

  if (!data) {
    return (
      <div className="graph-placeholder">
        <p>{t('fundamentals.clickToView')}</p>
      </div>
    );
  }

  const { signal, time, spectrum, freq_vec } = data;

  // Prepara dados para o gráfico no domínio do tempo
  const timeData = time.map((t, i) => ({
    x: t,
    y: signal[i]
  }));

  // Prepara dados para o gráfico no domínio da frequência
  const spectrumData = freq_vec.map((f, i) => ({
    x: f,
    y: spectrum[i]
  }));

  // Calcula limites do eixo Y para o gráfico de tempo (mínimo: [-0.1, 0.1])
  const signalMin = Math.min(...signal);
  const signalMax = Math.max(...signal);
  const timeYDomain = [
    Math.min(signalMin, -0.1),
    Math.max(signalMax, 0.1)
  ];

  // Calcula limites do eixo Y para o gráfico de espectro (mínimo: [0, 0.1])
  const spectrumMax = Math.max(...spectrum);
  const spectrumYDomain = [0, Math.max(spectrumMax, 0.1)];

  const TimeTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{t('fundamentals.timeAxis')}:</strong> {Number(label).toPrecision(4)}</p>
          <p style={{ color: payload[0].color }}>
            <strong>{t('fundamentals.amplitudeAxis')}:</strong> {Number(payload[0].value).toPrecision(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  const SpectrumTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{t('fundamentals.frequencyAxis')}:</strong> {Number(label).toFixed(1)} Hz</p>
          <p style={{ color: payload[0].color }}>
            <strong>{t('fundamentals.amplitudeAxis')}:</strong> {Number(payload[0].value).toPrecision(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fundamentals-signal-graph">
      {/* Gráfico 1: Sinal no domínio do tempo */}
      <div className="graph-container">
        <h2>{t('fundamentals.timeGraphTitle')}</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={timeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              label={{ value: t('fundamentals.timeAxis'), position: 'insideBottom', offset: -10 }}
              tickFormatter={(value) => Number(value).toPrecision(3)}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis
              type="number"
              domain={timeYDomain}
              allowDataOverflow={true}
              tickFormatter={(value) => Number(value).toPrecision(2)}
              label={{ value: t('fundamentals.amplitudeAxis'), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<TimeTooltip />} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#3498db"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 2: Espectro de frequência */}
      <div className="graph-container">
        <h2>{t('fundamentals.spectrumGraphTitle')}</h2>
        <div className="scale-controls">
          <label className="scale-toggle">
            <span className="toggle-switch">
              <input
                type="checkbox"
                checked={logScaleX}
                onChange={(e) => setLogScaleX(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </span>
            {t('common.logScaleX')}
          </label>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={spectrumData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              scale={logScaleX ? 'log' : 'auto'}
              domain={logScaleX ? ['auto', 'auto'] : undefined}
              label={{ value: t('fundamentals.frequencyAxis'), position: 'insideBottom', offset: -10 }}
              tickFormatter={(value) => Math.round(value)}
              interval="preserveStartEnd"
              minTickGap={50}
            />
            <YAxis
              type="number"
              domain={spectrumYDomain}
              allowDataOverflow={true}
              tickFormatter={(value) => Number(value).toPrecision(2)}
              label={{ value: t('fundamentals.amplitudeAxis'), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <Tooltip content={<SpectrumTooltip />} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#e74c3c"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FundamentalsSignalGraph;
