import React, { createContext, useContext, useState, useEffect } from 'react';

// MOCK USERS for testing before backend is ready
const demoUsers = [
  {
    id: '1',
    email: 'director@stc.railway.gov.in',
    name: 'Director STC',
    role: 'director',
    position: 'Director',
    phone: '+91-9876543200',
    address: 'Director Quarters, STC Campus, Northern Railway',
    department: 'Administration',
    joinDate: '2015-01-15',
    active: true
  },
  {
    id: '2',
    email: 'trainer1@stc.railway.gov.in',
    name: 'Rajesh Kumar',
    role: 'trainer',
    position: 'Senior Trainer',
    phone: '+91-9876543201',
    address: 'Staff Quarters Block A, STC Campus',
    department: 'Mechanical',
    joinDate: '2020-03-15',
    active: true
  },
  {
    id: '3',
    email: 'trainer2@stc.railway.gov.in',
    name: 'Priya Sharma',
    role: 'trainer',
    position: 'Trainer',
    phone: '+91-9876543202',
    address: 'Staff Quarters Block B, STC Campus',
    department: 'Electrical',
    joinDate: '2021-07-20',
    active: true
  }
];

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 /* fetching old user from localstorage  
 useEffect(() => {
    const savedUser = localStorage.getItem('stc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []); below is helpful in development-  it ensures no one is auto-logged-in from localStorage. */

  useEffect(() => {
  localStorage.removeItem('stc_user'); // force fresh login each time
  setIsLoading(false);
}, []);


  // CURRENT LOGIN METHOD (Mock Mode)
  const login = async (email, password) => {
    // Temporary logic using hardcoded demo users
    const foundUser = demoUsers.find(u => u.email === email);
    
    // password check is hardcoded here for testing
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('stc_user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  /*
    🔁 🔁 🔁 WHEN BACKEND IS READY, REPLACE THE login() FUNCTION ABOVE WITH THIS:

    const login = async (email, password) => {
      try {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) return false;

        setUser(data.user); // ← your backend should return user data
        localStorage.setItem("stc_user", JSON.stringify(data.user));

        return true;
      } catch (err) {
        console.error("Login failed:", err);
        return false;
      }
    };
  */

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stc_user');
  };


  //update user 
  const updateUser = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('stc_user', JSON.stringify(updatedUser));

      // Also update in demoUsers (for mock mode only)
      const userIndex = demoUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        demoUsers[userIndex] = updatedUser;
      }
    }
  };
/*
FUTURE updateUser() with backend:

    const updateUser = async (updates) => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        const updatedUser = await res.json();
        setUser(updatedUser);
        localStorage.setItem("stc_user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error("User update failed", err);
      }
    };
  */
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
