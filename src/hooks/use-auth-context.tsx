
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';
import type { UserProfile } from '@/types/user';
import { useFetchProfile } from './auth/use-fetch-profile';
import { useSessionHandler } from './auth/use-session-handler';

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

  const fetchUserProfile = useFetchProfile();
  const { setupAuthListener, authStateChangeTimeout } = useSessionHandler({
    setUser,
    setUserProfile,
    setIsLoading,
    fetchUserProfile
  });

  const refreshSession = async () => {
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
  };

  const signOut = async () => {
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
  };

  useEffect(() => {
    logger.info('AuthProvider mounted');
    const subscription = setupAuthListener();
    refreshSession();

    return () => {
      logger.info('AuthProvider unmounting');
      if (authStateChangeTimeout.current) {
        clearTimeout(authStateChangeTimeout.current);
      }
      subscription.unsubscribe();
    };
  }, [setupAuthListener]);

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
