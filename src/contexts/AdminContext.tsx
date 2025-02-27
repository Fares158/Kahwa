import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { AdminUser, AdminState } from '../types/admin';

interface AdminContextType extends AdminState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AdminState>({
    isAuthenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session check error:', error);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setState({
          isAuthenticated: true,
          user: {
            id: session.user.id,
            email: session.user.email!,
            role: 'admin'
          }
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setState({
          isAuthenticated: true,
          user: {
            id: session.user.id,
            email: session.user.email!,
            role: 'admin'
          }
        });
      } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setState({
          isAuthenticated: false,
          user: null
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        throw error;
      }

      if (!data?.user || !data.session) {
        throw new Error('Login failed - please try again');
      }

      setState({
        isAuthenticated: true,
        user: {
          id: data.user.id,
          email: data.user.email!,
          role: 'admin'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setState({
        isAuthenticated: false,
        user: null
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to sign out');
    }
  };

  return (
    <AdminContext.Provider value={{ ...state, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};