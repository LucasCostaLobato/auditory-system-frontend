import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Plus, X, Volume2, VolumeX } from 'lucide-react';
import './FundamentalsSidebar.css';

const FundamentalsSidebar = ({ onViewSignal, onViewSpectrum, isOpen, onClose }) => {
  const { t } = useLanguage();

  const [sineWaves, setSineWaves] = useState([
    { amplitude: 1, frequency: 10, phase: 0 }
  ]);

  const [medium, setMedium] = useState('air');

  const [mass, setMass] = useState(1);
  const [stiffness, setStiffness] = useState(1000);
  const [damping, setDamping] = useState(150);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef(null);
  const gainRef = useRef(null);
  const stopTimeoutRef = useRef(null);

  const soundSpeed = medium === 'air' ? 343 : 1500;

  const handleAddWave = () => {
    setSineWaves(prev => [...prev, { amplitude: 1, frequency: 10, phase: 0 }]);
  };

  const handleRemoveWave = (index) => {
    setSineWaves(prev => prev.filter((_, i) => i !== index));
  };

  const handleWaveChange = (index, field, value) => {
    setSineWaves(prev => prev.map((wave, i) =>
      i === index ? { ...wave, [field]: value } : wave
    ));
  };

  const handleViewSignal = () => {
    const params = {
      amplitudes: sineWaves.map(w => parseFloat(w.amplitude)),
      frequencies: sineWaves.map(w => parseFloat(w.frequency)),
      phases: sineWaves.map(w => parseFloat(w.phase)),
      medium
    };
    onViewSignal(params);
    onClose?.();
  };

  const handleViewSpectrum = () => {
    const params = {
      mass: parseFloat(mass),
      stiffness: parseFloat(stiffness),
      damping: parseFloat(damping)
    };
    onViewSpectrum(params);
    onClose?.();
  };

  const stopAudio = () => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    if (oscillatorsRef.current) {
      oscillatorsRef.current.forEach(osc => { try { osc.stop(); } catch (_) {} });
      oscillatorsRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    gainRef.current = null;
    setIsPlaying(false);
  };

  const handlePlaySignal = () => {
    if (isPlaying) { stopAudio(); return; }

    // Build wave list (phase in radians, filter out zero-frequency)
    const waves = sineWaves
      .map(w => ({
        amplitude: parseFloat(w.amplitude) || 0,
        frequency: parseFloat(w.frequency) || 0,
        phase: ((parseFloat(w.phase) || 0) * Math.PI) / 180
      }))
      .filter(w => w.frequency > 0);

    if (waves.length === 0) return;

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Normalise amplitudes so peak stays ≤ 0.7 to avoid clipping
    const totalPeak = waves.reduce((s, w) => s + Math.abs(w.amplitude), 0);
    const norm = totalPeak > 0 ? 0.7 / totalPeak : 1;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // sin(ωt + φ) = sin(φ)·cos(ωt) + cos(φ)·sin(ωt)
    // PeriodicWave: x(t) = real[1]·cos(ωt) + imag[1]·sin(ωt)
    const oscs = waves.map(({ amplitude, frequency, phase }) => {
      const a = amplitude * norm;
      const real = new Float32Array([0, a * Math.sin(phase)]);
      const imag = new Float32Array([0, a * Math.cos(phase)]);
      const periodicWave = ctx.createPeriodicWave(real, imag, { disableNormalization: true });

      const osc = ctx.createOscillator();
      osc.setPeriodicWave(periodicWave);
      osc.frequency.value = frequency;
      osc.connect(masterGain);
      osc.start();
      return osc;
    });

    oscillatorsRef.current = oscs;
    setIsPlaying(true);

    // Fade out over last 0.3 s, total duration 3 s
    const duration = 3;
    masterGain.gain.setValueAtTime(1, ctx.currentTime + duration - 0.3);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    stopTimeoutRef.current = setTimeout(stopAudio, duration * 1000);
  };

  useEffect(() => stopAudio, []); // cleanup on unmount

  return (
    <div className={`fundamentals-sidebar${isOpen ? ' is-open' : ''}`}>
      <div className="page-sidebar-close">
        <button className="page-sidebar-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={22} />
        </button>
      </div>
      {/* Seção: Acústica */}
      <div className="fundamentals-section">
        <h3 className="section-title">{t('fundamentals.acousticsSection')}</h3>

        <div className="medium-group">
          <label className="field-label">{t('fundamentals.propagationMedium')}</label>
          <select
            className="field-select"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
          >
            <option value="air">{t('fundamentals.mediumAir')}</option>
            <option value="water">{t('fundamentals.mediumWater')}</option>
          </select>
        </div>
        <p className="sound-speed-info">
          {t('fundamentals.soundSpeed')} = {soundSpeed} m/s
        </p>

        <h4 className="subsection-title">{t('fundamentals.sineWaveSubsection')}</h4>

        {sineWaves.map((wave, index) => (
          <div key={index} className="sine-wave-row">
            <div className="sine-wave-header">
              <span className="wave-label">{t('fundamentals.wave')} {index + 1}</span>
              {sineWaves.length > 1 && (
                <button
                  className="remove-wave-button"
                  onClick={() => handleRemoveWave(index)}
                  title={t('fundamentals.removeWave')}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="sine-wave-fields">
              <div className="field-group">
                <label className="field-label">{t('fundamentals.amplitude')}</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    className="field-input"
                    value={wave.amplitude}
                    onChange={(e) => handleWaveChange(index, 'amplitude', e.target.value)}
                    step="0.1"
                  />
                  <span className="input-unit">Pa</span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">{t('fundamentals.frequency')}</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    className="field-input"
                    value={wave.frequency}
                    onChange={(e) => handleWaveChange(index, 'frequency', e.target.value)}
                    step="1"
                    min="1"
                  />
                  <span className="input-unit">Hz</span>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">{t('fundamentals.phase')}</label>
                <div className="input-with-unit">
                  <input
                    type="number"
                    className="field-input"
                    value={wave.phase}
                    onChange={(e) => handleWaveChange(index, 'phase', e.target.value)}
                    step="0.1"
                  />
                  <span className="input-unit">deg</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          className="add-wave-button"
          onClick={handleAddWave}
          title={t('fundamentals.addWave')}
        >
          <Plus size={18} />
          {t('fundamentals.addWave')}
        </button>

        <div className="button-group">
          <button
            className="fundamentals-button"
            onClick={handleViewSignal}
          >
            {t('fundamentals.viewSignal')}
          </button>
          <button
            className={`play-signal-button${isPlaying ? ' is-playing' : ''}`}
            onClick={handlePlaySignal}
          >
            {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {isPlaying ? t('fundamentals.stopSignal') : t('fundamentals.playSignal')}
          </button>
        </div>
      </div>

      {/* Seção: Vibrações */}
      <div className="fundamentals-section">
        <h3 className="section-title">{t('fundamentals.vibrationsSection')}</h3>

        <h4 className="subsection-title">{t('fundamentals.sdofSubsection')}</h4>

        <div className="vibration-fields">
          <div className="field-group">
            <label className="field-label">{t('fundamentals.mass')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                step="0.1"
                min="0.01"
              />
              <span className="input-unit">kg</span>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t('fundamentals.stiffness')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={stiffness}
                onChange={(e) => setStiffness(e.target.value)}
                step="1"
                min="0.01"
              />
              <span className="input-unit">kN/m</span>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">{t('fundamentals.damping')}</label>
            <div className="input-with-unit">
              <input
                type="number"
                className="field-input"
                value={damping}
                onChange={(e) => setDamping(e.target.value)}
                step="0.1"
                min="0"
              />
              <span className="input-unit">Ns/m</span>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            className="fundamentals-button"
            onClick={handleViewSpectrum}
          >
            {t('fundamentals.viewSpectrumVibSystem')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundamentalsSidebar;
