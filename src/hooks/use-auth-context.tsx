
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        logger.error('Error refreshing session:', error);
        throw error;
      }
      setUser(session?.user ?? null);
    } catch (error: any) {
      logger.error('Failed to refresh session:', error);
      setUser(null);
      toast({
        title: "Authentication Error",
        description: "Failed to verify your session. Please try signing in again.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  };

  useEffect(() => {
    // Set up auth state change subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      logger.info('Auth state changed:', event);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Handle specific auth events
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

    // Get initial session
    refreshSession().finally(() => setIsLoading(false));

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      logger.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, refreshSession }}>
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
