import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './FrequencyDomainGraph.css';

const FrequencyDomainGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>Clique em "Executar análise no domínio da frequência" para visualizar o gráfico</p>
      </div>
    );
  }

  return (
    <div className="frequency-domain-graph">
      <h2>Análise no Domínio da Frequência</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            label={{ value: 'Frequência (Hz)', position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            label={{ value: 'Magnitude da pressão (dB SPL)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="magnitude"
            stroke="#f39c12"
            strokeWidth={2}
            dot={false}
            name="Magnitude"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyDomainGraph;
