'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
}

interface TriageResult {
  score: number;
  careLevel: 'Green' | 'Yellow' | 'Red';
  symptom?: string;
  answers?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  triageResult: TriageResult | null;
  setTriageResult: (result: TriageResult | null) => void;
  clearTriageResult: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('triage-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('triage-user');
      }
    }
    const storedResult = sessionStorage.getItem('triage-result');
    if (storedResult) {
      try {
        setTriageResult(JSON.parse(storedResult));
      } catch (e) {
        sessionStorage.removeItem('triage-result');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('triage-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setTriageResult(null);
    localStorage.removeItem('triage-user');
    sessionStorage.removeItem('triage-result');
  };

  const clearTriageResult = () => {
    setTriageResult(null);
    sessionStorage.removeItem('triage-result');
  };

  const handleSetTriageResult = (result: TriageResult | null) => {
    setTriageResult(result);
    if (result) {
      sessionStorage.setItem('triage-result', JSON.stringify(result));
    } else {
      sessionStorage.removeItem('triage-result');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    triageResult,
    setTriageResult: handleSetTriageResult,
    clearTriageResult,
  };

  if (loading) {
    return null; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
