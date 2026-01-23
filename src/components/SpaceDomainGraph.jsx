import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './SpaceDomainGraph.css';

const colors = ['#9b59b6', '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#1abc9c', '#e67e22', '#95a5a6'];

const SpaceDomainGraph = ({ data }) => {
  const { t } = useLanguage();

  if (!data || !data.series || data.series.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('outerEar.executeSpaceDomain')}</p>
      </div>
    );
  }

  // Transforma os dados para formato compatível com Recharts
  // data.positions = [0, 1, 2, ...]
  // data.series = [[y1_0, y1_1, y1_2, ...], [y2_0, y2_1, y2_2, ...], ...]
  // data.frequencies = [100, 500, 1000, ...]
  const chartData = data.positions.map((position, index) => {
    const point = { position };
    data.series.forEach((series, seriesIndex) => {
      point[`freq_${data.frequencies[seriesIndex]}`] = series[index];
    });
    return point;
  });

  return (
    <div className="space-domain-graph">
      <h2>{t('outerEar.spaceDomainGraphTitle')}</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="position"
            label={{ value: t('outerEar.distanceAxisLabel'), position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            label={{ value: t('outerEar.amplitudePaAxisLabel'), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {data.frequencies.map((freq, index) => (
            <Line
              key={`freq_${freq}`}
              type="monotone"
              dataKey={`freq_${freq}`}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              name={`${freq} Hz`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpaceDomainGraph;
