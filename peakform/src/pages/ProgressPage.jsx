import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomChart from '../components/CustomChart';
import { 
  TrendingUp, 
  Award, 
  Flame, 
  Zap, 
  ChevronRight,
  Sparkles,
  Trophy,
  Dumbbell
} from 'lucide-react';

const ProgressPage = () => {
  const { strengthRecords } = useApp();
  const [activeLift, setActiveLift] = useState('squat'); // 'bench', 'squat', 'deadlift'

  // Extract strength data based on toggle
  const getLiftData = () => {
    return strengthRecords.map(r => r[activeLift]);
  };

  const labels = strengthRecords.map(r => r.date);

  const achievements = [
    { title: 'Sleep Optimization Master', desc: 'Maintained an average sleep quality score > 85% for 7 consecutive days.', xp: '500 XP', icon: Trophy, unlocked: true },
    { title: 'Century Club (Bench Press)', desc: 'Successfully mapped a 1RM benchmark in excess of 100 kg.', xp: '300 XP', icon: Dumbbell, unlocked: true },
    { title: 'Metabolic Fueling Precision', desc: 'Achieved exact macro alignments (+/- 5g) for 5 consecutive logs.', xp: '400 XP', icon: Zap, unlocked: false },
    { title: 'Mitochondrial Peak', desc: 'Reached VO2 Max index calculation greater than 50 ml/kg/min.', xp: '600 XP', icon: Flame, unlocked: true }
  ];

  return (
    <div style={styles.container}>
      
      {/* --- LEVEL & STREAK HUD --- */}
      <section style={styles.levelHud} className="glass-panel">
        <div style={styles.hudGrid}>
          <div style={styles.hudCol}>
            <span style={styles.hudLabel}>ATHLETE RANK</span>
            <div style={styles.hudValueRow}>
              <span style={styles.hudRank}>LEVEL 12</span>
              <span style={styles.xpLabel}>1,850 / 2,300 XP</span>
            </div>
            <div style={styles.xpBarTrack}>
              <div style={styles.xpBarFill} />
            </div>
          </div>

          <div style={styles.hudDivider} />

          <div style={styles.hudStatCol}>
            <Flame size={20} color="#ff6d00" />
            <div style={styles.hudStatText}>
              <span style={styles.hudStatVal}>7 DAYS</span>
              <span style={styles.hudStatLbl}>LOG STREAK</span>
            </div>
          </div>

          <div style={styles.hudDivider} />

          <div style={styles.hudStatCol}>
            <Dumbbell size={20} color="#00e676" />
            <div style={styles.hudStatText}>
              <span style={styles.hudStatVal}>14,200 KG</span>
              <span style={styles.hudStatLbl}>VOLUME RECORD</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- STRENGTH TRENDS LINE CHART PANEL --- */}
      <section className="glass-panel" style={styles.trendsPanel}>
        <div style={styles.trendsHeader}>
          <div style={styles.titleBox}>
            <TrendingUp size={18} color="#00e676" />
            <h3 style={styles.panelTitle}>1RM Telemetry Index</h3>
          </div>

          {/* Toggle buttons for lifts */}
          <div style={styles.liftToggles}>
            {['bench', 'squat', 'deadlift'].map(lift => (
              <button
                key={lift}
                onClick={() => setActiveLift(lift)}
                style={{
                  ...styles.toggleBtn,
                  ...(activeLift === lift ? styles.toggleBtnActive : {})
                }}
              >
                {lift.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p style={styles.panelDesc}>1-Repetition Maximum curves generated from completed sets load velocities.</p>

        <div style={{ marginTop: '24px' }}>
          <CustomChart 
            type="line" 
            data={getLiftData()} 
            labels={labels} 
            color={activeLift === 'bench' ? '#00e5ff' : activeLift === 'deadlift' ? '#7c4dff' : '#00e676'} 
            height={200} 
          />
        </div>
      </section>

      {/* --- ACHIEVEMENTS BADGES LIST --- */}
      <section className="glass-panel" style={styles.achievementsPanel}>
        <div style={styles.titleBox}>
          <Award size={18} color="#00e676" />
          <h3 style={styles.panelTitle}>System Badges & Performance Milestones</h3>
        </div>
        <p style={styles.panelDesc}>Active accomplishments unlocked via physical compliance.</p>

        <div style={styles.achievementsGrid}>
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{
                  ...styles.achCard,
                  opacity: ach.unlocked ? 1 : 0.45,
                  borderColor: ach.unlocked ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255,255,255,0.05)'
                }}
              >
                <div style={{
                  ...styles.achIconBox,
                  backgroundColor: ach.unlocked ? 'rgba(0,230,118,0.06)' : 'rgba(255,255,255,0.02)',
                  color: ach.unlocked ? '#00e676' : '#9ca3af'
                }}>
                  <Icon size={20} />
                </div>
                
                <div style={styles.achInfo}>
                  <div style={styles.achHeaderRow}>
                    <h4 style={styles.achTitle}>{ach.title}</h4>
                    {ach.unlocked ? (
                      <span style={styles.badgeStatus}>UNLOCKED</span>
                    ) : (
                      <span style={{ ...styles.badgeStatus, color: '#ff6d00', backgroundColor: 'rgba(255,109,0,0.06)' }}>LOCKED</span>
                    )}
                  </div>
                  <p style={styles.achDesc}>{ach.desc}</p>
                  <span style={styles.xpReward}>+{ach.xp}</span>
                </div>
              </div>
            );
          })}
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
  levelHud: {
    padding: '24px'
  },
  hudGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px'
  },
  hudCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  hudLabel: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    fontWeight: '700',
    letterSpacing: '0.05em',
    fontFamily: "'Outfit', sans-serif"
  },
  hudValueRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  hudRank: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif"
  },
  xpLabel: {
    fontSize: '0.8rem',
    color: '#9ca3af'
  },
  xpBarTrack: {
    height: '6px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '4px'
  },
  xpBarFill: {
    width: '78%',
    height: '100%',
    backgroundColor: '#00e676',
    boxShadow: '0 0 8px #00e676',
    borderRadius: '3px'
  },
  hudDivider: {
    width: '1px',
    height: '45px',
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  hudStatCol: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '0 20px'
  },
  hudStatText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  hudStatVal: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif"
  },
  hudStatLbl: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    fontWeight: '700',
    letterSpacing: '0.04em'
  },
  trendsPanel: {
    padding: '28px'
  },
  trendsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  titleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  panelTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#ffffff'
  },
  panelDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af'
  },
  liftToggles: {
    display: 'flex',
    gap: '4px',
    backgroundColor: '#030305',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    padding: '4px'
  },
  toggleBtn: {
    padding: '6px 16px',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '600',
    fontSize: '0.78rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#ffffff'
  },
  achievementsPanel: {
    padding: '28px'
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '20px'
  },
  achCard: {
    padding: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start'
  },
  achIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  achInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  achHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  achTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif"
  },
  badgeStatus: {
    fontSize: '0.65rem',
    color: '#00e676',
    backgroundColor: 'rgba(0, 230, 118, 0.06)',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    letterSpacing: '0.04em'
  },
  achDesc: {
    fontSize: '0.78rem',
    color: '#9ca3af',
    lineHeight: '1.4'
  },
  xpReward: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#00e676',
    fontFamily: "'Outfit', sans-serif",
    marginTop: '2px'
  }
};

// Inject progress view responsive tweaks style block
const progressLayoutSheet = document.createElement("style");
progressLayoutSheet.innerText = `
  @media (max-width: 900px) {
    div[style*="hudGrid"] {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 20px !important;
    }
    div[style*="hudDivider"] {
      display: none !important;
    }
    div[style*="hudStatCol"] {
      padding: 0 !important;
    }
    div[style*="achievementsGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(progressLayoutSheet);

export default ProgressPage;
