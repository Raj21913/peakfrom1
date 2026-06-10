import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ThreeDCanvas from '../components/ThreeDCanvas';
import { ArrowRight, Sparkles, Activity, Check } from 'lucide-react';

const OnboardingPage = () => {
  const { userProfile, updateProfile, setCurrentPage } = useApp();
  const [step, setStep] = useState(0);

  // Local state form buffers
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(userProfile.age);
  const [weight, setWeight] = useState(userProfile.weight);
  const [height, setHeight] = useState(userProfile.height);
  const [bodyFat, setBodyFat] = useState(userProfile.bodyFat);
  const [goal, setGoal] = useState(userProfile.goal);
  const [injuries, setInjuries] = useState('None');

  const goalsList = [
    { id: 'Athletic Performance', title: 'Athletic Performance', desc: 'Focus on VO2 Max, power-to-weight ratio, and clean explosive velocity.', icon: Activity },
    { id: 'Hypertrophy', title: 'Strength & Size', desc: 'Maximize myofibrillar protein synthesis, raw power outputs, and joint stability.', icon: Sparkles },
    { id: 'Endurance', title: 'Endurance & Stamina', desc: 'Prioritize mitochondrial density, fat oxidation, and metabolic efficiency.', icon: ArrowRight },
    { id: 'Longevity', title: 'Longevity & Health', desc: 'Optimize hormone profiles, heart rate variability, and cellular longevity.', icon: Check }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save onboarding profiles to global state
      updateProfile({
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseInt(height),
        bodyFat: parseFloat(bodyFat),
        goal,
        injuries
      });
      // Redirect to the Jarvis scanning analysis screen
      setCurrentPage('analysis');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.layoutGrid}>
        
        {/* --- LEFT SIDE: CONVERSATIONAL CONSOLE --- */}
        <div style={styles.onboardFormPanel} className="glass-panel">
          {/* Progress Indicator */}
          <div style={styles.progressHeader}>
            <span style={styles.stepNum}>STEP 0{step + 1} OF 04</span>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: `${(step + 1) * 25}%` }} />
            </div>
          </div>

          {/* AI Coach Dialog Bubble */}
          <div style={styles.chatBubble}>
            <div style={styles.avatarMini}>AURA</div>
            <div style={styles.bubbleText}>
              {step === 0 && `Greetings, ${userProfile.name}. I am AURA. Let's initialize your physiological model. What is your biological sex and current age?`}
              {step === 1 && `Excellent. Now, adjust your core physical dimensions. These metrics calibrate your baseline metabolic expenditure and joint load index.`}
              {step === 2 && `Understood. What is your primary physiological target? This shapes the volume models and load curves I will calculate for your program.`}
              {step === 3 && `Lastly, flag any active constraints or joint sensitivity. I will modify the biomechanical pathways to safeguard your structural health.`}
            </div>
          </div>

          {/* Dialog Inputs Container */}
          <div style={styles.inputArea}>
            {step === 0 && (
              <div style={styles.step0Container}>
                <div style={styles.genderRow}>
                  {['Male', 'Female', 'Non-Binary'].map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      style={{
                        ...styles.optionCard,
                        ...(gender === g ? styles.optionCardActive : {})
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '24px' }}>
                  <label className="form-label">Athlete Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={styles.ageInput}
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={styles.step1Container}>
                <div style={styles.sliderGroup}>
                  <div style={styles.sliderLabelRow}>
                    <span style={styles.sliderLabel}>Height</span>
                    <span style={styles.sliderVal}>{height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    style={styles.sliderInput}
                  />
                </div>

                <div style={styles.sliderGroup}>
                  <div style={styles.sliderLabelRow}>
                    <span style={styles.sliderLabel}>Weight</span>
                    <span style={styles.sliderVal}>{weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    style={styles.sliderInput}
                  />
                </div>

                <div style={styles.sliderGroup}>
                  <div style={styles.sliderLabelRow}>
                    <span style={styles.sliderLabel}>Body Fat Est.</span>
                    <span style={styles.sliderVal}>{bodyFat}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    style={styles.sliderInput}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={styles.step2Grid}>
                {goalsList.map(g => {
                  const Icon = g.icon;
                  const isSel = goal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      style={{
                        ...styles.goalCard,
                        ...(isSel ? styles.goalCardActive : {})
                      }}
                    >
                      <div style={{ ...styles.goalIconBox, color: isSel ? '#00e676' : '#9ca3af' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 style={styles.goalCardTitle}>{g.title}</h4>
                        <p style={styles.goalCardDesc}>{g.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {step === 3 && (
              <div style={styles.step3Container}>
                <div style={styles.injuryGrid}>
                  {['None', 'Back Sensitivity', 'Knee Instability', 'Shoulder Impingement', 'Ankle Mobility'].map(inj => (
                    <button
                      key={inj}
                      onClick={() => setInjuries(inj)}
                      style={{
                        ...styles.optionCard,
                        ...(injuries === inj ? styles.optionCardActive : {}),
                        width: '100%'
                      }}
                    >
                      {inj}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div style={styles.actionsBar}>
            {step > 0 ? (
              <button onClick={handleBack} className="btn-premium btn-glass">
                Back
              </button>
            ) : <div />}
            
            <button onClick={handleNext} className="btn-premium btn-neon">
              <span>{step === 3 ? 'Generate Profile' : 'Continue'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: INTERACTIVE 3D BIO-WIRE SURFACE --- */}
        <div style={styles.biomeshPanel} className="glass-panel">
          <div style={styles.meshTitleRow}>
            <Activity size={18} color="#00e676" />
            <h3 style={styles.meshPanelTitle}>Biomechanical Wiremesh</h3>
          </div>
          <p style={styles.meshPanelDesc}>Real-time simulation. Sizing values recalibrate skeletal parameters dynamically.</p>
          
          <div style={{ ...styles.canvasHolder, transform: `scale(${0.75 + (weight - 82) * 0.002})` }}>
            <ThreeDCanvas mode="athlete" />
          </div>

          <div style={styles.meshTelemetry}>
            <div style={styles.telemetryStat}>
              <span style={styles.teleLabel}>HECTOR MESH:</span>
              <span style={styles.teleValue}>ACTIVE</span>
            </div>
            <div style={styles.telemetryStat}>
              <span style={styles.teleLabel}>EST. MASS:</span>
              <span style={styles.teleValue}>{weight} KG</span>
            </div>
            <div style={styles.telemetryStat}>
              <span style={styles.teleLabel}>SKELETAL SCALE:</span>
              <span style={styles.teleValue}>{(height / 180).toFixed(2)}x</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '40px auto',
    width: '100%',
    padding: '0 16px'
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '32px',
    alignItems: 'stretch'
  },
  onboardFormPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '500px',
    padding: '36px'
  },
  progressHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '24px'
  },
  stepNum: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#00e676',
    letterSpacing: '0.1em',
    fontFamily: "'Outfit', sans-serif"
  },
  progressBarBg: {
    width: '100%',
    height: '4px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00e676',
    boxShadow: '0 0 10px #00e676',
    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  chatBubble: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '20px',
    position: 'relative',
    marginBottom: '32px'
  },
  avatarMini: {
    position: 'absolute',
    top: '-10px',
    left: '20px',
    backgroundColor: '#7c4dff',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
    fontFamily: "'Outfit', sans-serif",
    letterSpacing: '0.05em',
    boxShadow: '0 0 10px rgba(124, 77, 255, 0.4)'
  },
  bubbleText: {
    fontSize: '0.92rem',
    lineHeight: '1.5',
    color: '#e5e7eb'
  },
  inputArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '36px'
  },
  step0Container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  genderRow: {
    display: 'flex',
    gap: '12px'
  },
  optionCard: {
    flex: 1,
    padding: '16px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'center'
  },
  optionCardActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    borderColor: '#00e676',
    boxShadow: '0 0 15px rgba(0, 230, 118, 0.15)'
  },
  ageInput: {
    maxWidth: '120px'
  },
  step1Container: {
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
  step2Grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  goalCard: {
    border: '1px solid rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '16px',
    cursor: 'pointer',
    display: 'flex',
    gap: '12px',
    transition: 'all 0.2s ease'
  },
  goalCardActive: {
    borderColor: '#00e676',
    backgroundColor: 'rgba(0, 230, 118, 0.04)',
    boxShadow: '0 0 15px rgba(0, 230, 118, 0.08)'
  },
  goalIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  goalCardTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif",
    color: '#fff',
    marginBottom: '4px'
  },
  goalCardDesc: {
    fontSize: '0.72rem',
    color: '#9ca3af',
    lineHeight: '1.4'
  },
  step3Container: {
    display: 'flex',
    flexDirection: 'column'
  },
  injuryGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  actionsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '24px'
  },
  biomeshPanel: {
    padding: '36px',
    display: 'flex',
    flexDirection: 'column'
  },
  meshTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  meshPanelTitle: {
    fontSize: '1.2rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700',
    color: '#fff'
  },
  meshPanelDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginBottom: '20px'
  },
  canvasHolder: {
    flex: 1,
    height: '280px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.04)',
    background: 'radial-gradient(circle, rgba(10,10,15,0.5) 0%, rgba(5,5,7,0.7) 100%)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-out',
    marginBottom: '20px'
  },
  meshTelemetry: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '16px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  telemetryStat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  teleLabel: {
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '600',
    letterSpacing: '0.05em',
    fontFamily: "'Outfit', sans-serif"
  },
  teleValue: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#00e5ff',
    fontFamily: "'Outfit', sans-serif"
  }
};

export default OnboardingPage;
