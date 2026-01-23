import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CanalFRFGraph.css';

const CanalFRFGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>Clique em "Obter FRF do canal auditivo" para visualizar o gráfico</p>
      </div>
    );
  }

  return (
    <div className="canal-frf-graph">
      <h2>Função de Resposta em Frequência do Canal Auditivo</h2>
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
            label={{ value: 'Magnitude (dB)', angle: -90, position: 'insideLeft' }}
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
