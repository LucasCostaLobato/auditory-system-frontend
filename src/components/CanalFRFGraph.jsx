import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './CanalFRFGraph.css';

const CanalFRFGraph = ({ data }) => {
  const { t } = useLanguage();

  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('outerEar.getFRF')}</p>
      </div>
    );
  }

  return (
    <div className="canal-frf-graph">
      <h2>{t('outerEar.frfGraphTitle')}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            label={{ value: t('outerEar.frequencyAxisLabel'), position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            label={{ value: t('outerEar.amplitudeDbAxisLabel'), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="magnitude"
            stroke="#e74c3c"
            strokeWidth={2}
            dot={false}
            name="Magnitude"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CanalFRFGraph;
