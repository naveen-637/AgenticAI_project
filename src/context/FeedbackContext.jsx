import { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'tka_feedback';

const INITIAL = [
  { id: 1, name: 'Arjun Sharma', email: 'arjun@example.com', category: 'UI/UX', rating: 5, message: 'The dashboard layout is clean and very intuitive. Loved the analytics section!', date: '12/07/2025' },
  { id: 2, name: 'Priya Nair', email: 'priya@example.com', category: 'Feature Request', rating: 4, message: 'Would love to see export functionality for project reports in PDF format.', date: '11/07/2025' },
  { id: 3, name: 'Karan Mehta', email: 'karan@example.com', category: 'Bug Report', rating: 3, message: 'Search bar sometimes does not filter correctly on mobile devices.', date: '10/07/2025' },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL;
  } catch {
    return INITIAL;
  }
}

function save(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* ignore */ }
}

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [feedbackList, setFeedbackList] = useState(load);

  const addFeedback = (entry) => {
    setFeedbackList((prev) => {
      const next = [entry, ...prev];
      save(next);
      return next;
    });
  };

  return (
    <FeedbackContext.Provider value={{ feedbackList, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  return useContext(FeedbackContext);
}
