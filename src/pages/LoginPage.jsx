import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const { setCurrentPage } = useApp();
  const [email, setEmail] = useState('raj@peakform.ai');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect straight to the onboarding consultation or dashboard
    setCurrentPage('dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.authPanel} className="glass-panel hover-glow">
        {/* Brand logo header */}
        <div style={styles.logoSection} onClick={() => setCurrentPage('landing')}>
          <div style={styles.logoIcon}>PF</div>
          <span style={styles.logoText}>PEAK<span style={{ color: '#00e676' }}>FORM</span></span>
        </div>

        <div style={styles.titleBlock}>
          <h2 style={styles.title}>Welcome back, Athlete</h2>
          <p style={styles.subtitle}>Enter your secure neural network credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label} className="form-label">Email Node</label>
            <div style={styles.fieldBox}>
              <Mail size={18} style={styles.fieldIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                className="form-input"
              />
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label} className="form-label">Biometric Key</label>
            <div style={styles.fieldBox}>
              <Lock size={18} style={styles.fieldIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                className="form-input"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={styles.actionsRow}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked style={styles.checkbox} />
              <span>Remember biometric session</span>
            </label>
            <button type="button" style={styles.forgotBtn}>Forgot Key?</button>
          </div>

          <button type="submit" className="btn-premium btn-neon" style={styles.submitBtn}>
            <span>Initialize Interface</span>
            <Sparkles size={16} />
          </button>
        </form>

        <div style={styles.switchRow}>
          <span>New to the system?</span>
          <button onClick={() => setCurrentPage('signup')} style={styles.switchBtn}>Begin Engineering</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    position: 'relative'
  },
  authPanel: {
    width: '100%',
    maxWidth: '460px',
    padding: '48px 40px',
    position: 'relative',
    zIndex: 10
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '36px',
    cursor: 'pointer'
  },
  logoIcon: {
    backgroundColor: '#00e676',
    color: '#000000',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '0.85rem',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    fontSize: '1.1rem',
    letterSpacing: '-0.02em',
    color: '#ffffff'
  },
  titleBlock: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif",
    color: '#ffffff',
    letterSpacing: '-0.02em',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#9ca3af'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '6px'
  },
  fieldBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  fieldIcon: {
    position: 'absolute',
    left: '16px',
    color: '#9ca3af',
    pointerEvents: 'none'
  },
  input: {
    paddingLeft: '48px !important'
  },
  eyeBtn: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#9ca3af'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    accentColor: '#00e676',
    cursor: 'pointer'
  },
  forgotBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
    transition: 'color 0.15s ease'
  },
  submitBtn: {
    marginTop: '10px',
    width: '100%',
    height: '48px'
  },
  switchRow: {
    marginTop: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#9ca3af',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '24px'
  },
  switchBtn: {
    background: 'none',
    border: 'none',
    color: '#00e676',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif"
  }
};

export default LoginPage;
