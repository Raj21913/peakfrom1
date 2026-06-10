import React from 'react';
import { useApp } from '../context/AppContext';
import CustomChart from '../components/CustomChart';
import { Activity, ShieldCheck, Heart, Zap, Cpu, Sparkles } from 'lucide-react';

const AthletePage = () => {
  const { userProfile } = useApp();

  // HRV historical trends data
  const hrvData = [72, 75, 68, 82, 78, 80, 85];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={styles.container}>
      {/* --- ELITE HEADER BANNER --- */}
      <section style={styles.eliteHero} className="glass-panel">
        <div style={styles.glowOverlay} />
        <div style={styles.heroText}>
          <div style={styles.eliteBadge}>
            <ShieldCheck size={12} color="#00e5ff" />
            <span>ELITE ATHLETE PROFILE COMPLIANT</span>
          </div>
          <h2 style={styles.heroTitle}>Cardiovascular Telemetry</h2>
          <p style={styles.heroSub}>
            Advanced oxygen absorption (VO2), autonomic nervous system strain, and metabolic recovery rates sync.
          </p>
        </div>
      </section>

      {/* --- METRICS CORE GRID --- */}
      <section style={styles.metricsGrid}>
        
        {/* Left Side: VO2 Max and HRV dials */}
        <div style={styles.leftCol}>
          <div className="glass-panel" style={styles.card}>
            <div style={styles.cardTitleBox}>
              <Heart size={18} color="#00e5ff" />
              <h3 style={styles.cardTitle}>VO2 Max Efficiency</h3>
            </div>
            
            <div style={styles.vo2Row}>
              <div style={styles.vo2ValueBox}>
                <span style={styles.vo2Val}>{userProfile.vo2Max}</span>
                <span style={styles.vo2Unit}>ml/kg/min</span>
              </div>
              <div style={styles.vo2Info}>
                <span style={styles.vo2Status}>SUPERIOR LEVEL</span>
                <p style={styles.vo2Desc}>Your aerobic capacity puts you in the top 3% of your age bracket. Optimal cardiovascular recovery potential.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={styles.card}>
            <div style={styles.cardTitleBox}>
              <Activity size={18} color="#00e5ff" />
              <h3 style={styles.cardTitle}>HRV Baseline Trends</h3>
            </div>
            <p style={styles.cardDesc}>Heart Rate Variability (7-day exponential trend). Higher baseline signals robust parasympathetic recovery.</p>
            <div style={{ marginTop: '20px' }}>
              <CustomChart type="line" data={hrvData} labels={labels} color="#00e5ff" height={160} />
            </div>
          </div>
        </div>

        {/* Right Side: Training load stress cards */}
        <div style={styles.rightCol}>
          <div className="glass-panel" style={styles.card}>
            <div style={styles.cardTitleBox}>
              <Zap size={18} color="#00e5ff" />
              <h3 style={styles.cardTitle}>Strain vs Recovery Balance</h3>
            </div>

            <div style={styles.strainList}>
              <div style={styles.strainItem}>
                <span style={styles.strainLabel}>Exertion Strain Index</span>
                <div style={styles.barProgress}>
                  <div style={{ ...styles.barFill, width: '68%', backgroundColor: '#ff6d00' }} />
                  <span style={styles.barValue}>14.2 / 21</span>
                </div>
              </div>

              <div style={styles.strainItem}>
                <span style={styles.strainLabel}>Nervous System Recovery</span>
                <div style={styles.barProgress}>
                  <div style={{ ...styles.barFill, width: '88%', backgroundColor: '#00e676' }} />
                  <span style={styles.barValue}>88%</span>
                </div>
              </div>

              <div style={styles.strainItem}>
                <span style={styles.strainLabel}>Sleep Debt Ratio</span>
                <div style={styles.barProgress}>
                  <div style={{ ...styles.barFill, width: '12%', backgroundColor: '#7c4dff' }} />
                  <span style={styles.barValue}>0.4 hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Garmin / Apple Health / Whoop status panel */}
          <div className="glass-panel" style={styles.telemetryHealthCard}>
            <div style={styles.panelTitleRow}>
              <Cpu size={18} color="#00e5ff" />
              <h3 style={styles.cardTitle}>Telemetry Sources</h3>
            </div>

            <div style={styles.sourceList}>
              <div style={styles.sourceItem}>
                <span style={styles.sourceName}>Whoop Strap 4.0</span>
                <span style={styles.sourceStatus}>SYNCHRONIZED</span>
              </div>
              <div style={styles.sourceItem}>
                <span style={styles.sourceName}>Garmin Forerunner 965</span>
                <span style={styles.sourceStatus}>SYNCHRONIZED</span>
              </div>
              <div style={styles.sourceItem}>
                <span style={styles.sourceName}>Apple HealthKit API</span>
                <span style={{ ...styles.sourceStatus, color: 'rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.02)' }}>DISCONNECTED</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%'
  },
  eliteHero: {
    padding: '36px',
    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(10, 10, 15, 0.6) 100%)',
    border: '1px solid rgba(0, 229, 255, 0.15)'
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 10% 50%, rgba(0, 229, 255, 0.12), transparent 50%)',
    pointerEvents: 'none'
  },
  heroText: {
    position: 'relative',
    zIndex: 1
  },
  eliteBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    border: '1px solid rgba(0, 229, 255, 0.2)',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '0.68rem',
    fontWeight: '700',
    color: '#00e5ff',
    letterSpacing: '0.04em',
    fontFamily: "'Outfit', sans-serif",
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '1.75rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '8px'
  },
  heroSub: {
    fontSize: '0.92rem',
    color: '#9ca3af',
    maxWidth: '560px'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif"
  },
  cardDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    lineHeight: '1.5'
  },
  vo2Row: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    padding: '10px 0'
  },
  vo2ValueBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    width: '100px',
    height: '100px',
    flexShrink: 0
  },
  vo2Val: {
    fontSize: '2.5rem',
    fontWeight: '900',
    fontFamily: "'Outfit', sans-serif', sans-serif",
    color: '#00e5ff',
    lineHeight: '1',
    textShadow: '0 0 10px rgba(0, 229, 255, 0.3)'
  },
  vo2Unit: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    fontWeight: '600'
  },
  vo2Info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  vo2Status: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#00e5ff',
    letterSpacing: '0.04em',
    fontFamily: "'Outfit', sans-serif"
  },
  vo2Desc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    lineHeight: '1.5'
  },
  strainList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  strainItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  strainLabel: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    fontWeight: '500'
  },
  barProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '6px',
    height: '14px',
    padding: '0 8px',
    position: 'relative',
    overflow: 'hidden'
  },
  barFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: '6px'
  },
  barValue: {
    position: 'relative',
    zIndex: 1,
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#fff',
    marginLeft: 'auto'
  },
  telemetryHealthCard: {
    padding: '24px'
  },
  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '18px'
  },
  sourceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  sourceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    fontSize: '0.85rem'
  },
  sourceName: {
    color: '#fff',
    fontWeight: '500'
  },
  sourceStatus: {
    fontSize: '0.68rem',
    color: '#00e5ff',
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    letterSpacing: '0.04em'
  }
};

// Inject athlete view responsive tweaks style block
const athleteLayoutSheet = document.createElement("style");
athleteLayoutSheet.innerText = `
  @media (max-width: 900px) {
    div[style*="metricsGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(athleteLayoutSheet);

export default AthletePage;
