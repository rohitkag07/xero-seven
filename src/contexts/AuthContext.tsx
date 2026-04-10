import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../lib/authService';
import type { AuthUser } from '../lib/authService';

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, fullName: string, company?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
        } else {
          // Bypass Login: Provide mock user info as requested
          console.log('[Auth] Bypassing login with mock user: Rohit Kag');
          setUser({
            id: 'mock-user-rohit',
            email: 'rohit@xero.com',
            fullName: 'Rohit Kag',
            company: 'Xero Seven Agency',
            role: 'admin',
          });
        }
        setError(null);
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // The SDK does not have real-time auth state events,
    // so we rely on context methods (signIn, signOut) to update state.
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, fullName: string, company?: string) => {
      try {
        setError(null);
        setLoading(true);
        await authService.signUp({ email, password, fullName, company });
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Sign up failed';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await authService.signIn({ email, password });
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      await authService.signOut();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await authService.resetPassword(email);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
