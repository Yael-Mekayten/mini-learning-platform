// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from "react";
import axiosClient from "../api/axiosClient";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // בודקים מי מחובר כשנטענת האפליקציה
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosClient.get("/auth/me");
        if (data.success) setUser(data.user);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosClient.post("/auth/login", { email, password });
      if (data.success) setUser(data.user);
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axiosClient.post("/auth/register", { name, email, password });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
      setUser(null);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
