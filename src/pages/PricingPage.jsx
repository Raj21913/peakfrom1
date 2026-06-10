import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Check, X, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

const PricingPage = () => {
  const { premiumPlan, setPremiumPlan } = useApp();
  const [checkoutTier, setCheckoutTier] = useState(null); // 'pro' or 'elite'
  const [success, setSuccess] = useState(false);

  // Form details buffers
  const [cardNum, setCardNum] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('***');

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setPremiumPlan(checkoutTier);
      setCheckoutTier(null);
      setSuccess(false);
    }, 2000);
  };

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free Baseline',
      price: '$0',
      desc: 'Essential biometric database cataloging.',
      features: [
        'Manual food logging & macro count',
        'Basic workout templates logs',
        'Subjective weekly check-in',
        'Community Strava feed logs'
      ],
      missing: [
        'AURA AI chatbot recommendations console',
        'Kinetic Joint Cam Scan analysis',
        'Concentric recovery telemetry dashboards'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Adaptive',
      price: '$29',
      desc: 'Dynamic scheduling tailored by bio-strain.',
      features: [
        'All Free Baseline capabilities',
        'AURA AI Chatbot Console (Core access)',
        'Concentric Whoop/Sleep dials metrics',
        'Custom routine builder integrations',
        'Strava XP leaderboards sync'
      ],
      missing: [
        'Kinetic Joint Cam Scan analysis',
        'Advanced VO2 Max metrics engine'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Engineer',
      price: '$79',
      desc: 'The ultimate human engineering platform.',
      features: [
        'All Pro Adaptive capabilities',
        'AURA AI Premium (Adaptive coaching context)',
        'Kinetic Joint Cam Scan vision system',
        'Cardiovascular VO2 Max advanced telemetry',
        '24/7 nervous system feedback tracking'
      ],
      missing: []
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.headerBlock}>
        <Crown size={28} color="#00e676" style={{ filter: 'drop-shadow(0 0 10px rgba(0,230,118,0.4))' }} />
        <h2 style={styles.title}>System Access Tiers</h2>
        <p style={styles.subtitle}>Unlock biological optimization algorithms aligned to your constraints.</p>
      </div>

      {/* --- CARDS GRID --- */}
      <div style={styles.cardsGrid}>
        {pricingTiers.map(tier => {
          const isActive = premiumPlan === tier.id;
          return (
            <div 
              key={tier.id} 
              style={{
                ...styles.priceCard,
                ...(tier.popular ? styles.priceCardPopular : {}),
                ...(isActive ? styles.priceCardActive : {})
              }}
              className="glass-panel"
            >
              {tier.popular && <div style={styles.popularBadge}>MOST RECOMMENDED</div>}
              {isActive && <div style={styles.activeBadge}>YOUR CURRENT SYSTEM TIER</div>}

              <div style={styles.cardHeader}>
                <h3 style={styles.tierName}>{tier.name}</h3>
                <div style={styles.priceRow}>
                  <span style={styles.priceVal}>{tier.price}</span>
                  <span style={styles.priceUnit}>/ month</span>
                </div>
                <p style={styles.tierDesc}>{tier.desc}</p>
              </div>

              <div style={styles.featuresList}>
                {tier.features.map((f, i) => (
                  <div key={i} style={styles.featureItem}>
                    <Check size={14} color="#00e676" style={{ flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}

                {tier.missing.map((f, i) => (
                  <div key={i} style={{ ...styles.featureItem, opacity: 0.35 }}>
                    <X size={14} color="#ff3d00" style={{ flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {!isActive && (
                <button 
                  onClick={() => tier.id !== 'free' ? setCheckoutTier(tier.id) : setPremiumPlan('free')}
                  style={{
                    ...styles.tierBtn,
                    ...(tier.popular ? styles.tierBtnPopular : {})
                  }}
                >
                  {tier.id === 'free' ? 'Downgrade to Baseline' : `Upgrade to ${tier.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* --- SECURE GLASS CHECKOUT MODAL OVERLAY --- */}
      {checkoutTier && (
        <div style={styles.modalOverlay}>
          <div className="glass-panel" style={styles.modalPanel}>
            <div style={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={18} color="#00e676" />
                <h3 style={styles.modalTitle}>Secure Encryption Portal</h3>
              </div>
              <button onClick={() => setCheckoutTier(null)} style={styles.modalCloseBtn}>
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div style={styles.successBlock}>
                <ShieldCheck size={48} color="#00e676" style={{ filter: 'drop-shadow(0 0 15px rgba(0,230,118,0.4))' }} />
                <h4 style={styles.successTitle}>Biometrics Activated</h4>
                <p style={styles.successDesc}>Your Performance Core has been successfully updated.</p>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} style={styles.checkoutForm}>
                <div style={styles.pricingSummary}>
                  <span style={styles.summaryLabel}>Upgrading to:</span>
                  <span style={styles.summaryValue}>{checkoutTier.toUpperCase()} SYSTEM tier</span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label className="form-label">Payment Card Token</label>
                  <input
                    type="text"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                    style={styles.formInput}
                    className="form-input"
                    required
                  />
                </div>

                <div style={styles.cardExpiryRow}>
                  <div>
                    <label className="form-label">Expiration Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      style={styles.formInput}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Secure CVC Key</label>
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      style={styles.formInput}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-premium btn-neon" style={styles.payBtn}>
                  <span>Activate System Session</span>
                  <Sparkles size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    paddingBottom: '40px'
  },
  headerBlock: {
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  title: {
    fontSize: '2rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    color: '#fff'
  },
  subtitle: {
    fontSize: '0.92rem',
    color: '#9ca3af',
    maxWidth: '500px'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    alignItems: 'stretch'
  },
  priceCard: {
    padding: '36px 28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '520px',
    position: 'relative'
  },
  priceCardPopular: {
    borderColor: 'rgba(0, 230, 118, 0.25)',
    background: 'linear-gradient(180deg, rgba(0, 230, 118, 0.04) 0%, rgba(10, 10, 15, 0.65) 100%)',
    boxShadow: '0 12px 40px rgba(0, 230, 118, 0.05)'
  },
  priceCardActive: {
    borderColor: 'rgba(0, 229, 255, 0.25)',
    background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.04) 0%, rgba(10, 10, 15, 0.65) 100%)'
  },
  popularBadge: {
    position: 'absolute',
    top: '18px',
    right: '24px',
    backgroundColor: '#00e676',
    color: '#000000',
    fontSize: '0.62rem',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '4px',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '0.04em'
  },
  activeBadge: {
    position: 'absolute',
    top: '18px',
    right: '24px',
    backgroundColor: '#00e5ff',
    color: '#000000',
    fontSize: '0.62rem',
    fontWeight: '800',
    padding: '3px 10px',
    borderRadius: '4px',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '0.04em'
  },
  cardHeader: {
    marginBottom: '28px'
  },
  tierName: {
    fontSize: '1.25rem',
    fontWeight: '800',
    fontFamily: "'Outfit', sans-serif",
    color: '#fff',
    marginBottom: '10px'
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    marginBottom: '14px'
  },
  priceVal: {
    fontSize: '2.8rem',
    fontWeight: '900',
    fontFamily: "'Outfit', sans-serif",
    color: '#fff',
    lineHeight: '1'
  },
  priceUnit: {
    fontSize: '0.82rem',
    color: '#9ca3af'
  },
  tierDesc: {
    fontSize: '0.82rem',
    color: '#9ca3af',
    lineHeight: '1.4'
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    flex: 1,
    marginBottom: '32px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.85rem',
    color: '#e5e7eb',
    lineHeight: '1.4'
  },
  tierBtn: {
    width: '100%',
    height: '44px',
    borderRadius: '30px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '600',
    fontSize: '0.88rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  tierBtnPopular: {
    backgroundColor: '#00e676',
    color: '#000000',
    borderColor: '#00e676',
    boxShadow: '0 4px 15px rgba(0, 230, 118, 0.2)'
  },
  // Secure modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.65)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  modalPanel: {
    width: '100%',
    maxWidth: '440px',
    padding: '36px'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    paddingBottom: '16px',
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif"
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer'
  },
  checkoutForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  pricingSummary: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    marginBottom: '20px'
  },
  summaryLabel: {
    color: '#9ca3af'
  },
  summaryValue: {
    fontWeight: '700',
    color: '#00e676',
    fontFamily: "'Outfit', sans-serif"
  },
  cardExpiryRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px'
  },
  payBtn: {
    height: '45px',
    width: '100%'
  },
  successBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px 0',
    gap: '16px'
  },
  successTitle: {
    fontSize: '1.25rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '800',
    color: '#ffffff'
  },
  successDesc: {
    fontSize: '0.85rem',
    color: '#9ca3af',
    lineHeight: '1.5'
  }
};

export default PricingPage;
