import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext'; // ✅ Will use backend later inside AuthContext
//import { DataProvider } from './context/DataContext'; // ✅ If using real-time data, you may later fetch from backend

import Login from './components/Login'; // ✅ This uses AuthContext.login() — replace logic in AuthContext only

// Layout
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Director Components
import DirectorDashboard from './components/Director/Dashboard';
import Analytics from './components/Director/Analytics';
import ViewTrainers from './components/Director/ViewTrainers';
import RoleManager from './components/Director/RoleManager';

// Trainer Components
import TrainerDashboard from './components/Trainer/Dashboard';
import AddTraineeForm from './components/Trainer/AddTraineeForm';
import Marksheet from './components/Trainer/Marksheet';
import IDCard from './components/Trainer/IDCard';

// Common
import Profile from './components/Common/Profile';

function AppContent() {
  const { user, isLoading } = useAuth(); // ✅ `user` comes from AuthContext, which you will wire to backend later
  const [activeSection, setActiveSection] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading STC Training Management System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />; // ✅ Login logic is in AuthContext; just swap mock login with real login API there
  }

  const getSectionTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      trainers: 'View Trainers',
      roles: 'Role Manager',
      'add-trainee': 'Add Trainee',
      marksheet: 'Marksheet Management',
      'id-card': 'ID Card Generation',
      profile: 'My Profile'
    };
    return titles[activeSection] || 'Dashboard';
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    if (activeSection === 'add-trainee') return <AddTraineeForm />;
    if (activeSection === 'profile') return <Profile />;

    // ✅ Role-based rendering — works now, no change needed
    if (user.role === 'director') {
      switch (activeSection) {
        case 'analytics':
          return <Analytics />;
        case 'trainers':
          return <ViewTrainers />;
        case 'roles':
          return <RoleManager />;
        default:
          return <DirectorDashboard onNavigate={handleNavigation} />;
      }
    } else {
      switch (activeSection) {
        case 'marksheet':
          return <Marksheet />;
        case 'id-card':
          return <IDCard />;
        default:
          return <TrainerDashboard onNavigate={handleNavigation} />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getSectionTitle()} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    // ✅ AuthProvider → later will be connected to backend for login/logout/updateUser
    <AuthProvider>
      {/* ✅ DataProvider → optionally switch to use data from backend if needed */}
 
        <AppContent />
   
    </AuthProvider>
  );
}

export default App;
