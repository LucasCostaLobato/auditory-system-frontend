import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateNiceTicks, calculateLogTicks, formatTickValue } from '../../utils/graphUtils';
import './FundamentalsVibrationGraph.css';
import '../common/GraphScaleControls.css';

const FundamentalsVibrationGraph = ({ data }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);
  const [logScaleY, setLogScaleY] = useState(false);

  if (!data) {
    return (
      <div className="graph-placeholder">
        <p>{t('fundamentals.clickToView')}</p>
      </div>
    );
  }

  const { freq_vec, frf } = data;

  const chartData = freq_vec.map((f, i) => ({
    x: f,
    y: frf[i]
  }));

  // Calcula limites do eixo Y com 10% de margem
  const frfMax = Math.max(...frf);
  const frfMin = Math.min(...frf);
  const frfRange = frfMax - frfMin;
  const frfPadding = frfRange * 0.1;
  const yDomain = [
    Math.min(frfMin - frfPadding, 0),
    frfMax + frfPadding
  ];

  // Calcula ticks redondos para o eixo X
  const freqMin = Math.min(...freq_vec);
  const freqMax = Math.max(...freq_vec);
  const freqTicks = calculateNiceTicks(freqMin, freqMax, 6);
  const freqLogTicks = calculateLogTicks(freqMin, freqMax);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{t('fundamentals.vibrationFrequencyAxis')}:</strong> {Number(label).toFixed(1)} Hz</p>
          <p style={{ color: payload[0].color }}>
            <strong>{t('fundamentals.vibrationAmplitudeAxis')}:</strong> {Number(payload[0].value).toPrecision(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fundamentals-vibration-graph">
      <h2>{t('fundamentals.vibrationGraphTitle')}</h2>
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
        <label className="scale-toggle">
          <span className="toggle-switch">
            <input
              type="checkbox"
              checked={logScaleY}
              onChange={(e) => setLogScaleY(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </span>
          {t('common.logScaleY')}
        </label>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
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
            label={{ value: t('fundamentals.vibrationFrequencyAxis'), position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            type="number"
            scale={logScaleY ? 'log' : 'auto'}
            domain={logScaleY ? ['auto', 'auto'] : yDomain}
            allowDataOverflow={true}
            tickFormatter={(value) => Math.abs(value) < 0.01 ? '0' : Number(value).toPrecision(2)}
            label={{ value: t('fundamentals.vibrationAmplitudeAxis'), angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#9b59b6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundamentalsVibrationGraph;
