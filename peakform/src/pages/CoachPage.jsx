import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Cpu, Sparkles, Brain, Award, ShieldAlert } from 'lucide-react';

const CoachPage = () => {
  const { chatHistory, sendChatMessage, userProfile, meals } = useApp();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  const suggestions = [
    { text: 'Suggest an optimized dinner recipe', icon: Sparkles },
    { text: 'My shoulders are sore, adjust program', icon: ShieldAlert },
    { text: 'Are my current macros aligned?', icon: Brain },
    { text: 'How do I optimize VO2 Max limits?', icon: Award }
  ];

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(inputText);
    setInputText('');
    setIsTyping(true);
  };

  const handleSuggestionClick = (text) => {
    sendChatMessage(text);
    setIsTyping(true);
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      // Simulate typing indicator reset
      const lastMsg = chatHistory[chatHistory.length - 1];
      if (lastMsg.sender === 'aura') {
        setIsTyping(false);
      }
    }
    // Auto scroll chat to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  return (
    <div style={styles.container}>
      <div style={styles.chatGrid}>
        
        {/* --- LEFT SIDE: CHAT INTERFACE --- */}
        <div style={styles.chatTerminal} className="glass-panel">
          
          {/* Chat Header Status info */}
          <div style={styles.terminalHeader}>
            <div style={styles.statusGroup}>
              <div style={styles.pulseDot} />
              <div style={styles.statusTextCol}>
                <span style={styles.terminalName}>AURA PERFORMANCE CORE v5.2</span>
                <span style={styles.terminalStatus}>SYNAPSE HANDSHAKE: ONLINE</span>
              </div>
            </div>
          </div>

          {/* Conversation messages logs container */}
          <div style={styles.messagesBox}>
            {chatHistory.map((msg, idx) => {
              const isAura = msg.sender === 'aura';
              return (
                <div 
                  key={idx} 
                  style={{
                    ...styles.messageRow,
                    justifyContent: isAura ? 'flex-start' : 'flex-end'
                  }}
                >
                  {isAura && (
                    <div style={styles.auraAvatar}>
                      <Cpu size={14} color="#7c4dff" />
                    </div>
                  )}
                  <div 
                    style={{
                      ...styles.msgBubble,
                      ...(isAura ? styles.msgBubbleAura : styles.msgBubbleUser)
                    }}
                  >
                    <p style={styles.msgText}>{msg.text}</p>
                    <span style={styles.msgTime}>{msg.time}</span>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader animation */}
            {isTyping && (
              <div style={styles.messageRow}>
                <div style={styles.auraAvatar}>
                  <Cpu size={14} color="#7c4dff" />
                </div>
                <div style={{ ...styles.msgBubble, ...styles.msgBubbleAura }}>
                  <div style={styles.typingIndicator}>
                    <span style={styles.typingDot} />
                    <span style={styles.typingDot} />
                    <span style={styles.typingDot} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions shortcut panel */}
          <div style={styles.suggestionPanel}>
            {suggestions.map((sug, idx) => {
              const Icon = sug.icon;
              return (
                <button 
                  key={idx} 
                  onClick={() => handleSuggestionClick(sug.text)}
                  style={styles.sugBtn}
                >
                  <Icon size={12} color="#7c4dff" />
                  <span>{sug.text}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom input text box */}
          <form onSubmit={handleSend} style={styles.inputForm}>
            <input
              type="text"
              placeholder="Ask AURA to recalibrate templates or adjust caloric bounds..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={styles.chatInput}
              className="form-input"
            />
            <button type="submit" style={styles.btnSend}>
              <Send size={16} />
            </button>
          </form>

        </div>

        {/* --- RIGHT SIDE: COACH INTERFACE MEMORY GRAPHICS --- */}
        <div style={styles.memoryPanel} className="glass-panel">
          <div style={styles.memoryHeader}>
            <Brain size={18} color="#7c4dff" />
            <h3 style={styles.memoryTitle}>AURA Dynamic Memory Database</h3>
          </div>
          <p style={styles.memoryDesc}>Coordinated constraints cataloged from onboarding biometrics and active training feeds.</p>

          <div style={styles.memoryList}>
            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Active Goal</span>
              <span style={styles.memVal}>{userProfile.goal}</span>
            </div>

            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Registered Height / Weight</span>
              <span style={styles.memVal}>{userProfile.height}cm / {userProfile.weight}kg</span>
            </div>

            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Baseline Caloric Limit</span>
              <span style={styles.memVal}>{userProfile.targetCalories} kcal</span>
            </div>

            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Logged Intake Today</span>
              <span style={styles.memVal}>{totalCalories} kcal</span>
            </div>

            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Registered Joint Sensitivities</span>
              <span style={{ ...styles.memVal, color: userProfile.injuries !== 'None' ? '#ff3d00' : '#00e676' }}>
                {userProfile.injuries}
              </span>
            </div>

            <div style={styles.memoryItem}>
              <span style={styles.memLabel}>Primary Energy Pathway</span>
              <span style={styles.memVal}>Aerobic/Mitochondrial</span>
            </div>
          </div>

          <div style={styles.memoryAlert}>
            <ShieldAlert size={16} color="#00e5ff" style={{ flexShrink: 0 }} />
            <span style={styles.alertText}>
              AURA continuously updates this registry. Adjusting target values inside chat updates metrics settings.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: 'calc(100vh - 140px)'
  },
  chatGrid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 1fr',
    gap: '24px',
    height: '100%',
    alignItems: 'stretch'
  },
  chatTerminal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px',
    height: '100%'
  },
  terminalHeader: {
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    paddingBottom: '16px',
    marginBottom: '16px'
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#7c4dff',
    boxShadow: '0 0 10px #7c4dff',
    animation: 'pulse-neon 1.5s infinite'
  },
  statusTextCol: {
    display: 'flex',
    flexDirection: 'column'
  },
  terminalName: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.8rem',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '0.04em'
  },
  terminalStatus: {
    fontSize: '0.65rem',
    color: '#7c4dff',
    fontWeight: '700'
  },
  messagesBox: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingRight: '6px',
    marginBottom: '16px'
  },
  messageRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
    maxWidth: '85%'
  },
  auraAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: 'rgba(124, 77, 255, 0.1)',
    border: '1px solid rgba(124, 77, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  msgBubble: {
    padding: '14px 18px',
    borderRadius: '16px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  msgBubbleAura: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadiusBottomleft: '4px',
    color: '#e5e7eb'
  },
  msgBubbleUser: {
    backgroundColor: '#7c4dff',
    color: '#ffffff',
    borderRadiusBottomright: '4px',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    boxShadow: '0 4px 15px rgba(124, 77, 255, 0.2)'
  },
  msgText: {
    fontSize: '0.92rem',
    lineHeight: '1.5',
    whiteSpace: 'pre-line'
  },
  msgTime: {
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.4)',
    alignSelf: 'flex-end'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '6px 0'
  },
  typingDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#7c4dff',
    animation: 'pulse-neon 1s infinite'
  },
  suggestionPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px'
  },
  sugBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#e5e7eb',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  inputForm: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  chatInput: {
    paddingRight: '56px !important'
  },
  btnSend: {
    position: 'absolute',
    right: '8px',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#7c4dff',
    border: 'none',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(124, 77, 255, 0.3)',
    transition: 'background-color 0.2s'
  },
  memoryPanel: {
    padding: '28px',
    display: 'flex',
    flexDirection: 'column'
  },
  memoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  memoryTitle: {
    fontSize: '1.15rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700'
  },
  memoryDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginBottom: '24px'
  },
  memoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1
  },
  memoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '10px',
    fontSize: '0.88rem'
  },
  memLabel: {
    color: '#9ca3af',
    fontWeight: '500'
  },
  memVal: {
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: "'Outfit', sans-serif"
  },
  memoryAlert: {
    display: 'flex',
    gap: '10px',
    padding: '14px',
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    border: '1px solid rgba(0, 229, 255, 0.15)',
    borderRadius: '10px',
    marginTop: '20px'
  },
  alertText: {
    fontSize: '0.78rem',
    color: '#00e5ff',
    lineHeight: '1.4'
  }
};

// Inject chatbot view responsive tweaks style block
const coachLayoutSheet = document.createElement("style");
coachLayoutSheet.innerText = `
  @media (max-width: 960px) {
    div[style*="chatGrid"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="memoryPanel"] {
      display: none !important;
    }
  }
`;
document.head.appendChild(coachLayoutSheet);

export default CoachPage;
