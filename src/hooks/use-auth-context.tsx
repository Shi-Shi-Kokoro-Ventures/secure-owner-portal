
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, role')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('Error fetching user profile:', error);
        throw error;
      }
      
      setUserProfile(data);
    } catch (error: any) {
      logger.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        logger.error('Error refreshing session:', error);
        throw error;
      }
      
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (error: any) {
      logger.error('Failed to refresh session:', error);
      setUser(null);
      setUserProfile(null);
      toast({
        title: "Authentication Error",
        description: "Failed to verify your session. Please try signing in again.",
        variant: "destructive",
      });
      navigate('/auth');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize auth state
    let mounted = true;

    const initAuth = async () => {
      try {
        await refreshSession();
      } catch (error) {
        logger.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info('Auth state changed:', event);
      
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      
      setIsLoading(false);

      switch (event) {
        case 'SIGNED_IN':
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          break;
        case 'SIGNED_OUT':
          toast({
            title: "Signed out",
            description: "You've been successfully signed out.",
          });
          break;
        case 'TOKEN_REFRESHED':
          logger.info('Session token refreshed');
          break;
        case 'USER_UPDATED':
          toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
          });
          break;
      }
    });

    initAuth();

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      logger.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, isLoading, signOut, refreshSession }}>
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
