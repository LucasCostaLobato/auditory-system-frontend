import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './FrequencyDomainGraph.css';

const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#1abc9c', '#e67e22', '#95a5a6'];

const FrequencyDomainGraph = ({ data }) => {
  const { t } = useLanguage();

  if (!data || !data.series || data.series.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('outerEar.executeFrequencyDomain')}</p>
      </div>
    );
  }

  // Transforma os dados para formato compatível com Recharts
  // data.frequencies = [20, 21, 22, ...]
  // data.series = [[y1_0, y1_1, y1_2, ...], [y2_0, y2_1, y2_2, ...], ...]
  // data.positions = [0, 5, 10, ...]
  const chartData = data.frequencies.map((frequency, index) => {
    const point = { frequency };
    data.series.forEach((series, seriesIndex) => {
      point[`pos_${data.positions[seriesIndex]}`] = series[index];
    });
    return point;
  });

  return (
    <div className="frequency-domain-graph">
      <h2>{t('outerEar.frequencyDomainGraphTitle')}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
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
          {data.positions.map((pos, index) => (
            <Line
              key={`pos_${pos}`}
              type="monotone"
              dataKey={`pos_${pos}`}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              name={`${pos} mm`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyDomainGraph;
