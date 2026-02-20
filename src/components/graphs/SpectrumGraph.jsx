import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { calculateNiceTicks, calculateLogTicks, formatTickValue } from '../../utils/graphUtils';
import './SpectrumGraph.css';
import '../common/GraphScaleControls.css';

const SpectrumGraph = ({ data }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);

  const xAxisLabel = t('settings.frequencyAxisLabel');
  const yAxisLabel = t('settings.amplitudeAxisLabel');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{xAxisLabel}:</strong> {Number(label).toFixed(1)}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              <strong>{yAxisLabel}:</strong> {Number(entry.value).toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('settings.viewSpectrum')}</p>
      </div>
    );
  }

  // Calcula ticks redondos para o eixo X
  const frequencies = data.map(d => d.frequency);
  const freqMin = Math.min(...frequencies);
  const freqMax = Math.max(...frequencies);
  const freqTicks = calculateNiceTicks(freqMin, freqMax, 6);
  const freqLogTicks = calculateLogTicks(freqMin, freqMax);

  return (
    <div className="spectrum-graph">
      <h2>{t('settings.spectrumGraphTitle')}</h2>
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
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            type="number"
            scale={logScaleX ? 'log' : 'auto'}
            domain={[freqMin, freqMax]}
            ticks={logScaleX ? freqLogTicks : freqTicks}
            tickFormatter={formatTickValue}
            label={{ value: xAxisLabel, position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="amplitude"
            stroke="#3498db"
            strokeWidth={2}
            dot={false}
            name={yAxisLabel}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpectrumGraph;
