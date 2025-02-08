
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  const fetchUserProfile = async (userId: string) => {
    logger.info('Fetching user profile for ID:', userId);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, role, status')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        logger.error('Error fetching user profile:', error);
        throw error;
      }
      
      if (data) {
        logger.info('User profile fetched successfully:', data);
        setUserProfile(data);
      } else {
        logger.warn('No user profile found for ID:', userId);
        setUserProfile(null);
      }
    } catch (error: any) {
      logger.error('Error in fetchUserProfile:', error);
      setUserProfile(null);
      // Only set error for non-RLS related issues
      if (!error.message?.includes('Row level security')) {
        setError(error);
      }
    }
  };

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
        logger.info('Session refresh successful, user found:', session.user.id);
        setUser(session.user);
        await fetchUserProfile(session.user.id);
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

  useEffect(() => {
    logger.info('AuthProvider mounted');
    let isSubscribed = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info('Auth state changed:', event);
      if (!isSubscribed) return;
      
      setIsLoading(true);
      
      try {
        if (session?.user) {
          logger.info('Session user found:', session.user.id);
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          logger.info('No session user found');
          setUser(null);
          setUserProfile(null);
        }
      } catch (error: any) {
        logger.error('Error handling auth state change:', error);
        // Only set error for critical auth issues
        if (!error.message?.includes('Row level security')) {
          setError(error);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    });

    // Initial session check
    refreshSession();

    return () => {
      logger.info('AuthProvider unmounting');
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, []);

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
