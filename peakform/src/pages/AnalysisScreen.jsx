import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import ThreeDCanvas from '../components/ThreeDCanvas';
import { Cpu, Terminal, ShieldAlert } from 'lucide-react';

const AnalysisScreen = () => {
  const { userProfile, setCurrentPage } = useApp();
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const scanSteps = [
    { time: 400, text: 'establishing secure encrypted telemetry handshake...' },
    { time: 1000, text: 'ingesting physiological baseline parameters...' },
    { time: 1600, text: 'mapping skeletal wire mesh joint boundaries...' },
    { time: 2200, text: 'simulating muscular torque loading capabilities...' },
    { time: 2800, text: 'running cardiovascular limits projection models...' },
    { time: 3400, text: 'balancing hormonal sleep recovery multipliers...' },
    { time: 4000, text: 'optimizing metabolic macronutrient fueling target ratios...' },
    { time: 4500, text: 'profile compilation completed. synchronizing dashboard...' }
  ];

  useEffect(() => {
    // Progress increment timer
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 45);

    // Logging outputs triggers
    scanSteps.forEach(step => {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, `[SYSTEM] ${step.text}`]);
      }, step.time);
      return () => clearTimeout(timeout);
    });

    // Final redirection
    const redirectTimeout = setTimeout(() => {
      setCurrentPage('dashboard');
    }, 4800);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.scannerPanel} className="glass-panel">
        
        {/* Banner header */}
        <div style={styles.panelHeader}>
          <div style={styles.indicatorPulse} />
          <h2 style={styles.title}>NEURAL CALIBRATION SEQUENCE</h2>
        </div>

        {/* Core Layout: Neural Brain Canvas Left, logs Console Right */}
        <div style={styles.grid}>
          {/* Synapses Canvas */}
          <div style={styles.canvasWrapper}>
            <ThreeDCanvas mode="brain" />
            <div style={styles.progressRing}>
              <span style={styles.progressText}>{progress}%</span>
              <span style={styles.progressSub}>CALIBRATED</span>
            </div>
          </div>

          {/* Diagnostic Console logs */}
          <div style={styles.consoleWrapper}>
            <div style={styles.consoleHeader}>
              <Terminal size={14} color="#7c4dff" />
              <span>AURA LOG DIAGNOSTICS</span>
            </div>
            
            <div style={styles.consoleLogs}>
              {logs.map((log, idx) => (
                <div key={idx} style={styles.logLine}>
                  <span style={styles.timestamp}>{new Date().toLocaleTimeString([], { hour12: false })}</span>
                  <span style={styles.logText}>{log}</span>
                </div>
              ))}
              <div style={styles.blinkingCursor} />
            </div>
          </div>
        </div>

        {/* Estimated calculations projections grid */}
        <div style={styles.resultsGrid}>
          <div style={styles.resultCard}>
            <span style={styles.resultLabel}>FITNESS INDEX PROJ.</span>
            <span style={styles.resultValue} className="cyan-gradient-text">78.5 / 100</span>
          </div>

          <div style={styles.resultCard}>
            <span style={styles.resultLabel}>TARGET METABOLIC RATE</span>
            <span style={styles.resultValue} className="neon-gradient-text">{userProfile.targetCalories} kcal</span>
          </div>

          <div style={styles.resultCard}>
            <span style={styles.resultLabel}>RECOVERY BASE HRV</span>
            <span style={styles.resultValue} className="violet-gradient-text">{userProfile.hrv} ms</span>
          </div>

          <div style={styles.resultCard}>
            <span style={styles.resultLabel}>EST. INTENSITY LIMIT</span>
            <span style={{ ...styles.resultValue, color: '#ff6d00' }}>88% 1RM</span>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '960px',
    margin: '40px auto',
    padding: '0 16px',
    width: '100%'
  },
  scannerPanel: {
    padding: '40px'
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    paddingBottom: '20px',
    marginBottom: '28px'
  },
  indicatorPulse: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#7c4dff',
    boxShadow: '0 0 12px #7c4dff',
    animation: 'pulse-neon 1.2s infinite'
  },
  title: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.4rem',
    fontWeight: '800',
    letterSpacing: '0.04em',
    color: '#ffffff'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '32px',
    marginBottom: '32px'
  },
  canvasWrapper: {
    height: '320px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.04)',
    background: 'radial-gradient(circle, rgba(124, 77, 255, 0.04) 0%, rgba(5,5,7,0.7) 100%)',
    overflow: 'hidden',
    position: 'relative'
  },
  progressRing: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    pointerEvents: 'none'
  },
  progressText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#7c4dff',
    lineHeight: '1',
    textShadow: '0 0 15px rgba(124, 77, 255, 0.3)'
  },
  progressSub: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: '0.05em'
  },
  consoleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '320px',
    backgroundColor: '#030305',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  consoleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 18px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: "'Outfit', sans-serif"
  },
  consoleLogs: {
    flex: 1,
    padding: '18px',
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#a78bfa',
    lineHeight: '1.4'
  },
  logLine: {
    display: 'flex',
    gap: '12px'
  },
  timestamp: {
    color: 'rgba(255,255,255,0.2)'
  },
  logText: {
    wordBreak: 'break-all'
  },
  blinkingCursor: {
    width: '6px',
    height: '12px',
    backgroundColor: '#7c4dff',
    animation: 'pulse-neon 0.8s infinite',
    marginTop: '4px'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  resultCard: {
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  resultLabel: {
    fontSize: '0.68rem',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.04em',
    fontFamily: "'Outfit', sans-serif"
  },
  resultValue: {
    fontSize: '1.25rem',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif"
  }
};

export default AnalysisScreen;
