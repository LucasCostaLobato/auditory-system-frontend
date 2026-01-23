import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SpaceDomainGraph.css';

const SpaceDomainGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>Clique em "Executar análise no domínio do espaço" para visualizar o gráfico</p>
      </div>
    );
  }

  return (
    <div className="space-domain-graph">
      <h2>Análise no Domínio do Espaço</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="position"
            label={{ value: 'Posição no canal auditivo (mm)', position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            label={{ value: 'Pressão sonora (Pa)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#9b59b6"
            strokeWidth={2}
            dot={false}
            name="Pressão Sonora"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpaceDomainGraph;
