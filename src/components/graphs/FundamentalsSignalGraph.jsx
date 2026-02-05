import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateNiceTicks, calculateLogTicks, formatTickValue } from '../../utils/graphUtils';
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

  // Calcula ticks redondos para os eixos X
  const timeMin = Math.min(...time);
  const timeMax = Math.max(...time);
  const timeTicks = calculateNiceTicks(timeMin, timeMax, 6);

  const freqMin = Math.min(...freq_vec);
  const freqMax = Math.max(...freq_vec);
  const freqTicks = calculateNiceTicks(freqMin, freqMax, 6);
  const freqLogTicks = calculateLogTicks(freqMin, freqMax);

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
              type="number"
              domain={[timeMin, timeMax]}
              ticks={timeTicks}
              tickFormatter={formatTickValue}
              label={{ value: t('fundamentals.timeAxis'), position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              type="number"
              domain={timeYDomain}
              allowDataOverflow={true}
              tickFormatter={(value) => Math.abs(value) < 0.01 ? '0' : Number(value).toPrecision(2)}
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
              type="number"
              scale={logScaleX ? 'log' : 'auto'}
              domain={[freqMin, freqMax]}
              ticks={logScaleX ? freqLogTicks : freqTicks}
              tickFormatter={formatTickValue}
              label={{ value: t('fundamentals.frequencyAxis'), position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              type="number"
              domain={spectrumYDomain}
              allowDataOverflow={true}
              tickFormatter={(value) => Math.abs(value) < 0.01 ? '0' : Number(value).toPrecision(2)}
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
