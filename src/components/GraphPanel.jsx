import React, { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles/GraphPanel.css';

export default function GraphPanel({ analysisResults }) {
  // Find the first available result to display (can be extended to support switching between results)
  const activeResult = useMemo(() => {
    const results = Object.values(analysisResults);
    return results.find(result => result.data || result.loading) || { data: null, loading: false };
  }, [analysisResults]);

  // Get chart configuration from active result
  const chartConfig = activeResult.chartConfig || {};
  const data = activeResult.data;
  const loading = activeResult.loading;

  // Prepare chart options when data is available
  const chartOptions = useMemo(() => {
    if (!data || !data.freq_vec || !data.magnitude) {
      return null;
    }

    // Create data points array combining frequencies and magnitudes
    const chartData = data.freq_vec.map((freq, index) => [
      freq,
      data.magnitude[index]
    ]);

    // Use custom config or defaults
    const title = chartConfig.title || 'Espectro de magnitude do sinal de entrada';
    const color = chartConfig.color || '#3b82f6';

    return {
      chart: {
        type: 'line',
        backgroundColor: '#ffffff',
        height: null,
        marginBottom: 80,
        style: {
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }
      },
      title: {
        text: title,
        align: 'left',
        style: {
          color: '#1f2937',
          fontSize: '18px',
          fontWeight: '600'
        }
      },
      xAxis: {
        type: 'logarithmic',
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
        enabled: false
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
      series: [{
        name: 'Espectro',
        data: chartData,
        color: color,
        lineWidth: 2.5,
        shadow: {
          color: `rgba(59, 130, 246, 0.3)`,
          width: 3
        }
      }],
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
                lineColor: color,
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
  }, [data, chartConfig]);

  return (
    <section className="graph-panel">
      {loading ? (
        <div className="graph-loading">
          <p className="graph-loading-text">Carregando espectro...</p>
        </div>
      ) : chartOptions ? (
        <div style={{ height: '50vh', width: '100%' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { width: '100%', height: '100%' } }}
          />
        </div>
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