import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import './MiddleEarFRFGraph.css';
import '../common/GraphScaleControls.css';

const MiddleEarFRFGraph = ({ data, seriesMetadata = [] }) => {
  const { t } = useLanguage();
  const [logScaleX, setLogScaleX] = useState(false);
  const [logScaleY, setLogScaleY] = useState(false);

  const xAxisLabel = t('middleEar.frfFrequencyAxis');
  const yAxisLabel = t('middleEar.frfVelocityAxis');

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

  // Mapeia condições para nomes traduzidos
  const getConditionName = (conditionSuffix) => {
    if (conditionSuffix === 'healthy') {
      return t('middleEar.healthy');
    }
    // Extrai condição e severidade do sufixo (ex: "otosclerosis_medium")
    const parts = conditionSuffix.split('_');
    if (parts.length >= 2) {
      const condition = parts[0];
      const severity = parts[1];
      const conditionMap = {
        'otosclerosis': t('middleEar.otosclerosis'),
        'malleus': t('middleEar.malleusFixation')
      };
      const severityMap = {
        'low': t('middleEar.low'),
        'medium': t('middleEar.medium'),
        'high': t('middleEar.high')
      };
      // Handle "malleus_fixation_severity" case
      if (condition === 'malleus' && parts[1] === 'fixation' && parts.length >= 3) {
        return `${conditionMap['malleus']} (${severityMap[parts[2]] || parts[2]})`;
      }
      return `${conditionMap[condition] || condition} (${severityMap[severity] || severity})`;
    }
    return conditionSuffix;
  };

  // Gera nome da série para legenda
  const getSeriesDisplayName = (metadata) => {
    const measureName = getMeasureName(metadata.measure);
    const conditionName = getConditionName(metadata.conditionSuffix);
    return `${measureName} - ${conditionName}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{xAxisLabel}:</strong> {Number(label).toFixed(1)}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              <strong>{yAxisLabel} ({entry.name}):</strong> {Number(entry.value).toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="graph-placeholder">
        <p>{t('middleEar.clickToView')}</p>
      </div>
    );
  }

  // Se não houver metadados, usa comportamento antigo (extrai chaves dos dados)
  const dataKeys = seriesMetadata.length > 0
    ? seriesMetadata.map(m => m.dataKey)
    : Object.keys(data[0]).filter(key => key !== 'frequency');

  return (
    <div className="middle-ear-frf-graph">
      <h2>{t('middleEar.frfTitle')}</h2>
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
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="frequency"
            scale={logScaleX ? 'log' : 'auto'}
            domain={logScaleX ? ['auto', 'auto'] : undefined}
            label={{ value: xAxisLabel, position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Math.round(value)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            scale={logScaleY ? 'log' : 'auto'}
            domain={logScaleY ? ['auto', 'auto'] : undefined}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {seriesMetadata.length > 0
            ? seriesMetadata.map((metadata, index) => (
                <Line
                  key={metadata.dataKey}
                  type="monotone"
                  dataKey={metadata.dataKey}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  strokeDasharray={metadata.isHeld ? '5 5' : undefined}
                  dot={false}
                  name={getSeriesDisplayName(metadata)}
                />
              ))
            : dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                  name={getMeasureName(key)}
                />
              ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiddleEarFRFGraph;
