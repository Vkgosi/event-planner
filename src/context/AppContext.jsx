import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

/**
 * Generates a unique ID for new events.
 * @returns {string} A unique identifier string.
 */
const generateId = () => `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/**
 * Seed events for demo purposes.
 */
const SEED_EVENTS = [
  {
    id: 'evt_seed_1',
    name: 'Team Standup',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '09:00',
    location: 'Zoom',
    description: 'Daily sync with the engineering team.',
    category: 'work',
    createdAt: Date.now(),
  },
  {
    id: 'evt_seed_2',
    name: "Mom's Birthday Dinner",
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    time: '19:00',
    location: 'The Grillhouse, Sandton',
    description: 'Celebrate mom turning 60! Reserve a table for 8.',
    category: 'personal',
    createdAt: Date.now(),
  },
  {
    id: 'evt_seed_3',
    name: 'Dentist Appointment',
    date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    time: '11:30',
    location: 'Rosebank Dental Clinic',
    description: 'Routine checkup and cleaning.',
    category: 'health',
    createdAt: Date.now(),
  },
];

/**
 * AppProvider wraps the app and supplies auth + event state via Context API.
 */
export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** Register a new user account. Returns { success, error }. */
  const register = useCallback((userData) => {
    const exists = users.some(
      (u) => u.email === userData.email || u.username === userData.username
    );
    if (exists) {
      return { success: false, error: 'Email or username already taken.' };
    }

    const newUser = { ...userData, id: `user_${Date.now()}` };
    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  }, [users]);

  /** Log in an existing user. Returns { success, error }. */
  const login = useCallback((emailOrUsername, password) => {
    const user = users.find(
      (u) =>
        (u.email === emailOrUsername || u.username === emailOrUsername) &&
        u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid credentials. Please try again.' };
    }

    setCurrentUser(user);
    setIsLoggedIn(true);
    // Load seed events on first login for a better demo experience
    setEvents(SEED_EVENTS);
    return { success: true };
  }, [users]);

  /** Log the current user out. */
  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setEvents([]);
  }, []);

  /** Add a new event to the list. */
  const addEvent = useCallback((eventData) => {
    const newEvent = {
      ...eventData,
      id: generateId(),
      createdAt: Date.now(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  /** Update an existing event by ID. */
  const updateEvent = useCallback((id, updatedData) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updatedData } : evt))
    );
  }, []);

  /** Remove an event by ID. */
  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((evt) => evt.id !== id));
  }, []);

  /** Get all upcoming events sorted by date ascending. */
  const upcomingEvents = events
    .filter((evt) => new Date(`${evt.date}T${evt.time}`) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  /** Get all past events. */
  const pastEvents = events
    .filter((evt) => new Date(`${evt.date}T${evt.time}`) < new Date())
    .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

  const value = {
    currentUser,
    isLoggedIn,
    events,
    upcomingEvents,
    pastEvents,
    register,
    login,
    logout,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Custom hook to access the AppContext.
 * @throws if used outside of AppProvider.
 */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
