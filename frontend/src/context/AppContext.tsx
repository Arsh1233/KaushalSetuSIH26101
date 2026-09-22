import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Role = 'official' | 'admin';

interface AppContextValue {
  role: Role;
  setRole: (role: Role) => void;
  currentOfficialId: string;
  setCurrentOfficialId: (id: string) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('official');
  const [currentOfficialId, setCurrentOfficialId] = useState('ananya-sharma');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{ role, setRole, currentOfficialId, setCurrentOfficialId, language, setLanguage, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
