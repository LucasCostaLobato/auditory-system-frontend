import { useState, useEffect, useRef, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import './InnerEarTravellingWavesGraph.css';

const InnerEarTravellingWavesGraph = ({ data }) => {
  const { t } = useLanguage();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(50); // ms entre frames
  const animationRef = useRef(null);

  const xAxisLabel = t('innerEar.travellingWavesXAxis');
  const yAxisLabel = t('innerEar.travellingWavesYAxis');

  // Extrai dados do formato da API
  const xVec = data?.x_vec || [];
  const displacementFrames = data?.displacement || [];
  const totalFrames = displacementFrames.length;

  // Prepara dados do frame atual para o gráfico
  const getFrameData = useCallback((frameIndex) => {
    if (!xVec.length || !displacementFrames.length) return [];

    const frameData = displacementFrames[frameIndex] || [];
    return xVec.map((x, index) => ({
      x,
      displacement: frameData[index] || 0
    }));
  }, [xVec, displacementFrames]);

  const chartData = getFrameData(currentFrame);

  // Controle da animação
  useEffect(() => {
    if (isPlaying && totalFrames > 0) {
      animationRef.current = setInterval(() => {
        setCurrentFrame(prev => {
          if (prev >= totalFrames - 1) {
            // Para a animação ao chegar no último frame
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, totalFrames, playbackSpeed]);

  // Reset frame quando dados mudam
  useEffect(() => {
    setCurrentFrame(0);
    setIsPlaying(false);
  }, [data]);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSliderChange = (e) => {
    setCurrentFrame(parseInt(e.target.value, 10));
  };

  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseInt(e.target.value, 10));
  };

  const handleStepBackward = () => {
    setCurrentFrame(prev => (prev > 0 ? prev - 1 : totalFrames - 1));
  };

  const handleStepForward = () => {
    setCurrentFrame(prev => (prev < totalFrames - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p><strong>{xAxisLabel}:</strong> {Number(label).toFixed(2)}</p>
          <p style={{ color: payload[0].color }}>
            <strong>{yAxisLabel}:</strong> {Number(payload[0].value).toPrecision(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data || !xVec.length || !displacementFrames.length) {
    return (
      <div className="graph-placeholder">
        <p>{t('innerEar.clickToView')}</p>
      </div>
    );
  }

  // Calcula o domínio Y baseado em todos os frames para manter escala consistente
  const allValues = displacementFrames.flat();
  const yMin = Math.min(...allValues);
  const yMax = Math.max(...allValues);
  const yPadding = (yMax - yMin) * 0.1;

  return (
    <div className="inner-ear-travelling-waves-graph">
      <h2>{t('innerEar.travellingWavesTitle')}</h2>

      {/* Controles de animação */}
      <div className="animation-controls">
        <div className="playback-controls">
          <button
            className="control-button"
            onClick={handleReset}
            title={t('innerEar.reset')}
          >
            <SkipBack size={18} />
          </button>

          <button
            className="control-button"
            onClick={handleStepBackward}
            title={t('innerEar.stepBackward')}
          >
            <SkipBack size={14} />
          </button>

          <button
            className="control-button play-button"
            onClick={handlePlayPause}
            title={isPlaying ? t('innerEar.pause') : t('innerEar.play')}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            className="control-button"
            onClick={handleStepForward}
            title={t('innerEar.stepForward')}
          >
            <SkipForward size={14} />
          </button>
        </div>

        <div className="frame-slider">
          <label>{t('innerEar.frame')}: {currentFrame + 1} / {totalFrames}</label>
          <input
            type="range"
            min="0"
            max={totalFrames - 1}
            value={currentFrame}
            onChange={handleSliderChange}
            className="slider"
          />
        </div>

        <div className="speed-control">
          <label>{t('innerEar.speed')}:</label>
          <select value={playbackSpeed} onChange={handleSpeedChange}>
            <option value="100">0.5x</option>
            <option value="50">1x</option>
            <option value="25">2x</option>
            <option value="10">5x</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            label={{ value: xAxisLabel, position: 'insideBottom', offset: -10 }}
            tickFormatter={(value) => Number(value).toFixed(1)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={[yMin - yPadding, yMax + yPadding]}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            tickFormatter={(value) => Number(value).toPrecision(2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="displacement"
            stroke="#9b59b6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InnerEarTravellingWavesGraph;
