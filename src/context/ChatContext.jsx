import { createContext, useContext, useState } from 'react';

const STORAGE_KEY = 'tka_chat';

const STARTER = [
  { id: 1, role: 'assistant', text: 'Hi, I can search team, project, member, role, and status information from the CSV knowledge base.' },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : STARTER;
  } catch {
    return STARTER;
  }
}

function save(msgs) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)); } catch { /* ignore */ }
}

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(load);

  const addMessage = (msg) => {
    setMessages((prev) => {
      const next = [...prev, msg];
      save(next);
      return next;
    });
  };

  const clearMessages = () => {
    setMessages(STARTER);
    save(STARTER);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
