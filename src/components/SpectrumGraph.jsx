import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './SpectrumGraph.css';
import './GraphScaleControls.css';

const SpectrumGraph = ({ data }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);
  const [logScaleY, setLogScaleY] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('settings.viewSpectrum')}</p>
      </div>
    );
  }

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
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            scale={logScaleX ? 'log' : 'auto'}
            domain={logScaleX ? ['auto', 'auto'] : undefined}
            label={{ value: t('settings.frequencyAxisLabel'), position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            scale={logScaleY ? 'log' : 'auto'}
            domain={logScaleY ? ['auto', 'auto'] : undefined}
            label={{ value: t('settings.amplitudeAxisLabel'), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amplitude"
            stroke="#3498db"
            strokeWidth={2}
            dot={false}
            name={t('settings.amplitudeAxisLabel')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpectrumGraph;
