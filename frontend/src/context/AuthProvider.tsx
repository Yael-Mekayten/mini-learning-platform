import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      console.log('🔄 Navigating to /login');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, clear user state
      setUser(null);
      console.log('🔄 Navigating to /login (after error)');
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
