import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Shield, ToggleLeft, ToggleRight, Sparkles, CheckCircle2 } from 'lucide-react';

const SettingsPage = () => {
  const { userProfile, updateProfile, integrations, toggleIntegration } = useApp();
  
  // Local inputs states
  const [name, setName] = useState(userProfile.name);
  const [goal, setGoal] = useState(userProfile.goal);
  const [weight, setWeight] = useState(userProfile.weight);
  const [height, setHeight] = useState(userProfile.height);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      goal,
      weight: parseFloat(weight),
      height: parseInt(height)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        
        {/* --- LEFT COLUMN: PROFILE DATA CONFIG --- */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={styles.panel}>
            <div style={styles.panelTitleRow}>
              <Settings size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>Athlete Configuration Registry</h3>
            </div>
            <p style={styles.panelDesc}>Configure your biometric parameters. AURA will adapt calibration scales immediately.</p>

            {saved && (
              <div style={styles.alertSuccess}>
                Configuration successfully committed! Physiological values adjusted.
              </div>
            )}

            <form onSubmit={handleSave} style={styles.form}>
              <div style={styles.inputGroup}>
                <label className="form-label">Athlete Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label className="form-label">Active Performance Target</label>
                <select 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)}
                  className="form-input"
                >
                  <option value="Athletic Performance">Athletic Performance</option>
                  <option value="Hypertrophy">Strength & Size (Hypertrophy)</option>
                  <option value="Endurance">Aerobic Endurance</option>
                  <option value="Longevity">Health Optimization & Longevity</option>
                </select>
              </div>

              <div style={styles.sideBySideRow}>
                <div>
                  <label className="form-label">Mass Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="form-input"
                    step="0.1"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-premium btn-neon" style={{ marginTop: '10px' }}>
                Commit Profile Registry
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT COLUMN: API HEALTH CONNECTIONS --- */}
        <div style={styles.rightCol}>
          <div className="glass-panel" style={styles.panel}>
            <div style={styles.panelTitleRow}>
              <Shield size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>Encrypted Health API Bridges</h3>
            </div>
            <p style={styles.panelDesc}>Connect wearable sensor telemetry feeds directly into AURA program logic.</p>

            <div style={styles.apiList}>
              <div style={styles.apiItem}>
                <div style={styles.apiInfo}>
                  <span style={styles.apiName}>Whoop Telemetry API v4</span>
                  <span style={styles.apiDesc}>Sync sleep phases, HRV indices, and active strain coefficients.</span>
                </div>
                <button onClick={() => toggleIntegration('whoop')} style={styles.toggleBtn}>
                  {integrations.whoop ? (
                    <ToggleRight size={28} color="#00e676" />
                  ) : (
                    <ToggleLeft size={28} color="#6b7280" />
                  )}
                </button>
              </div>

              <div style={styles.apiItem}>
                <div style={styles.apiInfo}>
                  <span style={styles.apiName}>Strava Activities API</span>
                  <span style={styles.apiDesc}>Auto-publish completed sessions and download anaerobic metrics.</span>
                </div>
                <button onClick={() => toggleIntegration('strava')} style={styles.toggleBtn}>
                  {integrations.strava ? (
                    <ToggleRight size={28} color="#00e676" />
                  ) : (
                    <ToggleLeft size={28} color="#6b7280" />
                  )}
                </button>
              </div>

              <div style={styles.apiItem}>
                <div style={styles.apiInfo}>
                  <span style={styles.apiName}>Apple HealthKit Protocol</span>
                  <span style={styles.apiDesc}>Fetch background step cycles, active hydration, and VO2 estimates.</span>
                </div>
                <button onClick={() => toggleIntegration('appleHealth')} style={styles.toggleBtn}>
                  {integrations.appleHealth ? (
                    <ToggleRight size={28} color="#00e676" />
                  ) : (
                    <ToggleLeft size={28} color="#6b7280" />
                  )}
                </button>
              </div>

              <div style={styles.apiItem}>
                <div style={styles.apiInfo}>
                  <span style={styles.apiName}>Garmin Connect API</span>
                  <span style={styles.apiDesc}>Log running dynamics, vertical oscillations, and power parameters.</span>
                </div>
                <button onClick={() => toggleIntegration('garmin')} style={styles.toggleBtn}>
                  {integrations.garmin ? (
                    <ToggleRight size={28} color="#00e676" />
                  ) : (
                    <ToggleLeft size={28} color="#6b7280" />
                  )}
                </button>
              </div>
            </div>
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
    gridTemplateColumns: '1fr 1.2fr',
    gap: '24px',
    alignItems: 'stretch'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  panel: {
    padding: '28px',
    height: '100%'
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
    marginBottom: '24px'
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
    gap: '18px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  sideBySideRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  apiList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  apiItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    gap: '14px'
  },
  apiInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  apiName: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#fff'
  },
  apiDesc: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    lineHeight: '1.4'
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0
  }
};

// Inject settings view responsive tweaks style block
const settingsLayoutSheet = document.createElement("style");
settingsLayoutSheet.innerText = `
  @media (max-width: 900px) {
    div[style*="settingsPageGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(settingsLayoutSheet);

export default SettingsPage;
