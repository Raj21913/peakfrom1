import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation Routing State
  const [currentPage, setCurrentPage] = useState('landing');
  
  // Premium Tier State: 'free', 'pro', 'elite'
  const [premiumPlan, setPremiumPlan] = useState('pro');

  // Onboarding & User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Raj',
    age: 28,
    weight: 82, // in kg
    height: 180, // in cm
    bodyFat: 16.5, // %
    goal: 'Athletic Performance', // 'Strength', 'Endurance', 'Hypertrophy', 'Longevity'
    fitnessLevel: 'Advanced',
    injuries: 'None',
    vo2Max: 52, // ml/kg/min
    hrv: 78, // Heart Rate Variability
    rhr: 54, // Resting Heart Rate
    recoveryScore: 88, // %
    sleepScore: 82, // %
    targetCalories: 2850,
    targetProtein: 185, // g
    targetCarbs: 320, // g
    targetFats: 90 // g
  });

  // Nutrition Meal Logs State
  const [meals, setMeals] = useState([
    { id: 1, name: 'AURA Post-Workout Shake', time: '07:30 AM', calories: 380, protein: 35, carbs: 45, fats: 6 },
    { id: 2, name: 'Grilled Chicken & Sweet Potato Bowl', time: '12:45 PM', calories: 650, protein: 55, carbs: 70, fats: 14 },
    { id: 3, name: 'Premium Ribeye & Asparagus', time: '07:15 PM', calories: 820, protein: 62, carbs: 12, fats: 58 }
  ]);

  // Exercise Database Presets
  const exerciseDB = [
    { id: 'bench_press', name: 'Barbell Bench Press', category: 'Chest', difficulty: 'Intermediate', met: 6 },
    { id: 'squats', name: 'Barbell Back Squat', category: 'Legs', difficulty: 'Advanced', met: 7 },
    { id: 'deadlift', name: 'Conventional Deadlift', category: 'Back', difficulty: 'Advanced', met: 8 },
    { id: 'pullups', name: 'Weighted Pull-Up', category: 'Back', difficulty: 'Intermediate', met: 5 },
    { id: 'shoulder_press', name: 'Dumbbell Shoulder Press', category: 'Shoulders', difficulty: 'Intermediate', met: 5 },
    { id: 'bicep_curl', name: 'Incline Dumbbell Curl', category: 'Arms', difficulty: 'Beginner', met: 3 },
    { id: 'tricep_pushdown', name: 'Cable Tricep Pushdown', category: 'Arms', difficulty: 'Beginner', met: 3 },
    { id: 'leg_press', name: 'Leg Press 45°', category: 'Legs', difficulty: 'Beginner', met: 5 },
    { id: 'plank', name: 'Weighted Plank', category: 'Core', difficulty: 'Intermediate', met: 3 }
  ];

  // Workouts and Schedules State
  const [workouts, setWorkouts] = useState([
    {
      id: 'w1',
      name: 'AURA AI Hypertrophy Pull',
      duration: 65, // min
      volume: 12400, // kg
      exercises: [
        { name: 'Conventional Deadlift', sets: 4, reps: '6,6,5,4', weight: 140 },
        { name: 'Weighted Pull-Up', sets: 3, reps: '8,8,6', weight: 15 },
        { name: 'Incline Dumbbell Curl', sets: 3, reps: '12,10,10', weight: 18 }
      ],
      completed: true,
      date: 'Today'
    },
    {
      id: 'w2',
      name: 'AURA AI Hypertrophy Push',
      duration: 60,
      volume: 8500,
      exercises: [
        { name: 'Barbell Bench Press', sets: 4, reps: '8,8,6,6', weight: 95 },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10,10,8', weight: 28 },
        { name: 'Cable Tricep Pushdown', sets: 3, reps: '12,12,10', weight: 32 }
      ],
      completed: false,
      date: 'Tomorrow'
    }
  ]);

  // Active workout editor
  const [customWorkout, setCustomWorkout] = useState({
    name: 'My Custom Hypertrophy Routine',
    exercises: []
  });

  // AI Coach AURA Conversation Memory
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'aura',
      time: '12:00 PM',
      text: "Greetings, Raj. I am AURA. Your biometric readings indicate a Recovery Score of 88% and a HRV of 78ms, placing you in prime state for heavy stimulation. I recommend completing the 'AURA AI Hypertrophy Push' sequence today focusing on your upper body push chain. What would you like to optimize today?"
    }
  ]);

  // Community Feed State
  const [communityFeed, setCommunityFeed] = useState([
    {
      id: 'f1',
      user: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80',
      action: 'completed a run',
      metric: '8.4 km @ 4:25/km',
      likes: 24,
      comments: 3,
      time: '2 hours ago',
      verified: true
    },
    {
      id: 'f2',
      user: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80',
      action: 'reached a new PR in Squats',
      metric: '180 kg for 3 reps',
      likes: 42,
      comments: 7,
      time: '4 hours ago',
      verified: true
    }
  ]);

  // Strava Challenges State
  const [challenges, setChallenges] = useState([
    { id: 'c1', title: 'June VO2 Max Peak', participants: 12480, progress: 65, joined: true },
    { id: 'c2', title: '15k Calories Burn Sprint', participants: 8430, progress: 0, joined: false }
  ]);

  // Integrated Health Connections Simulator
  const [integrations, setIntegrations] = useState({
    whoop: true,
    strava: true,
    appleHealth: false,
    garmin: false
  });

  // Strength Records History
  const [strengthRecords, setStrengthRecords] = useState([
    { date: 'Jan 10', bench: 85, squat: 120, deadlift: 150 },
    { date: 'Feb 15', bench: 88, squat: 125, deadlift: 155 },
    { date: 'Mar 20', bench: 90, squat: 130, deadlift: 160 },
    { date: 'Apr 25', bench: 92, squat: 135, deadlift: 165 },
    { date: 'May 30', bench: 95, squat: 140, deadlift: 170 }
  ]);

  // Add meal function
  const addMeal = (name, calories, protein, carbs, fats) => {
    const newMeal = {
      id: Date.now(),
      name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fats: parseInt(fats) || 0
    };
    setMeals([...meals, newMeal]);

    // Send context alert message from AI Coach after logging food
    setChatHistory(prev => [
      ...prev,
      {
        sender: 'aura',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Log confirmed: "${name}". You have consumed ${calories} kcal. Daily protein intake is now at ${meals.reduce((sum, m) => sum + m.protein, 0) + protein}g. Recommend target of ${userProfile.targetProtein}g to support today's hypertrophic recovery.`
      }
    ]);
  };

  // Add custom workout function
  const saveCustomWorkout = (name, exercisesList) => {
    const newWorkout = {
      id: 'cw-' + Date.now(),
      name: name || 'Custom Routine',
      duration: exercisesList.length * 15 || 45,
      volume: exercisesList.reduce((sum, ex) => sum + (ex.sets * (parseInt(ex.weight) || 0) * 10), 0),
      exercises: exercisesList.map(ex => ({
        name: ex.name,
        sets: parseInt(ex.sets) || 3,
        reps: ex.reps || '10',
        weight: parseInt(ex.weight) || 0
      })),
      completed: false,
      date: 'Tomorrow'
    };
    setWorkouts([...workouts, newWorkout]);
  };

  // Log workout as completed
  const completeWorkout = (id) => {
    setWorkouts(prev => prev.map(w => {
      if (w.id === id) {
        // Trigger alert community post
        const newFeedPost = {
          id: 'cf-' + Date.now(),
          user: userProfile.name + ' (You)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80',
          action: `completed ${w.name}`,
          metric: `${w.duration} min • ${w.volume.toLocaleString()} kg volume`,
          likes: 1,
          comments: 0,
          time: 'Just now',
          verified: true
        };
        setCommunityFeed([newFeedPost, ...communityFeed]);
        return { ...w, completed: true };
      }
      return w;
    }));
  };

  // Send message to AI Coach
  const sendChatMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };

    setChatHistory(prev => [...prev, userMsg]);

    // Simple reactive chatbot responses based on inputs
    setTimeout(() => {
      let coachReply = "I have logged that update. Let me adjust your physiological matrix model. Your metrics are synchronized.";
      
      const query = text.toLowerCase();
      if (query.includes('workout') || query.includes('train') || query.includes('exercise')) {
        coachReply = `Based on your recovery rating (${userProfile.recoveryScore}%) and goal of ${userProfile.goal}, you should prioritize training your ${currentPage === 'workouts' ? 'listed' : 'Push'} muscles. Keep intense workloads limited to 75 minutes.`;
      } else if (query.includes('macro') || query.includes('calorie') || query.includes('eat') || query.includes('food') || query.includes('nutrition')) {
        coachReply = `Your target profile is set to ${userProfile.targetCalories} kcal (Protein: ${userProfile.targetProtein}g, Carbs: ${userProfile.targetCarbs}g, Fats: ${userProfile.targetFats}g). You have consumed ${meals.reduce((sum, m) => sum + m.calories, 0)} kcal so far today. Let me know if you would like me to suggest an optimized meal plan.`;
      } else if (query.includes('suggest') || query.includes('meal') || query.includes('recipe')) {
        coachReply = "AI Meal Recommendation: Pan-Seared Salmon Fillet (180g), Sweet Potato Mash (150g), Broccoli Florets, and Extra Virgin Olive Oil. Macros: 650 kcal, 45g Protein, 48g Carbs, 28g Fats. This will support muscle repair without spiking insulin.";
      } else if (query.includes('recovery') || query.includes('tired') || query.includes('sore')) {
        coachReply = `Your HRV is ${userProfile.hrv}ms, which signals moderate sympathetic load. I advise keeping target intensity below 85% of 1RM today. Ensure sleep duration hits 8+ hours tonight.`;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
        coachReply = `Hello ${userProfile.name}. How can I assist you with your fitness metrics, dietary targets, or performance programming today?`;
      }

      const aiMsg = {
        sender: 'aura',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: coachReply
      };

      setChatHistory(prev => [...prev, aiMsg]);
    }, 1000);
  };

  // Join/Leave challenges
  const toggleChallenge = (id) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, joined: !c.joined, participants: c.joined ? c.participants - 1 : c.participants + 1 };
      }
      return c;
    }));
  };

  // Toggle integrations
  const toggleIntegration = (key) => {
    setIntegrations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Update profile from onboarding or settings
  const updateProfile = (newData) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...newData };
      // Dynamically calculate calories based on new weight / goal
      if (newData.weight || newData.goal) {
        const baseKcal = (newData.weight || prev.weight) * 24 * 1.4; // rough BMR * activity
        let goalAdjusted = baseKcal;
        if (updated.goal === 'Hypertrophy') goalAdjusted += 400;
        if (updated.goal === 'Endurance') goalAdjusted += 300;
        if (updated.goal === 'Longevity') goalAdjusted -= 100;
        
        updated.targetCalories = Math.round(goalAdjusted);
        updated.targetProtein = Math.round((newData.weight || prev.weight) * 2.2);
        updated.targetFats = Math.round((goalAdjusted * 0.25) / 9);
        updated.targetCarbs = Math.round((goalAdjusted - (updated.targetProtein * 4) - (updated.targetFats * 9)) / 4);
      }
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      premiumPlan,
      setPremiumPlan,
      userProfile,
      updateProfile,
      meals,
      addMeal,
      exerciseDB,
      workouts,
      saveCustomWorkout,
      completeWorkout,
      customWorkout,
      setCustomWorkout,
      chatHistory,
      sendChatMessage,
      communityFeed,
      setCommunityFeed,
      challenges,
      toggleChallenge,
      integrations,
      toggleIntegration,
      strengthRecords,
      setStrengthRecords
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
