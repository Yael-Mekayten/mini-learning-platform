import React, { createContext, useEffect, useState } from 'react';
import { AuthService } from '../api/auth.service';
import * as Types from '../types/index';
type User = Types.User;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refresh: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const { data } = await AuthService.me();
      setUser(data.user);
      console.log('User loaded:', data.user);
    } catch (error) {
      console.log('No user found, redirecting to login');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const logout = async () => {
    try {
      console.log('🚪 Calling logout API...');
      await AuthService.logout();
      console.log('✅ Logout API successful');
      setUser(null);
      console.log('🔄 Current URL:', window.location.href);
      console.log('🔄 Redirecting to login...');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear user state
      setUser(null);
      console.log('🔄 Redirecting to login after error...');
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
