import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(undefined);

// TODO: Add API configuration
//const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function DataProvider({ children }) {
  const [trainees, setTrainees] = useState([]);
  const [trainers, setTrainers] = useState([]);
  // TODO: Add loading and error states for better UX
 // const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  // TODO: Replace this entire useEffect with API calls
  useEffect(() => {
    // REMOVE: All localStorage logic below
    const savedTrainees = localStorage.getItem('stc_trainees');
    if (savedTrainees) {
      try {
        const parsedTrainees = JSON.parse(savedTrainees);
        setTrainees(Array.isArray(parsedTrainees) ? parsedTrainees : []);
      } catch (error) {
        console.error('Error parsing saved trainees:', error);
        setTrainees([]);
      }
    } else {
      const demoTrainees = [/*...*/]; // ✅ For brevity, paste your trainee objects here as-is
      setTrainees(demoTrainees);
      localStorage.setItem('stc_trainees', JSON.stringify(demoTrainees));
    }

    const savedTrainers = localStorage.getItem('stc_trainers');
    if (savedTrainers) {
      try {
        const parsedTrainers = JSON.parse(savedTrainers);
        setTrainers(Array.isArray(parsedTrainers) ? parsedTrainers : []);
      } catch (error) {
        console.error('Error parsing saved trainers:', error);
        setTrainers([]);
      }
    } else {
      const demoTrainers = [
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
      setTrainers(demoTrainers);
      localStorage.setItem('stc_trainers', JSON.stringify(demoTrainers));
    }

    // REPLACE WITH: API calls to load initial data
    /*
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [traineesResponse, trainersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/trainees`),
          fetch(`${API_BASE_URL}/trainers`)
        ]);
        
        if (!traineesResponse.ok || !trainersResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const traineesData = await traineesResponse.json();
        const trainersData = await trainersResponse.json();
        
        setTrainees(traineesData);
        setTrainers(trainersData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
    */
  }, []);

  // REMOVE: These localStorage save functions
  const saveTrainees = (newTrainees) => {
    setTrainees(newTrainees);
    localStorage.setItem('stc_trainees', JSON.stringify(newTrainees));
  };

  const saveTrainers = (newTrainers) => {
    setTrainers(newTrainers);
    localStorage.setItem('stc_trainers', JSON.stringify(newTrainers));
  };

  // REMOVE: Client-side ID generation - let backend handle this
  const generateTraineeId = () => {
    const year = new Date().getFullYear();
    const count = trainees.length + 1;
    return `STC${year}-${count.toString().padStart(3, '0')}`;
  };

  const generateTicketNumber = () => {
    const year = new Date().getFullYear();
    const count = trainees.length + 1;
    return `TKT-${year}-${count.toString().padStart(3, '0')}`;
  };

  const generateTrainerId = () => {
    const count = trainers.length + 4;
    return count.toString();
  };

  // TODO: Replace with API call to POST /api/trainees
  const addTrainee = async (traineeData) => {
    // REMOVE: This setTimeout simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTrainee = {
          ...traineeData,
          id: generateTraineeId(),
          ticketNumber: generateTicketNumber(),
          createdAt: new Date().toISOString()
        };
        const updatedTrainees = [...trainees, newTrainee];
        saveTrainees(updatedTrainees);
        resolve();
      }, 500);
    });

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(traineeData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add trainee');
      }
      
      const newTrainee = await response.json();
      setTrainees(prev => [...prev, newTrainee]);
      setError(null);
      return newTrainee;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // TODO: Replace with API call to PUT /api/trainees/:id
  const updateTrainee = (id, updates) => {
    // REMOVE: Direct state manipulation
    const updatedTrainees = trainees.map(trainee =>
      trainee.id === id ? { ...trainee, ...updates } : trainee
    );
    saveTrainees(updatedTrainees);

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update trainee');
      }
      
      const updatedTrainee = await response.json();
      setTrainees(prev => prev.map(t => t.id === id ? updatedTrainee : t));
      setError(null);
      return updatedTrainee;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // TODO: Replace with API call to DELETE /api/trainees/:id
  const deleteTrainee = (id) => {
    // REMOVE: Direct state manipulation
    const updatedTrainees = trainees.filter(trainee => trainee.id !== id);
    saveTrainees(updatedTrainees);

    // Remove related attendance
  const currentAttendance = JSON.parse(localStorage.getItem('stc_attendance')) || {};
  delete currentAttendance[id];
  localStorage.setItem('stc_attendance', JSON.stringify(currentAttendance));

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainees/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete trainee');
      }
      
      setTrainees(prev => prev.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // TODO: Replace with API call to POST /api/trainers
  const addTrainer = async (trainerData) => {
    // REMOVE: This setTimeout simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTrainer = {
          ...trainerData,
          id: generateTrainerId(),
          role: 'trainer'
        };
        const updatedTrainers = [...trainers, newTrainer];
        saveTrainers(updatedTrainers);
        resolve();
      }, 500);
    });

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...trainerData, role: 'trainer'})
      });
      
      if (!response.ok) {
        throw new Error('Failed to add trainer');
      }
      
      const newTrainer = await response.json();
      setTrainers(prev => [...prev, newTrainer]);
      setError(null);
      return newTrainer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // TODO: Replace with API call to PUT /api/trainers/:id
  const updateTrainer = (id, updates) => {
    // REMOVE: Direct state manipulation
    const updatedTrainers = trainers.map(trainer =>
      trainer.id === id ? { ...trainer, ...updates } : trainer
    );
    saveTrainers(updatedTrainers);

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update trainer');
      }
      
      const updatedTrainer = await response.json();
      setTrainers(prev => prev.map(t => t.id === id ? updatedTrainer : t));
      setError(null);
      return updatedTrainer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // TODO: Replace with API call to DELETE /api/trainers/:id
  const deleteTrainer = (id) => {
    // REMOVE: Direct state manipulation
    const updatedTrainees = trainees.filter(trainee => trainee.trainerId !== id);
    saveTrainees(updatedTrainees);

    const updatedTrainers = trainers.filter(trainer => trainer.id !== id);
    saveTrainers(updatedTrainers);

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete trainer');
      }
      
      // Update local state - backend should handle cascade delete of related trainees
      setTrainers(prev => prev.filter(t => t.id !== id));
      setTrainees(prev => prev.filter(t => t.trainerId !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  // KEEP: These can remain as client-side utility functions
  const getTraineesByTrainer = (trainerId) => {
    return trainees.filter(trainee => trainee.trainerId === trainerId);
  };

  const getTrainerById = (id) => {
    return trainers.find(trainer => trainer.id === id);
  };

  // TODO: Replace with API call to GET /api/analytics
  const getAnalytics = () => {
    // REMOVE: Client-side calculation
    const totalTrainees = trainees.length;
    const activeTrainers = trainers.filter(t => t.active).length;

    const courseDistribution = [
      { name: '13 weeks', value: trainees.filter(t => t.courseDuration === '13 weeks').length },
      { name: '52 weeks', value: trainees.filter(t => t.courseDuration === '52 weeks').length },
      { name: 'Others', value: trainees.filter(t => !['13 weeks', '52 weeks'].includes(t.courseDuration)).length }
    ].filter(item => item.value > 0);

    const moduleEnrollment = [
      { module: 'MSE-C', count: trainees.filter(t => t.moduleNumber === 'MSE-C').length },
      { module: 'MJI-W', count: trainees.filter(t => t.moduleNumber === 'MJI-W').length },
      { module: 'MJI-D', count: trainees.filter(t => t.moduleNumber === 'MJI-D').length }
    ].filter(item => item.count > 0);

    const monthlyData = {};
    trainees.forEach(trainee => {
      const date = new Date(trainee.createdAt);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    });

    const monthlyEnrollment = Object.entries(monthlyData).map(([month, enrollments]) => ({
      month,
      enrollments
    }));

    return {
      totalTrainees,
      activeTrainers,
      courseDistribution,
      monthlyEnrollment,
      moduleEnrollment
    };

    // REPLACE WITH: API call
    /*
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/analytics`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      const analytics = await response.json();
      setError(null);
      return analytics;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <DataContext.Provider
      value={{
        trainees,
        trainers,
        // TODO: Add loading and error states to context
       // loading,
        //error,
        addTrainee,
        updateTrainee,
        deleteTrainee,
        getTraineesByTrainer,
        getAnalytics,
        // REMOVE: These ID generators once backend is ready
        generateTicketNumber,
        generateTraineeId,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        getTrainerById
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataContext };


// TODO: Backend API Endpoints you need to create:
/*
Express.js Routes needed:

1. GET /api/trainees - Get all trainees
2. POST /api/trainees - Create new trainee
3. PUT /api/trainees/:id - Update trainee
4. DELETE /api/trainees/:id - Delete trainee

5. GET /api/trainers - Get all trainers
6. POST /api/trainers - Create new trainer
7. PUT /api/trainers/:id - Update trainer
8. DELETE /api/trainers/:id - Delete trainer (cascade delete related trainees)

9. GET /api/analytics - Get dashboard analytics

SQLite Tables needed:

1. trainees table:
   - id (PRIMARY KEY, AUTO INCREMENT)
   - trainee_id (VARCHAR, UNIQUE) - Generated: STC2025-001
   - ticket_number (VARCHAR, UNIQUE) - Generated: TKT-2025-001
   - name, email, phone, address, etc.
   - trainer_id (FOREIGN KEY references trainers.id)
   - created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
   - updated_at (DATETIME DEFAULT CURRENT_TIMESTAMP)

2. trainers table:
   - id (PRIMARY KEY, AUTO INCREMENT)
   - name, email, phone, position, department, etc.
   - role (VARCHAR DEFAULT 'trainer')
   - active (BOOLEAN DEFAULT true)
   - join_date (DATE)
   - created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
   - updated_at (DATETIME DEFAULT CURRENT_TIMESTAMP)

Environment Variables needed:
- REACT_APP_API_URL=http://localhost:5000/api (for frontend)
- PORT=5000 (for backend)
- DB_PATH=./database.sqlite (for backend)
*/