import React, { useState } from 'react';
import ThreeDCanvas from '../components/ThreeDCanvas';
import { Camera, AlertTriangle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const CheckinPage = () => {
  const [formType, setFormType] = useState('perfect'); // 'perfect' or 'poor_form'
  const [fatigue, setFatigue] = useState(4);
  const [muscleSoreness, setMuscleSoreness] = useState('Mild');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompleted(true);
    setTimeout(() => setCompleted(false), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        
        {/* --- LEFT COLUMN: CAM SCAN SIMULATOR --- */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={styles.scanPanel}>
            <div style={styles.panelTitleRow}>
              <Camera size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>AI Kinetic Form Scanner</h3>
            </div>
            <p style={styles.panelDesc}>Select form profile below to test AURA computer vision joint scan logic.</p>

            <div style={styles.scanControls}>
              <button 
                onClick={() => setFormType('perfect')}
                style={{
                  ...styles.formBtn,
                  ...(formType === 'perfect' ? styles.formBtnActiveGreen : {})
                }}
              >
                <ShieldCheck size={14} />
                <span>Test: Perfect Squat Depth</span>
              </button>
              
              <button 
                onClick={() => setFormType('poor_form')}
                style={{
                  ...styles.formBtn,
                  ...(formType === 'poor_form' ? styles.formBtnActiveRed : {})
                }}
              >
                <AlertTriangle size={14} />
                <span>Test: Knee Caving (Valgus)</span>
              </button>
            </div>

            <div style={styles.canvasWrapper}>
              <ThreeDCanvas mode="scanner" activeExercise={formType} />
            </div>

            <div style={styles.hudFooter}>
              <span style={styles.hudLabel}>CAMERA STREAM STATE:</span>
              <span style={styles.hudVal}>SYNCHRONIZED (SIMULATED PIPELINE)</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: QUESTIONNAIRE ASSESSOR --- */}
        <div style={styles.rightCol}>
          <div className="glass-panel" style={styles.formCard}>
            <div style={styles.panelTitleRow}>
              <Sparkles size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>Weekly Subjective Assessment</h3>
            </div>
            <p style={styles.panelDesc}>Submit central nervous system ratings to modify AI programming bounds.</p>

            {completed && (
              <div style={styles.alertSuccess}>
                Subjective indexes processed! AURA has adjusted today's intensity thresholds.
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.sliderGroup}>
                <div style={styles.sliderLabelRow}>
                  <span style={styles.sliderLabel}>Central Fatigue Rating</span>
                  <span style={styles.sliderVal}>{fatigue} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={fatigue}
                  onChange={(e) => setFatigue(e.target.value)}
                  style={styles.sliderInput}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Skeletal Muscle Soreness</label>
                <div style={styles.optionRow}>
                  {['None', 'Mild', 'Severe Strain'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setMuscleSoreness(s)}
                      style={{
                        ...styles.optionCard,
                        ...(muscleSoreness === s ? styles.optionCardActive : {})
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Mental Exertion & Motivation</label>
                <select style={styles.selectInput} className="form-input" defaultValue="optimal">
                  <option value="high">High Aerobic Drive</option>
                  <option value="optimal">Optimal Balance state</option>
                  <option value="low">Under-Recovered / Lethargic</option>
                </select>
              </div>

              <button type="submit" className="btn-premium btn-neon" style={{ width: '100%' }}>
                Log Telemetry Log Index
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
    alignItems: 'stretch'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  scanPanel: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    height: '620px'
  },
  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '6px'
  },
  panelTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#ffffff'
  },
  panelDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginBottom: '20px'
  },
  scanControls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  formBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#9ca3af',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.15s ease'
  },
  formBtnActiveGreen: {
    borderColor: '#00e676',
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    color: '#00e676',
    boxShadow: '0 0 12px rgba(0, 230, 118, 0.12)'
  },
  formBtnActiveRed: {
    borderColor: '#ff3d00',
    backgroundColor: 'rgba(255, 61, 0, 0.05)',
    color: '#ff3d00',
    boxShadow: '0 0 12px rgba(255, 61, 0, 0.12)'
  },
  canvasWrapper: {
    flex: 1,
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    background: '#030305',
    overflow: 'hidden',
    marginBottom: '16px'
  },
  hudFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '700',
    letterSpacing: '0.04em',
    fontFamily: "'Outfit', sans-serif"
  },
  hudLabel: {
    color: '#9ca3af'
  },
  hudVal: {
    color: '#00e5ff'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  formCard: {
    padding: '28px',
    minHeight: '450px'
  },
  alertSuccess: {
    backgroundColor: 'rgba(0, 230, 118, 0.06)',
    border: '1px solid rgba(0, 230, 118, 0.18)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#00e676',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sliderGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sliderLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "'Outfit', sans-serif"
  },
  sliderLabel: {
    color: '#9ca3af'
  },
  sliderVal: {
    color: '#00e676'
  },
  sliderInput: {
    width: '100%',
    accentColor: '#00e676',
    height: '6px',
    borderRadius: '3px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    cursor: 'pointer'
  },
  optionRow: {
    display: 'flex',
    gap: '10px'
  },
  optionCard: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'center'
  },
  optionCardActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    borderColor: '#00e676',
    boxShadow: '0 0 10px rgba(0, 230, 118, 0.1)'
  },
  selectInput: {
    width: '100%'
  }
};

// Inject checkin view responsive tweaks style block
const checkinLayoutSheet = document.createElement("style");
checkinLayoutSheet.innerText = `
  @media (max-width: 960px) {
    div[style*="checkinPageGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(checkinLayoutSheet);

export default CheckinPage;
