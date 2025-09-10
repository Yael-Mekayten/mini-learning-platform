import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axiosClient.get("/auth/me");
        if (data.success) setUser(data.user);
      } catch {
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
      return { success: false, error: error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axiosClient.post("/auth/register", { name, email, password });
      return data;
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook לשימוש נוח
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
