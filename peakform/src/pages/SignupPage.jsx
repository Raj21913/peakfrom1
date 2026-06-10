import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Lock, Mail, User, Sparkles } from 'lucide-react';

const SignupPage = () => {
  const { setCurrentPage, updateProfile } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the user's name to state and kick off onboarding
    if (name.trim()) {
      updateProfile({ name });
    }
    setCurrentPage('onboarding');
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
          <h2 style={styles.title}>Initialize Profile</h2>
          <p style={styles.subtitle}>Begin your AI-optimized physiological optimization</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label} className="form-label">Athlete Name</label>
            <div style={styles.fieldBox}>
              <User size={18} style={styles.fieldIcon} />
              <input
                type="text"
                placeholder="e.g. Raj"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
                className="form-input"
              />
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label} className="form-label">Email Node</label>
            <div style={styles.fieldBox}>
              <Mail size={18} style={styles.fieldIcon} />
              <input
                type="email"
                placeholder="athlete@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                className="form-input"
              />
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label} className="form-label">Biometric Password</label>
            <div style={styles.fieldBox}>
              <Lock size={18} style={styles.fieldIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
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

          <div style={styles.termsRow}>
            <input type="checkbox" required defaultChecked style={styles.checkbox} />
            <span style={styles.termsText}>
              I consent to telemetry sync under PeakForm's encryption agreement.
            </span>
          </div>

          <button type="submit" className="btn-premium btn-neon" style={styles.submitBtn}>
            <span>Generate Session</span>
            <Sparkles size={16} />
          </button>
        </form>

        <div style={styles.switchRow}>
          <span>Registered already?</span>
          <button onClick={() => setCurrentPage('login')} style={styles.switchBtn}>Access Portal</button>
        </div>
      </div>
    </div>
  );
};

// Share layout styles from LoginPage
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
  termsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '0.75rem',
    color: '#9ca3af',
    lineHeight: '1.4'
  },
  termsText: {
    cursor: 'default'
  },
  checkbox: {
    accentColor: '#00e676',
    cursor: 'pointer',
    marginTop: '2px'
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

export default SignupPage;
