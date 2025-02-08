
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';
import { UserStatus } from '@/types/user';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  status: UserStatus;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const authStateChangeTimeout = useRef<NodeJS.Timeout>();

  // Memoize fetchUserProfile to prevent unnecessary recreations
  const fetchUserProfile = useCallback(async (userId: string) => {
    logger.info('Fetching user profile for ID:', userId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, role, status')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        if (!error.message?.includes('Row level security')) {
          logger.error('Error fetching user profile:', error);
          throw error;
        }
        return null;
      }
      
      if (data) {
        logger.info('User profile fetched successfully');
        return data;
      } else {
        logger.warn('No user profile found for ID:', userId);
        return null;
      }
    } catch (error: any) {
      logger.error('Error in fetchUserProfile:', error);
      return null;
    }
  }, []);

  const refreshSession = useCallback(async () => {
    logger.info('Refreshing session...');
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        logger.error('Session refresh error:', error);
        throw error;
      }
      
      if (session?.user) {
        logger.info('Session refresh successful');
        setUser(session.user);
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        logger.info('No session found during refresh');
        setUser(null);
        setUserProfile(null);
      }
    } catch (error: any) {
      logger.error('Failed to refresh session:', error);
      setUser(null);
      setUserProfile(null);
      setError(error);
      toast({
        title: "Session Error",
        description: "There was a problem with your session. Please try logging in again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, fetchUserProfile]);

  useEffect(() => {
    logger.info('AuthProvider mounted');
    let isSubscribed = true;
    
    const handleAuthStateChange = async (event: string, session: any) => {
      if (!isSubscribed) return;
      
      // Clear any pending timeouts
      if (authStateChangeTimeout.current) {
        clearTimeout(authStateChangeTimeout.current);
      }

      // Set a timeout to debounce multiple rapid auth state changes
      authStateChangeTimeout.current = setTimeout(async () => {
        logger.info('Auth state changed:', event);
        setIsLoading(true);
        
        try {
          if (session?.user) {
            logger.info('Session user found');
            setUser(session.user);
            const profile = await fetchUserProfile(session.user.id);
            if (isSubscribed) {
              setUserProfile(profile);
            }
          } else {
            logger.info('No session user found');
            setUser(null);
            setUserProfile(null);
          }
        } catch (error: any) {
          logger.error('Error handling auth state change:', error);
          if (!error.message?.includes('Row level security')) {
            setError(error);
          }
        } finally {
          if (isSubscribed) {
            setIsLoading(false);
          }
        }
      }, 100); // Debounce for 100ms
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // Initial session check
    refreshSession();

    return () => {
      logger.info('AuthProvider unmounting');
      isSubscribed = false;
      if (authStateChangeTimeout.current) {
        clearTimeout(authStateChangeTimeout.current);
      }
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, refreshSession]);

  const signOut = useCallback(async () => {
    logger.info('Signing out...');
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      navigate('/login', { replace: true });
      logger.info('Sign out successful');
    } catch (error: any) {
      logger.error('Error signing out:', error);
      setError(error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const value = {
    user,
    userProfile,
    isLoading,
    error,
    signOut,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
