import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getToken, removeToken } from '@/api/client';
import { login as apiLogin, logout as apiLogout, User } from '@/api/auth';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = await getToken();
      if (token) {
        // Token exists - user is authenticated
        // In a real app, you might want to validate the token or fetch user data
        setUser({} as User); // Placeholder - will be replaced when we add a /me endpoint
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await removeToken();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const userData = await apiLogin(email, password);
    setUser(userData);
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
