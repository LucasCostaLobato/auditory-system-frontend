import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './SpectrumGraph.css';

const SpectrumGraph = ({ data }) => {
  const { t } = useLanguage();

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
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            label={{ value: t('settings.frequencyAxisLabel'), position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
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
