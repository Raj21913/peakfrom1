import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ThreeDCanvas from '../components/ThreeDCanvas';
import { 
  Search, 
  Plus, 
  Trash2, 
  Sparkles, 
  Dumbbell, 
  ArrowRight,
  Eye
} from 'lucide-react';

const WorkoutsPage = () => {
  const { exerciseDB, workouts, saveCustomWorkout } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Exercise demo state
  const [demoExercise, setDemoExercise] = useState('squat'); // 'squat' or 'bench'

  // Routine constructor state
  const [routineName, setRoutineName] = useState('My AI Core Protocol');
  const [routineExercises, setRoutineExercises] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);

  // Filter exercises
  const filteredExercises = exerciseDB.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || ex.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const addExerciseToRoutine = (ex) => {
    setRoutineExercises([
      ...routineExercises,
      { id: Date.now() + Math.random(), name: ex.name, sets: 3, reps: '10', weight: 40 }
    ]);
    // Switch demo view based on category if relevant
    if (ex.category === 'Legs') setDemoExercise('squat');
    if (ex.category === 'Chest') setDemoExercise('bench');
  };

  const updateRoutineExercise = (id, field, val) => {
    setRoutineExercises(prev => prev.map(ex => {
      if (ex.id === id) {
        return { ...ex, [field]: val };
      }
      return ex;
    }));
  };

  const removeExerciseFromRoutine = (id) => {
    setRoutineExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const handleCreateRoutine = (e) => {
    e.preventDefault();
    if (routineExercises.length === 0) return;

    saveCustomWorkout(routineName, routineExercises);
    setRoutineExercises([]);
    setRoutineName('My AI Core Protocol');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        
        {/* --- LEFT COLUMN: EXERCISE SEARCH & CREATOR --- */}
        <div style={styles.leftCol}>
          
          {/* Custom routine builder panel */}
          <div className="glass-panel" style={styles.builderPanel}>
            <div style={styles.builderHeader}>
              <Sparkles size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>AI Custom Routine Builder</h3>
            </div>
            <p style={styles.panelDesc}>Draft a custom program. Calibrated load estimates will be generated instantly.</p>

            {successMsg && (
              <div style={styles.alertSuccess}>
                Routine compiled and synchronized to system schedule! Check Dashboard.
              </div>
            )}

            <form onSubmit={handleCreateRoutine} style={styles.builderForm}>
              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Protocol Identifier</label>
                <input
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  style={styles.nameInput}
                  className="form-input"
                  required
                />
              </div>

              <div style={styles.selectedList}>
                {routineExercises.length === 0 ? (
                  <div style={styles.emptyDraft}>
                    <Dumbbell size={24} color="rgba(255,255,255,0.15)" />
                    <span>Select exercises from database below to draft protocol</span>
                  </div>
                ) : (
                  routineExercises.map((ex) => (
                    <div key={ex.id} style={styles.draftItem}>
                      <span style={styles.draftName}>{ex.name}</span>
                      <div style={styles.draftControls}>
                        <div style={styles.controlBox}>
                          <span>Sets</span>
                          <input
                            type="number"
                            value={ex.sets}
                            onChange={(e) => updateRoutineExercise(ex.id, 'sets', e.target.value)}
                            style={styles.numInput}
                            min="1"
                            max="8"
                          />
                        </div>
                        <div style={styles.controlBox}>
                          <span>Reps</span>
                          <input
                            type="text"
                            value={ex.reps}
                            onChange={(e) => updateRoutineExercise(ex.id, 'reps', e.target.value)}
                            style={styles.repInput}
                          />
                        </div>
                        <div style={styles.controlBox}>
                          <span>Load (kg)</span>
                          <input
                            type="number"
                            value={ex.weight}
                            onChange={(e) => updateRoutineExercise(ex.id, 'weight', e.target.value)}
                            style={styles.weightInput}
                            min="0"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExerciseFromRoutine(ex.id)}
                          style={styles.btnDelete}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button 
                type="submit" 
                className="btn-premium btn-neon"
                disabled={routineExercises.length === 0}
                style={{ width: '100%', opacity: routineExercises.length === 0 ? 0.5 : 1 }}
              >
                <span>Compile & Inject Protocol</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Exercise database catalogue */}
          <div className="glass-panel" style={styles.dbPanel}>
            <h3 style={styles.panelTitle}>Performance Exercise Library</h3>
            <p style={styles.panelDesc}>Search athletic templates. Tap + to draft into custom program.</p>

            <div style={styles.filterBar}>
              <div style={styles.searchBox}>
                <Search size={16} style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <div style={styles.catTabs}>
                {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Core'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    style={{
                      ...styles.catTab,
                      ...(categoryFilter === cat ? styles.catTabActive : {})
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.dbGrid}>
              {filteredExercises.map(ex => (
                <div key={ex.id} style={styles.exCard} className="glass-panel">
                  <div style={styles.exInfo}>
                    <h4 style={styles.exName}>{ex.name}</h4>
                    <div style={styles.exBadges}>
                      <span style={styles.exTag}>{ex.category}</span>
                      <span style={styles.exTag}>{ex.difficulty}</span>
                    </div>
                  </div>
                  <div style={styles.exActions}>
                    <button 
                      onClick={() => setDemoExercise(ex.category === 'Legs' ? 'squat' : 'bench')}
                      style={styles.exBtnIcon}
                      title="Preview 3D Mechanics"
                    >
                      <Eye size={14} />
                    </button>
                    <button 
                      onClick={() => addExerciseToRoutine(ex)}
                      style={{ ...styles.exBtnIcon, backgroundColor: '#00e676', color: '#000' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: 3D ANIMATION MECHANICS PREVIEW --- */}
        <div style={styles.rightCol}>
          <div className="glass-panel" style={styles.demoPanel}>
            <div style={styles.demoHeader}>
              <Dumbbell size={18} color="#00e5ff" />
              <h3 style={styles.panelTitle}>Biomechanical Motion scan</h3>
            </div>
            <p style={styles.panelDesc}>Drag mouse to orbit. Scan demonstrates skeletal muscle articulation angles.</p>

            <div style={styles.demoCanvasWrapper}>
              <ThreeDCanvas mode="exercise" activeExercise={demoExercise} />
            </div>

            <div style={styles.demoControls}>
              <button
                onClick={() => setDemoExercise('squat')}
                style={{
                  ...styles.demoBtn,
                  ...(demoExercise === 'squat' ? styles.demoBtnActive : {})
                }}
              >
                Squat Mechanics
              </button>
              <button
                onClick={() => setDemoExercise('bench')}
                style={{
                  ...styles.demoBtn,
                  ...(demoExercise === 'bench' ? styles.demoBtnActive : {})
                }}
              >
                Bench Mechanics
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
    alignItems: 'stretch'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  builderPanel: {
    padding: '24px'
  },
  builderHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px'
  },
  panelTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#ffffff'
  },
  panelDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginBottom: '20px'
  },
  alertSuccess: {
    backgroundColor: 'rgba(0, 230, 118, 0.06)',
    border: '1px solid rgba(0, 230, 118, 0.18)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#00e676',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '16px'
  },
  builderForm: {
    display: 'flex',
    flexDirection: 'column'
  },
  nameInput: {
    height: '42px'
  },
  selectedList: {
    backgroundColor: '#030305',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '12px',
    padding: '16px',
    minHeight: '160px',
    maxHeight: '260px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  emptyDraft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '12px',
    height: '130px',
    color: '#9ca3af',
    fontSize: '0.8rem'
  },
  draftItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    padding: '10px 14px'
  },
  draftName: {
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  draftControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  controlBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '0.65rem',
    color: '#9ca3af',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  numInput: {
    width: '42px',
    height: '28px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#fff',
    padding: '0 4px',
    textAlign: 'center'
  },
  repInput: {
    width: '56px',
    height: '28px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#fff',
    padding: '0 4px',
    textAlign: 'center'
  },
  weightInput: {
    width: '56px',
    height: '28px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: '#fff',
    padding: '0 4px',
    textAlign: 'center'
  },
  btnDelete: {
    background: 'none',
    border: 'none',
    color: '#ff3d00',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    marginTop: '10px'
  },
  dbPanel: {
    padding: '24px'
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '20px'
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    color: '#9ca3af'
  },
  searchInput: {
    width: '100%',
    height: '38px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    color: '#fff',
    paddingLeft: '38px',
    fontSize: '0.85rem'
  },
  catTabs: {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
    paddingBottom: '4px'
  },
  catTab: {
    padding: '6px 14px',
    borderRadius: '30px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#9ca3af',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap'
  },
  catTabActive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: '#ffffff',
    color: '#ffffff'
  },
  dbGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px',
    maxHeight: '360px',
    overflowY: 'auto',
    paddingRight: '4px'
  },
  exCard: {
    padding: '14px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px'
  },
  exInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  exName: {
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  exBadges: {
    display: 'flex',
    gap: '6px'
  },
  exTag: {
    fontSize: '0.68rem',
    color: '#9ca3af',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  exActions: {
    display: 'flex',
    gap: '6px'
  },
  exBtnIcon: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  rightCol: {
    position: 'sticky',
    top: '100px',
    height: 'fit-content'
  },
  demoPanel: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    height: '620px'
  },
  demoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px'
  },
  demoCanvasWrapper: {
    flex: 1,
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '16px',
    background: 'radial-gradient(circle, rgba(0,229,255,0.03) 0%, rgba(5,5,7,0.75) 100%)',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '20px'
  },
  demoControls: {
    display: 'flex',
    gap: '12px'
  },
  demoBtn: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#e5e7eb',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '600',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'center'
  },
  demoBtnActive: {
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    borderColor: '#00e5ff',
    color: '#00e5ff',
    boxShadow: '0 0 15px rgba(0, 229, 255, 0.12)'
  }
};

// Inject workouts view responsive tweaks style block
const workoutsLayoutSheet = document.createElement("style");
workoutsLayoutSheet.innerText = `
  @media (max-width: 960px) {
    div[style*="workoutsPageGrid"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="rightCol"] {
      display: none !important;
    }
  }
`;
document.head.appendChild(workoutsLayoutSheet);

export default WorkoutsPage;
