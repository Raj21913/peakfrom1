import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CustomChart from '../components/CustomChart';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Apple, 
  Utensils, 
  PlusCircle, 
  BarChart2 
} from 'lucide-react';

const NutritionPage = () => {
  const { meals, addMeal, userProfile } = useApp();

  // Logging form buffers
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  // Suggestions preset
  const aiSuggestions = [
    { name: 'Pan-Seared Salmon & Quinoa', calories: 620, protein: 48, carbs: 52, fats: 22 },
    { name: 'AURA Performance Protein Oats', calories: 480, protein: 36, carbs: 62, fats: 8 },
    { name: 'Premium Ribeye & Avocado Mash', calories: 840, protein: 58, carbs: 8, fats: 64 },
    { name: 'Anabolic Berry Shake', calories: 340, protein: 32, carbs: 38, fats: 6 }
  ];

  const handleLogMeal = (e) => {
    e.preventDefault();
    if (!mealName.trim()) return;

    addMeal(
      mealName,
      parseInt(calories) || 0,
      parseInt(protein) || 0,
      parseInt(carbs) || 0,
      parseInt(fats) || 0
    );

    // Reset
    setMealName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
  };

  const handleAddPreset = (pres) => {
    addMeal(pres.name, pres.calories, pres.protein, pres.carbs, pres.fats);
  };

  // Aggregates
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);

  // Weekly bar data
  const weeklyCals = [2650, 2900, 2450, totalCalories, 0, 0, 0];
  const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        
        {/* --- LEFT COLUMN: DIET LOGGER & AI SUGGESTIONS --- */}
        <div style={styles.leftCol}>
          
          {/* Custom meal logging form */}
          <div className="glass-panel" style={styles.formPanel}>
            <div style={styles.panelTitleRow}>
              <PlusCircle size={18} color="#ff6d00" />
              <h3 style={styles.panelTitle}>Metabolic Fuel Logger</h3>
            </div>
            <p style={styles.panelDesc}>Log structural macro compounds. AURA dynamically recalculates remaining expenditures.</p>

            <form onSubmit={handleLogMeal} style={styles.form}>
              <div style={{ gridColumn: 'span 4' }}>
                <label className="form-label">Meal Description</label>
                <input
                  type="text"
                  placeholder="e.g. Grass-fed beef with jasmine rice"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  style={styles.nameInput}
                  className="form-input"
                  required
                />
              </div>

              <div style={styles.macroInputsRow}>
                <div>
                  <label className="form-label">Calories (kcal)</label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    style={styles.macroInput}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Protein (g)</label>
                  <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    style={styles.macroInput}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Carbs (g)</label>
                  <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    style={styles.macroInput}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Lipid Fats (g)</label>
                  <input
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    style={styles.macroInput}
                    className="form-input"
                  />
                </div>
              </div>

              <button type="submit" className="btn-premium btn-neon" style={styles.submitBtn}>
                <span>Commit Meal Compound</span>
                <Plus size={16} />
              </button>
            </form>
          </div>

          {/* AI Suggestions presets */}
          <div className="glass-panel" style={styles.suggestionsPanel}>
            <div style={styles.panelTitleRow}>
              <Sparkles size={18} color="#ff6d00" />
              <h3 style={styles.panelTitle}>AURA Predictive Meal Feed</h3>
            </div>
            <p style={styles.panelDesc}>High-bioavailability formulas aligned with your goal of {userProfile.goal}.</p>

            <div style={styles.sugList}>
              {aiSuggestions.map((sug, idx) => (
                <div key={idx} style={styles.sugItem} className="glass-panel">
                  <div style={styles.sugInfo}>
                    <h4 style={styles.sugName}>{sug.name}</h4>
                    <p style={styles.sugMacros}>
                      {sug.calories} kcal • P: {sug.protein}g • C: {sug.carbs}g • F: {sug.fats}g
                    </p>
                  </div>
                  <button 
                    onClick={() => handleAddPreset(sug)} 
                    style={styles.sugAddBtn}
                    title="Log Preset Meal"
                  >
                    <Plus size={14} color="#ff6d00" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN: DAILY SUMMARY LOGS & CHARTS --- */}
        <div style={styles.rightCol}>
          
          {/* Active logs summary list */}
          <div className="glass-panel" style={styles.summaryPanel}>
            <div style={styles.panelTitleRow}>
              <Utensils size={18} color="#ff6d00" />
              <h3 style={styles.panelTitle}>Physiological Fuel Logs</h3>
            </div>
            <p style={styles.panelDesc}>Logged meals for today. Ratios dynamically update performance telemetry.</p>

            <div style={styles.mealList}>
              {meals.map(m => (
                <div key={m.id} style={styles.mealItem}>
                  <div style={styles.mealDetails}>
                    <span style={styles.mealName}>{m.name}</span>
                    <div style={styles.mealMetaRow}>
                      <span style={styles.mealTime}>{m.time}</span>
                      <span style={styles.mealMacs}>
                        {m.calories} kcal • P: {m.protein}g • C: {m.carbs}g • F: {m.fats}g
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Caloric Intake Bar Chart */}
          <div className="glass-panel" style={styles.chartPanel}>
            <div style={styles.panelTitleRow}>
              <BarChart2 size={18} color="#ff6d00" />
              <h3 style={styles.panelTitle}>Weekly Caloric Trends</h3>
            </div>
            <p style={styles.panelDesc}>Daily calories vs baseline metabolic target.</p>
            <div style={{ marginTop: '20px' }}>
              <CustomChart type="bar" data={weeklyCals} labels={weeklyLabels} color="#ff6d00" height={160} />
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
  formPanel: {
    padding: '28px'
  },
  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  nameInput: {
    height: '42px'
  },
  macroInputsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px'
  },
  macroInput: {
    height: '42px',
    textAlign: 'center'
  },
  submitBtn: {
    marginTop: '10px',
    height: '45px',
    backgroundColor: '#ff6d00',
    borderColor: '#ff6d00',
    boxShadow: '0 4px 15px rgba(255, 109, 0, 0.2)'
  },
  suggestionsPanel: {
    padding: '28px'
  },
  sugList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  sugItem: {
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px'
  },
  sugInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  sugName: {
    fontSize: '0.82rem',
    fontWeight: '700'
  },
  sugMacros: {
    fontSize: '0.72rem',
    color: '#9ca3af'
  },
  sugAddBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,109,0,0.05)',
    border: '1px solid rgba(255,109,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.15s ease'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  summaryPanel: {
    padding: '28px',
    minHeight: '300px'
  },
  mealList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  mealItem: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '8px',
    padding: '12px 16px'
  },
  mealDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  mealName: {
    fontSize: '0.88rem',
    fontWeight: '600'
  },
  mealMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.76rem',
    color: '#9ca3af'
  },
  mealTime: {
    color: 'rgba(255,255,255,0.3)'
  },
  mealMacs: {
    fontWeight: '500'
  },
  chartPanel: {
    padding: '28px'
  }
};

// Inject nutrition view responsive tweaks style block
const nutritionLayoutSheet = document.createElement("style");
nutritionLayoutSheet.innerText = `
  @media (max-width: 1100px) {
    div[style*="nutritionGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 600px) {
    div[style*="macroInputsRow"] {
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
    }
    div[style*="sugList"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(nutritionLayoutSheet);

export default NutritionPage;
