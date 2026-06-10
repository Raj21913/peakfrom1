import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import AnalysisScreen from './pages/AnalysisScreen';
import DashboardPage from './pages/DashboardPage';
import WorkoutsPage from './pages/WorkoutsPage';
import NutritionPage from './pages/NutritionPage';
import ProgressPage from './pages/ProgressPage';
import CoachPage from './pages/CoachPage';
import CommunityPage from './pages/CommunityPage';
import AthletePage from './pages/AthletePage';
import CheckinPage from './pages/CheckinPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';

const AppContent = () => {
  const { currentPage } = useApp();

  // Route mapping resolver
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'analysis':
        return <AnalysisScreen />;
      case 'dashboard':
        return <DashboardPage />;
      case 'workouts':
        return <WorkoutsPage />;
      case 'nutrition':
        return <NutritionPage />;
      case 'progress':
        return <ProgressPage />;
      case 'coach':
        return <CoachPage />;
      case 'community':
        return <CommunityPage />;
      case 'athlete':
        return <AthletePage />;
      case 'checkin':
        return <CheckinPage />;
      case 'pricing':
        return <PricingPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
