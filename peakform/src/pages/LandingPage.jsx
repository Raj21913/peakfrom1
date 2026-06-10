import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ThreeDCanvas from '../components/ThreeDCanvas';
import { ArrowRight, Activity, Cpu, Sparkles, Trophy, Zap } from 'lucide-react';

const LandingPage = () => {
  const { setCurrentPage } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage for before/after slider
  const [activeStep, setActiveStep] = useState(0);

  const stats = [
    { value: '98.4%', label: 'AI Precision Rate', icon: Cpu },
    { value: '14.8%', label: 'Avg VO2 Max Increase', icon: Activity },
    { value: '85ms', label: 'Optimal Target HRV', icon: Zap },
    { value: '1.2M+', label: 'Athletes Engineered', icon: Trophy }
  ];

  const features = [
    { title: 'Jarvis Form Scan', desc: 'Real-time biomechanical analysis scans joint angles in 3D to eliminate injuries.' },
    { title: 'Adaptive Programming', desc: 'AURA AI adapts volume, reps, and load based on daily Whoop/Strava recovery telemetry.' },
    { title: 'Precision Bio-Fueling', desc: 'Algorithmic macro matching adjusts nutrition ratios in response to live training expenditures.' }
  ];

  const handleSliderChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  };

  return (
    <div style={styles.container}>
      {/* --- FLOATING HEADER --- */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>PF</div>
          <span style={styles.logoText}>PEAK<span style={{ color: '#00e676' }}>FORM</span></span>
        </div>
        <div style={styles.headerLinks}>
          <button onClick={() => setCurrentPage('pricing')} style={styles.linkBtn}>Pricing</button>
          <button onClick={() => setCurrentPage('community')} style={styles.linkBtn}>Community</button>
          <button onClick={() => setCurrentPage('login')} style={styles.btnSignIn}>Sign In</button>
          <button onClick={() => setCurrentPage('onboarding')} style={styles.btnStart}>
            <span>Initialize Coach</span>
            <Sparkles size={14} />
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section style={styles.heroSection}>
        <div style={styles.heroGrid}>
          <div style={styles.heroText}>
            <div style={styles.badge}>
              <Cpu size={12} color="#00e676" />
              <span>THE FUTURE OF HUMAN PERFORMANCE</span>
            </div>
            <h1 style={styles.heroTitle}>
              Your Body. <br />
              <span className="neon-gradient-text" style={{ textShadow: '0 0 40px rgba(0, 230, 118, 0.2)' }}>Optimized By AI.</span>
            </h1>
            <p style={styles.heroSub}>
              PeakForm merges clinical biometrics, real-time kinetic telemetry, and adaptive neural logic to construct the ultimate personalized training routine.
            </p>
            <div style={styles.heroActions}>
              <button onClick={() => setCurrentPage('onboarding')} className="btn-premium btn-neon">
                <span>Start AI Onboarding</span>
                <ArrowRight size={18} />
              </button>
              <button onClick={() => setCurrentPage('pricing')} className="btn-premium btn-glass">
                View Elite Plans
              </button>
            </div>
          </div>

          <div style={styles.heroCanvasContainer}>
            <div style={styles.canvasBlurOverlay} />
            <ThreeDCanvas mode="athlete" />
            <div style={styles.canvasTag}>
              <span style={styles.canvasTagDot} />
              <span>INTERACTIVE ROTATING SKELETAL MODEL [DRAG TO ROTATE]</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- METRICS BAR --- */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-panel hover-glow" style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <Icon size={20} color="#00e676" />
                </div>
                <div style={styles.statTextWrapper}>
                  <h3 style={styles.statVal}>{stat.value}</h3>
                  <p style={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- TRANSFORMATION SHOWCASE (SLIDER) --- */}
      <section style={styles.sliderSection}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={styles.sectionTitle}>Algorithmic Body Engineering</h2>
          <p style={styles.sectionSub}>Drag to analyze the structural shift from baseline fitness to AI-optimized performance metrics.</p>
        </div>

        <div style={styles.sliderContainer} onMouseMove={handleSliderChange} onTouchMove={(e) => handleSliderChange(e.touches[0])}>
          {/* Before: Unoptimized (Left Side) */}
          <div style={styles.sliderPanel}>
            <div style={styles.sliderContentLeft}>
              <h4 style={{ color: '#ff3d00', fontFamily: "'Outfit', sans-serif" }}>BASELINE USER</h4>
              <p>Recovery Rate: 42% (Soreness Load)</p>
              <p>Muscle Imbalance: +12% Right Offset</p>
              <p>Aerobic Limit: 38 ml/kg/min VO2</p>
              <p>Fatigue Threshold: Low</p>
            </div>
          </div>

          {/* After: Optimized (Right Side) */}
          <div style={{ ...styles.sliderPanelRight, width: `${100 - sliderPosition}%` }}>
            <div style={{ ...styles.sliderContentRight, width: '1000px', maxWidth: '80vw' }}>
              <h4 style={{ color: '#00e676', fontFamily: "'Outfit', sans-serif" }}>AI-OPTIMIZED ATHLETE</h4>
              <p>Recovery Rate: 88% (Dynamic HRV Balance)</p>
              <p>Skeletal Symmetry: 99.4% Joint Alignment</p>
              <p>Aerobic Limit: 52 ml/kg/min VO2</p>
              <p>Fatigue Threshold: Optimized</p>
            </div>
          </div>

          {/* Slider line separator */}
          <div style={{ ...styles.sliderSeparator, left: `${sliderPosition}%` }}>
            <div style={styles.sliderHandle}>
              <Zap size={14} color="#00e676" />
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section style={styles.featuresSection}>
        <div style={styles.featuresGrid}>
          {features.map((feat, idx) => (
            <div key={idx} className="glass-panel" style={styles.featureCard}>
              <div style={styles.featureHeader}>
                <div style={styles.featureBadge}>0{idx + 1}</div>
                <h3 style={styles.featureTitle}>{feat.title}</h3>
              </div>
              <p style={styles.featureDesc}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px 80px 24px',
    position: 'relative',
    zIndex: 10
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    backgroundColor: '#00e676',
    color: '#000',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '900',
    fontSize: '0.9rem',
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '1.2rem',
    letterSpacing: '-0.02em'
  },
  headerLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '6px 12px'
  },
  btnSignIn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    borderRadius: '20px',
    padding: '8px 20px',
    fontSize: '0.88rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif"
  },
  btnStart: {
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    border: '1px solid rgba(0, 230, 118, 0.4)',
    color: '#00e676',
    borderRadius: '20px',
    padding: '8px 20px',
    fontSize: '0.88rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Outfit', sans-serif"
  },
  heroSection: {
    padding: '80px 0 60px 0'
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '60px',
    alignItems: 'center'
  },
  heroText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0,230,118,0.05)',
    border: '1px solid rgba(0,230,118,0.2)',
    borderRadius: '50px',
    padding: '6px 16px',
    fontSize: '0.72rem',
    fontWeight: '700',
    letterSpacing: '0.08em',
    color: '#00e676',
    marginBottom: '24px',
    fontFamily: "'Outfit', sans-serif"
  },
  heroTitle: {
    fontSize: '4.2rem',
    lineHeight: '1.05',
    fontWeight: '900',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '-0.03em',
    marginBottom: '24px',
    color: '#ffffff'
  },
  heroSub: {
    fontSize: '1.15rem',
    color: '#9ca3af',
    lineHeight: '1.6',
    marginBottom: '36px',
    maxWidth: '540px'
  },
  heroActions: {
    display: 'flex',
    gap: '16px'
  },
  heroCanvasContainer: {
    height: '420px',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '24px',
    background: 'radial-gradient(circle at center, rgba(10,10,15,0.4) 0%, rgba(5,5,7,0.8) 100%)',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
  },
  canvasBlurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, transparent 30%, rgba(5,5,7,0.9) 100%)',
    pointerEvents: 'none',
    zIndex: 2
  },
  canvasTag: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.04em',
    fontFamily: "'Outfit', sans-serif",
    zIndex: 5
  },
  canvasTagDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#00e676',
    boxShadow: '0 0 6px #00e676'
  },
  statsSection: {
    padding: '40px 0'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px'
  },
  statIconWrapper: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statTextWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  statVal: {
    fontSize: '1.8rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    lineHeight: '1.1',
    color: '#ffffff'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    fontWeight: '500'
  },
  sliderSection: {
    padding: '80px 0'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.02em',
    marginBottom: '12px'
  },
  sectionSub: {
    fontSize: '1rem',
    color: '#9ca3af',
    maxWidth: '600px',
    margin: '0 auto'
  },
  sliderContainer: {
    height: '240px',
    width: '100%',
    position: 'relative',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    cursor: 'ew-resize',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    userSelect: 'none'
  },
  sliderPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(25, 10, 10, 0.25)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 60px'
  },
  sliderPanelRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(10, 25, 15, 0.35)',
    borderLeft: '1px solid rgba(0, 230, 118, 0.3)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    transition: 'width 0.05s ease-out'
  },
  sliderContentLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#e5e7eb',
    fontSize: '0.92rem',
    lineHeight: '1.5'
  },
  sliderContentRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#ffffff',
    fontSize: '0.92rem',
    lineHeight: '1.5',
    paddingRight: '60px',
    textAlign: 'right'
  },
  sliderSeparator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: '#00e676',
    zIndex: 10,
    boxShadow: '0 0 10px #00e676'
  },
  sliderHandle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#050507',
    border: '2px solid #00e676',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 15px rgba(0, 230, 118, 0.5)',
    zIndex: 11
  },
  featuresSection: {
    padding: '40px 0'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  featureHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  featureBadge: {
    fontSize: '1rem',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif",
    color: '#00e676',
    backgroundColor: 'rgba(0, 230, 118, 0.08)',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(0, 230, 118, 0.2)'
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700',
    color: '#ffffff'
  },
  featureDesc: {
    fontSize: '0.9rem',
    color: '#9ca3af',
    lineHeight: '1.6'
  }
};

// Add responsive mobile breakpoint style changes injection
const landingStyleSheet = document.createElement("style");
landingStyleSheet.innerText = `
  @media (max-width: 900px) {
    div[style*="heroGrid"] {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    h1[style*="heroTitle"] {
      font-size: 2.8rem !important;
    }
    div[style*="heroCanvasContainer"] {
      height: 320px !important;
    }
    div[style*="sliderContentLeft"] {
      padding-left: 20px !important;
      font-size: 0.8rem !important;
    }
    div[style*="sliderContentRight"] {
      padding-right: 20px !important;
      font-size: 0.8rem !important;
    }
  }
`;
document.head.appendChild(landingStyleSheet);

export default LandingPage;
