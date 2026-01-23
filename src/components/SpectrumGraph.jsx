import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SpectrumGraph.css';

const SpectrumGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>Clique em "Ver espectro" para visualizar o gráfico</p>
      </div>
    );
  }

  return (
    <div className="spectrum-graph">
      <h2>Espectro do Sinal</h2>
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
            label={{ value: 'Amplitude (dB)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amplitude"
            stroke="#3498db"
            strokeWidth={2}
            dot={false}
            name="Amplitude"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpectrumGraph;
