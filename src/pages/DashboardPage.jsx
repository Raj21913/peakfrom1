import React from 'react';
import { useApp } from '../context/AppContext';
import CustomChart from '../components/CustomChart';
import { 
  Zap, 
  Flame, 
  Moon, 
  Sparkles, 
  Utensils, 
  Calendar, 
  ChevronRight, 
  Dumbbell,
  CheckCircle,
  Play
} from 'lucide-react';

const DashboardPage = () => {
  const { 
    userProfile, 
    meals, 
    workouts, 
    completeWorkout, 
    setCurrentPage 
  } = useApp();

  // Aggregate current macro values
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

  const calPercent = Math.min(100, Math.round((totalCalories / userProfile.targetCalories) * 100));

  // Exertion scores line chart data
  const weeklyExertion = [62, 78, 45, 88, 72, 85, 68];
  const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Get current active routine
  const activeWorkout = workouts.find(w => !w.completed) || workouts[0];

  return (
    <div style={styles.container}>
      {/* --- AI COACH HERO ALERT BANNER --- */}
      <section style={styles.coachHero} className="glass-panel neon-glow-hover">
        <div style={styles.coachHeroGlow} />
        <div style={styles.coachTextCol}>
          <div style={styles.coachHeader}>
            <Sparkles size={16} color="#7c4dff" />
            <span style={styles.coachTitle}>AURA AI PHYSIOLOGICAL RE-ROUTE</span>
          </div>
          <p style={styles.coachAdvice}>
            "Welcome back, {userProfile.name}. Your nervous system is primed with an **88% Recovery Score** and **HRV at 78ms**. Optimal window for high volume stimulation. Today's target: **{activeWorkout ? activeWorkout.name : 'Aerobic Conditioning'}**. Calorie reserves are ready for load."
          </p>
          <div style={styles.coachActions}>
            <button onClick={() => setCurrentPage('coach')} style={styles.coachBtnChat}>
              <span>Enter Neural Chat Console</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div style={styles.streakCard}>
          <Flame size={24} color="#ff6d00" style={{ filter: 'drop-shadow(0 0 8px rgba(255,109,0,0.5))' }} />
          <div style={styles.streakTextCol}>
            <span style={styles.streakValue}>7 DAYS</span>
            <span style={styles.streakLabel}>ACTIVE STREAK</span>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC METRICS: CIRCULAR RINGS DIALS --- */}
      <section style={styles.metricsGrid}>
        <div className="glass-panel" style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Zap size={16} color="#00e5ff" />
            <h4 style={styles.metricTitle}>WHOOP RECOVERY</h4>
          </div>
          <div style={styles.chartBox}>
            <CustomChart type="circular" data={[userProfile.recoveryScore]} color="#00e5ff" />
          </div>
          <div style={styles.metricFooter}>
            <div style={styles.subMetric}>
              <span style={styles.subLabel}>HRV</span>
              <span style={styles.subVal}>{userProfile.hrv} ms</span>
            </div>
            <div style={{ ...styles.subMetric, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={styles.subLabel}>RHR</span>
              <span style={styles.subVal}>{userProfile.rhr} bpm</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Moon size={16} color="#7c4dff" />
            <h4 style={styles.metricTitle}>SLEEP QUALITY</h4>
          </div>
          <div style={styles.chartBox}>
            <CustomChart type="circular" data={[userProfile.sleepScore]} color="#7c4dff" />
          </div>
          <div style={styles.metricFooter}>
            <div style={styles.subMetric}>
              <span style={styles.subLabel}>DURATION</span>
              <span style={styles.subVal}>8.2 hrs</span>
            </div>
            <div style={{ ...styles.subMetric, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={styles.subLabel}>DEEP SLEEP</span>
              <span style={styles.subVal}>2.4 hrs</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <Utensils size={16} color="#ff6d00" />
            <h4 style={styles.metricTitle}>CALORIC FUEL</h4>
          </div>
          <div style={styles.chartBox}>
            <CustomChart type="circular" data={[calPercent]} color="#ff6d00" />
          </div>
          <div style={styles.metricFooter}>
            <div style={styles.subMetric}>
              <span style={styles.subLabel}>LOGGED</span>
              <span style={styles.subVal}>{totalCalories} kcal</span>
            </div>
            <div style={{ ...styles.subMetric, borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={styles.subLabel}>TARGET</span>
              <span style={styles.subVal}>{userProfile.targetCalories} kcal</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE CONTENT: WORKOUT SCHEDULE vs NUTRITION MACROS --- */}
      <section style={styles.contentGrid}>
        
        {/* Left Column: Scheduled Routine Card */}
        <div className="glass-panel" style={styles.panelCard}>
          <div style={styles.panelCardHeader}>
            <div style={styles.panelCardTitleBox}>
              <Dumbbell size={18} color="#00e676" />
              <h3 style={styles.panelCardTitle}>Today's Target Protocol</h3>
            </div>
            <span style={styles.scheduleBadge}>TODAY</span>
          </div>

          {activeWorkout ? (
            <div style={styles.workoutWidget}>
              <div style={styles.workoutInfoRow}>
                <div>
                  <h4 style={styles.workoutName}>{activeWorkout.name}</h4>
                  <p style={styles.workoutMeta}>{activeWorkout.duration} min • {activeWorkout.exercises.length} Exercises • {activeWorkout.volume.toLocaleString()} kg est. volume</p>
                </div>
                {!activeWorkout.completed ? (
                  <button 
                    onClick={() => completeWorkout(activeWorkout.id)} 
                    style={styles.btnActionGreen}
                  >
                    <Play size={14} fill="#000" />
                    <span>Start Routine</span>
                  </button>
                ) : (
                  <div style={styles.completedTick}>
                    <CheckCircle size={18} color="#00e676" />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              <div style={styles.exerciseList}>
                {activeWorkout.exercises.map((ex, idx) => (
                  <div key={idx} style={styles.exerciseItem}>
                    <span style={styles.exIndex}>{idx + 1}</span>
                    <div style={styles.exDetails}>
                      <span style={styles.exName}>{ex.name}</span>
                      <span style={styles.exRepSets}>{ex.sets} sets x {ex.reps} reps @ {ex.weight} kg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No pending routines scheduled for today.</p>
          )}

          <button onClick={() => setCurrentPage('workouts')} style={styles.viewAllBtn}>
            <span>Optimize Routines DB</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Right Column: Weekly Exertion Chart & Nutrition Breakdown */}
        <div style={styles.rightColGrid}>
          {/* Exertion Weekly line chart */}
          <div className="glass-panel" style={styles.chartPanel}>
            <div style={styles.panelCardHeader}>
              <div style={styles.panelCardTitleBox}>
                <Calendar size={18} color="#00e676" />
                <h3 style={styles.panelCardTitle}>Weekly Physiological Load</h3>
              </div>
            </div>
            <div style={{ marginTop: '16px' }}>
              <CustomChart type="line" data={weeklyExertion} labels={weeklyLabels} color="#00e676" height={160} />
            </div>
          </div>

          {/* Macro logs metrics progress tracks */}
          <div className="glass-panel" style={styles.macroPanel}>
            <h3 style={{ ...styles.panelCardTitle, marginBottom: '20px', fontSize: '1rem' }}>Active Macronutrient Ratios</h3>
            
            <div style={styles.macroProgressGroup}>
              <div style={styles.macroProgressHeader}>
                <span style={styles.macroName}>Protein (Synthesizing)</span>
                <span style={styles.macroRatio}>{totalProtein}g / {userProfile.targetProtein}g</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFillGreen, width: `${Math.min(100, (totalProtein / userProfile.targetProtein) * 100)}%` }} />
              </div>
            </div>

            <div style={styles.macroProgressGroup}>
              <div style={styles.macroProgressHeader}>
                <span style={styles.macroName}>Carbohydrates (Glycogen)</span>
                <span style={styles.macroRatio}>{totalCarbs}g / {userProfile.targetCarbs}g</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFillCyan, width: `${Math.min(100, (totalCarbs / userProfile.targetCarbs) * 100)}%` }} />
              </div>
            </div>

            <div style={styles.macroProgressGroup}>
              <div style={styles.macroProgressHeader}>
                <span style={styles.macroName}>Lipids (Essential Fats)</span>
                <span style={styles.macroRatio}>{totalFats}g / {userProfile.targetFats}g</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFillOrange, width: `${Math.min(100, (totalFats / userProfile.targetFats) * 100)}%` }} />
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
  coachHero: {
    padding: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
    background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.08) 0%, rgba(10, 10, 15, 0.6) 100%)',
    border: '1px solid rgba(124, 77, 255, 0.2)'
  },
  coachHeroGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at 10% 50%, rgba(124, 77, 255, 0.15), transparent 60%)',
    pointerEvents: 'none',
    zIndex: 0
  },
  coachTextCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    position: 'relative',
    zIndex: 1
  },
  coachHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  coachTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.72rem',
    fontWeight: '800',
    letterSpacing: '0.08em',
    color: '#7c4dff'
  },
  coachAdvice: {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#e5e7eb'
  },
  coachActions: {
    display: 'flex'
  },
  coachBtnChat: {
    background: 'none',
    border: 'none',
    color: '#7c4dff',
    fontWeight: '600',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: 0
  },
  streakCard: {
    backgroundColor: 'rgba(255, 109, 0, 0.05)',
    border: '1px solid rgba(255, 109, 0, 0.2)',
    borderRadius: '12px',
    padding: '18px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0
  },
  streakTextCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  streakValue: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#ff6d00',
    fontFamily: "'Outfit', sans-serif"
  },
  streakLabel: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    fontWeight: '700',
    letterSpacing: '0.04em'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  metricCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px'
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
    marginBottom: '20px'
  },
  metricTitle: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    fontWeight: '700',
    letterSpacing: '0.06em',
    fontFamily: "'Outfit', sans-serif"
  },
  chartBox: {
    margin: '10px 0'
  },
  metricFooter: {
    display: 'flex',
    width: '100%',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    marginTop: '20px',
    paddingTop: '14px'
  },
  subMetric: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  },
  subLabel: {
    fontSize: '0.65rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.02em'
  },
  subVal: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif"
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
    alignItems: 'stretch'
  },
  panelCard: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '400px'
  },
  panelCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  panelCardTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  panelCardTitle: {
    fontSize: '1.15rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700',
    color: '#fff'
  },
  scheduleBadge: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '0.68rem',
    fontWeight: '700',
    color: '#9ca3af',
    letterSpacing: '0.05em'
  },
  workoutWidget: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  workoutInfoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '16px'
  },
  workoutName: {
    fontSize: '1.1rem',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif"
  },
  workoutMeta: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginTop: '4px'
  },
  btnActionGreen: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#00e676',
    border: 'none',
    color: '#000',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700',
    fontSize: '0.82rem',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 230, 118, 0.2)',
    transition: 'transform 0.15s ease'
  },
  completedTick: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#00e676',
    fontSize: '0.82rem',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif"
  },
  exerciseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  exerciseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    padding: '12px 16px'
  },
  exIndex: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#00e676',
    backgroundColor: 'rgba(0,230,118,0.06)',
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  exName: {
    fontSize: '0.88rem',
    fontWeight: '600'
  },
  exRepSets: {
    fontSize: '0.78rem',
    color: '#9ca3af'
  },
  viewAllBtn: {
    marginTop: '20px',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    alignSelf: 'flex-start',
    padding: 0
  },
  rightColGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  chartPanel: {
    padding: '24px'
  },
  macroPanel: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  macroProgressGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  macroProgressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  macroName: {
    color: '#9ca3af'
  },
  macroRatio: {
    color: '#ffffff',
    fontWeight: '600'
  },
  barTrack: {
    height: '8px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  barFillGreen: {
    height: '100%',
    backgroundColor: '#00e676',
    boxShadow: '0 0 10px rgba(0, 230, 118, 0.4)',
    borderRadius: '4px'
  },
  barFillCyan: {
    height: '100%',
    backgroundColor: '#00e5ff',
    boxShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
    borderRadius: '4px'
  },
  barFillOrange: {
    height: '100%',
    backgroundColor: '#ff6d00',
    boxShadow: '0 0 10px rgba(255, 109, 0, 0.4)',
    borderRadius: '4px'
  }
};

// Inject dashboard layout responsive tweaks style block
const dashboardLayoutSheet = document.createElement("style");
dashboardLayoutSheet.innerText = `
  @media (max-width: 1100px) {
    div[style*="contentGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 600px) {
    div[style*="coachHero"] {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 20px !important;
    }
    div[style*="streakCard"] {
      width: 100% !important;
    }
  }
`;
document.head.appendChild(dashboardLayoutSheet);

export default DashboardPage;
