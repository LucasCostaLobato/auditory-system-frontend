import React, { useMemo, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles/GraphPanel.css';

export default function GraphPanel({ analysisResults }) {
  const [xAxisType, setXAxisType] = useState('linear');

  // Find the most recently updated result to display based on timestamp
  const activeResult = useMemo(() => {
    // Get all results with data or loading state
    const resultsWithData = Object.entries(analysisResults)
      .map(([key, result]) => ({ key, ...result }))
      .filter(result => (result.data || result.loading) && result.timestamp);

    if (resultsWithData.length === 0) {
      return { data: null, loading: false };
    }

    // Sort by timestamp and return the most recent one
    resultsWithData.sort((a, b) => b.timestamp - a.timestamp);
    return resultsWithData[0];
  }, [analysisResults]);

  // Get chart configuration from active result
  const chartConfig = activeResult.chartConfig || {};
  const data = activeResult.data;
  const loading = activeResult.loading;

  // Prepare chart options when data is available
  const chartOptions = useMemo(() => {
    if (!data || !data.freq_vec) {
      return null;
    }

    // Use custom config or defaults
    const title = chartConfig.title || 'Espectro de magnitude do sinal de entrada';
    const color = chartConfig.color || '#3b82f6';

    // Determine if this is a multi-series chart (has position keys) or single series (has magnitude)
    // TODO: Adicionar uma condição menos dependente da regra lógica. Ou seja uma condição que apenas
    // verifique se o dado tem mais de um array a ser plotado. Além disso, a variavel positionKeys
    // também está dependente da regra lógica. Na prática, deve ser apenas labelKey e não position key
    // visto que também vai se aplicar a frequencyKey, por exemplo (e tantas outras que possam ser criadas)
    const isMultiSeries = !data.magnitude;
    let seriesData;

    if (isMultiSeries) {
      // Multi-series: create one series per position
      const positionKeys = Object.keys(data).filter(key => key !== 'freq_vec');
      const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

      seriesData = positionKeys.map((posKey, index) => ({
        name: `Posição ${posKey} mm`,
        data: data.freq_vec.map((freq, i) => [freq, data[posKey][i]]),
        color: colors[index % colors.length],
        lineWidth: 2,
        shadow: {
          color: `${colors[index % colors.length]}33`,
          width: 2
        }
      }));
    } else {
      // Single series: use magnitude array
      seriesData = [{
        name: 'Espectro',
        data: data.freq_vec.map((freq, index) => [freq, data.magnitude[index]]),
        color: color,
        lineWidth: 2.5,
        shadow: {
          color: `rgba(59, 130, 246, 0.3)`,
          width: 3
        }
      }];
    }

    return {
      chart: {
        type: 'line',
        backgroundColor: '#ffffff',
        height: null,
        marginTop: 30,
        // marginTop: isMultiSeries ? 30 : 30,
        marginBottom: 70,
        zoomType: 'xy',
        style: {
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }
      },
      title: {
        text: title,
        align: 'left',
        y:7,
        style: {
          color: '#1f2937',
          fontSize: '16px',
          fontWeight: '600'
        }
      },
      xAxis: {
        type: xAxisType,
        min: data.freq_vec[0],
        max: data.freq_vec[data.freq_vec.length - 1],
        title: {
          text: 'Frequência (Hz)',
          enabled: true,
          margin: 15,
          style: {
            color: '#374151',
            fontSize: '13px',
            fontWeight: '500'
          }
        },
        labels: {
          style: {
            color: '#6b7280',
            fontSize: '12px'
          },
          formatter: function() {
            return this.value >= 1000 ? (this.value/1000) + 'k' : this.value;
          }
        },
        gridLineColor: '#e5e7eb',
        gridLineWidth: 1,
        minorGridLineColor: '#f3f4f6',
        minorGridLineWidth: 0.5
      },
      yAxis: {
        min: 40,
        max: 110,
        title: {
          text: 'Magnitude (dB)',
          style: {
            color: '#374151',
            fontSize: '13px',
            fontWeight: '500'
          }
        },
        labels: {
          style: {
            color: '#6b7280',
            fontSize: '12px'
          }
        },
        gridLineColor: '#e5e7eb',
        gridLineWidth: 1
      },
      legend: {
        enabled: isMultiSeries,
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal',
        y: -45,
        itemStyle: {
          color: '#374151',
          fontSize: '12px',
          fontWeight: '500'
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        borderColor: '#374151',
        borderRadius: 8,
        style: {
          color: '#ffffff',
          fontSize: '13px'
        },
        headerFormat: '',
        pointFormat: '<b>Frequência:</b> {point.x:.1f} Hz<br/><b>Magnitude:</b> {point.y:.2f} dB',
        shadow: true
      },
      series: seriesData,
      credits: {
        enabled: false
      },
      plotOptions: {
        line: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
                radius: 4,
                lineWidth: 2,
                fillColor: '#ffffff'
              }
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              enabled: false
            }
          }
        }]
      }
    };
  }, [data, chartConfig, xAxisType]);

  return (
    <section className="graph-panel">
      {loading ? (
        <div className="graph-loading">
          <p className="graph-loading-text">Carregando espectro...</p>
        </div>
      ) : chartOptions ? (
        <>
          <div className="graph-controls">
            <label className="axis-type-label">
              Escala do eixo X:
              <select
                value={xAxisType}
                onChange={(e) => setXAxisType(e.target.value)}
                className="axis-type-selector"
              >
                <option value="linear">Linear</option>
                <option value="logarithmic">Logarítmica</option>
              </select>
            </label>
          </div>
          <div style={{ height: '50vh', width: '100%' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              containerProps={{ style: { width: '100%', height: '100%' } }}
            />
          </div>
        </>
      ) : (
        <div className="graph-placeholder">
          <div className="graph-placeholder-content">
            <BarChart3 size={48} className="graph-placeholder-icon" />
            <p className="graph-placeholder-title">Gráficos serão exibidos aqui</p>
            <p className="graph-placeholder-subtitle">Clique em "Ver espectro" para gerar o gráfico</p>
          </div>
        </div>
      )}
    </section>
  );
}