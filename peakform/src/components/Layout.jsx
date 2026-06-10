import React from 'react';
import { useApp } from '../context/AppContext';
import BackgroundVideo from './BackgroundVideo';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Salad, 
  TrendingUp, 
  MessageSquare, 
  Activity, 
  Users, 
  Camera, 
  Settings, 
  Crown, 
  Sparkles, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react';

const Layout = ({ children }) => {
  const { currentPage, setCurrentPage, userProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Navigation Items Mapping
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'coach', label: 'AI Coach (AURA)', icon: MessageSquare, highlight: true },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Salad },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'checkin', label: 'Form Check-in', icon: Camera },
    { id: 'athlete', label: 'Elite Athlete Mode', icon: Activity },
    { id: 'community', label: 'Strava Community', icon: Users },
    { id: 'pricing', label: 'Upgrade Tier', icon: Crown },
    { id: 'onboarding', label: 'Coach Onboarding', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  // Skip layout wrapper for landing page or auth routes (unless they want standard layout, but landing page is fullscreen hero)
  if (currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup') {
    return (
      <div style={styles.fullscreenApp}>
        <BackgroundVideo type={currentPage} />
        <div style={styles.pageContentNoLayout}>{children}</div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      {/* Background loop manager */}
      <BackgroundVideo type={currentPage} />

      {/* --- DESKTOP FLOATING SIDEBAR --- */}
      <aside style={styles.sidebar}>
        {/* Brand Logo header */}
        <div style={styles.logoSection} onClick={() => handleNavClick('landing')}>
          <div style={styles.logoIcon}>PF</div>
          <span style={styles.logoText}>PEAK<span style={styles.logoSubtext}>FORM</span></span>
        </div>

        {/* Navigation list */}
        <nav style={styles.navList}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (item.id === 'onboarding' && currentPage === 'analysis');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  ...styles.navButton,
                  ...(isActive ? styles.navButtonActive : {}),
                  ...(item.highlight && !isActive ? styles.navButtonHighlight : {})
                }}
              >
                <Icon size={18} style={isActive ? { color: '#00e676' } : {}} />
                <span style={styles.navLabel}>{item.label}</span>
                {item.highlight && <span style={styles.pulseDot} />}
              </button>
            );
          })}
        </nav>

        {/* Footer profile widget */}
        <div style={styles.sidebarFooter}>
          <div style={styles.profileRow}>
            <div style={styles.avatar}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80" alt="Raj" style={styles.avatarImg} />
              <div style={styles.statusDot} />
            </div>
            <div style={styles.profileText}>
              <span style={styles.profileName}>{userProfile.name}</span>
              <span style={styles.profileTier}>AI Athlete Tier II</span>
            </div>
          </div>
          <button onClick={() => handleNavClick('landing')} style={styles.logoutButton}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN PAGE CONTENT LAYOUT --- */}
      <div style={styles.mainWrapper}>
        {/* Floating Top Dashboard Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            {/* Mobile menu trigger */}
            <button style={styles.mobileToggle} onClick={() => setMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
            <h2 style={styles.headerTitle}>
              {currentPage === 'dashboard' && 'Athletic Telemetry'}
              {currentPage === 'coach' && 'AURA AI Neural Interface'}
              {currentPage === 'workouts' && 'Performance Programming'}
              {currentPage === 'nutrition' && 'Metabolic Fueling'}
              {currentPage === 'progress' && 'Biometric Trends'}
              {currentPage === 'checkin' && 'Biomechanical Analysis'}
              {currentPage === 'athlete' && 'Elite Metrics'}
              {currentPage === 'community' && 'Strava Activity'}
              {currentPage === 'pricing' && 'Upgrade Plan'}
              {currentPage === 'settings' && 'System Preferences'}
              {currentPage === 'onboarding' && 'Coach Consultation'}
              {currentPage === 'analysis' && 'Generating Profile'}
            </h2>
          </div>

          <div style={styles.headerRight}>
            {/* Sync telemetry capsule widget */}
            <div style={styles.telemetryCapsule}>
              <div style={styles.telemetryPulse} />
              <span style={styles.telemetryText}>RECOVERY: {userProfile.recoveryScore}%</span>
            </div>

            {/* Apple/Whoop HRV details */}
            <div style={styles.hrvCapsule}>
              <span style={styles.hrvText}>HRV: {userProfile.hrv}ms</span>
            </div>

            <button style={styles.headerIconBtn}>
              <Bell size={18} />
              <div style={styles.notifBadge} />
            </button>
          </div>
        </header>

        {/* Page Inner Container (animated transitions) */}
        <main style={styles.pageContainer}>
          <div style={styles.fadeTransition}>
            {children}
          </div>
        </main>
      </div>

      {/* --- MOBILE COMPACT SLIDE-OUT MENU --- */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavOverlay}>
          <div style={styles.mobileSidebar}>
            <div style={styles.mobileHeader}>
              <span style={styles.logoText}>PEAK<span style={styles.logoSubtext}>FORM</span></span>
              <button style={styles.closeBtn} onClick={() => setMobileMenuOpen(false)}>
                <X size={22} />
              </button>
            </div>
            
            <nav style={styles.mobileNavList}>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      ...styles.mobileNavBtn,
                      ...(isActive ? styles.mobileNavBtnActive : {})
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <button onClick={() => handleNavClick('landing')} style={styles.mobileLogout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    minHeight: '100vh',
    position: 'relative',
    color: '#ffffff'
  },
  fullscreenApp: {
    minHeight: '100vh',
    position: 'relative'
  },
  pageContentNoLayout: {
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    zIndex: 10
  },
  sidebar: {
    background: 'rgba(10, 10, 15, 0.4)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '24px 16px'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    marginBottom: '32px',
    paddingLeft: '8px'
  },
  logoIcon: {
    backgroundColor: '#00e676',
    color: '#000000',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '0.95rem',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 15px rgba(0, 230, 118, 0.4)'
  },
  logoText: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    color: '#ffffff'
  },
  logoSubtext: {
    color: '#00e676'
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    overflowY: 'auto',
    paddingRight: '4px'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.88rem',
    fontWeight: '500',
    textAlign: 'left',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  navButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.02)'
  },
  navButtonHighlight: {
    border: '1px solid rgba(124, 77, 255, 0.2)',
    background: 'rgba(124, 77, 255, 0.03)',
    color: '#e0d8ff'
  },
  pulseDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#7c4dff',
    position: 'absolute',
    right: '16px',
    boxShadow: '0 0 8px #7c4dff'
  },
  navLabel: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  sidebarFooter: {
    marginTop: 'auto',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  profileRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingLeft: '8px'
  },
  avatar: {
    position: 'relative',
    width: '40px',
    height: '40px'
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid rgba(255, 255, 255, 0.15)'
  },
  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#00e676',
    border: '2px solid #0a0a0f',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column'
  },
  profileName: {
    fontWeight: '600',
    fontSize: '0.88rem',
    color: '#ffffff'
  },
  profileTier: {
    fontSize: '0.72rem',
    color: '#9ca3af'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: '#9ca3af',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'auto',
    position: 'relative',
    zIndex: 10
  },
  header: {
    height: '75px',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    background: 'rgba(5, 5, 7, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 80
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  mobileToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer'
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: "'Outfit', sans-serif"
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  telemetryCapsule: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0, 230, 118, 0.06)',
    border: '1px solid rgba(0, 230, 118, 0.18)',
    borderRadius: '50px',
    padding: '6px 14px',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#00e676',
    letterSpacing: '0.02em',
    fontFamily: "'Outfit', sans-serif"
  },
  telemetryPulse: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#00e676',
    boxShadow: '0 0 8px #00e676',
    animation: 'pulse-neon 1.5s infinite'
  },
  hrvCapsule: {
    backgroundColor: 'rgba(0, 229, 255, 0.06)',
    border: '1px solid rgba(0, 229, 255, 0.18)',
    borderRadius: '50px',
    padding: '6px 14px',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#00e5ff',
    letterSpacing: '0.02em',
    fontFamily: "'Outfit', sans-serif"
  },
  hrvText: {
    display: 'flex',
    alignItems: 'center'
  },
  headerIconBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s ease'
  },
  notifBadge: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#ff3d00',
    position: 'absolute',
    top: '8px',
    right: '8px',
    border: '1.5px solid #050507'
  },
  pageContainer: {
    padding: '32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  fadeTransition: {
    animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  // Mobile nav overlays
  mobileNavOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(10px)',
    zIndex: 200,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  mobileSidebar: {
    width: '280px',
    height: '100%',
    backgroundColor: '#0a0a0f',
    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
    gap: '24px'
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer'
  },
  mobileNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto'
  },
  mobileNavBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    textAlign: 'left',
    cursor: 'pointer'
  },
  mobileNavBtnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#00e676'
  },
  mobileLogout: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 3d, 0, 0.05)',
    border: '1px solid rgba(255, 61, 0, 0.15)',
    color: '#ff3d00',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    cursor: 'pointer'
  }
};

// Inject CSS transitions for dynamic fading in style sheet
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 900px) {
    #root > div {
      grid-template-columns: 1fr !important;
    }
    aside {
      display: none !important;
    }
    button[style*="mobileToggle"] {
      display: block !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Layout;
