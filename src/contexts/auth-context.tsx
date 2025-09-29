'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
}

interface TriageResult {
  score: number;
  careLevel: 'Green' | 'Yellow' | 'Red';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  triageResult: TriageResult | null;
  setTriageResult: (result: TriageResult | null) => void;
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
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    triageResult,
    setTriageResult,
  };

  if (loading) {
    return null; 
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
