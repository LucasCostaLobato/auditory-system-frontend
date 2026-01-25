import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import './MiddleEarDynamicGraph.css';
import './GraphScaleControls.css';

const MiddleEarDynamicGraph = ({ data }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);
  const [logScaleY, setLogScaleY] = useState(false);

  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('middleEar.clickToView')}</p>
      </div>
    );
  }

  // Extrai as chaves de dados (exceto 'frequency')
  const dataKeys = Object.keys(data[0]).filter(key => key !== 'frequency');

  // Paleta de cores para múltiplas séries
  const colors = ['#9b59b6', '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#1abc9c', '#e67e22', '#95a5a6'];

  // Mapeia nomes técnicos para nomes traduzidos
  const getMeasureName = (key) => {
    const nameMap = {
      'tympanic_membrane': t('middleEar.tympanicMembrane'),
      'malleus': t('middleEar.malleus'),
      'incus': t('middleEar.incus'),
      'stapes': t('middleEar.stapes')
    };
    return nameMap[key] || key;
  };

  return (
    <div className="middle-ear-dynamic-graph">
      <h2>{t('middleEar.dynamicTitle')}</h2>
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
            label={{ value: t('middleEar.dynamicFrequencyAxis'), position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            scale={logScaleY ? 'log' : 'auto'}
            domain={logScaleY ? ['auto', 'auto'] : undefined}
            label={{ value: t('middleEar.dynamicVelocityAxis'), angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              name={getMeasureName(key)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiddleEarDynamicGraph;
