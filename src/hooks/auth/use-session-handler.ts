
import { useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { logger } from '@/utils/logger';
import type { UserProfile } from '@/types/user';

interface SessionHandlerProps {
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  fetchUserProfile: (userId: string) => Promise<UserProfile | null>;
}

export const useSessionHandler = ({
  setUser,
  setUserProfile,
  setIsLoading,
  fetchUserProfile
}: SessionHandlerProps) => {
  const authStateChangeTimeout = useRef<NodeJS.Timeout>();

  const handleAuthStateChange = useCallback(async (event: string, session: any) => {
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
          setUserProfile(profile);
        } else {
          logger.info('No session user found');
          setUser(null);
          setUserProfile(null);
        }
      } catch (error: any) {
        logger.error('Error handling auth state change:', error);
        if (!error.message?.includes('Row level security')) {
          // Only clear user data if it's not an RLS error
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        setIsLoading(false);
      }
    }, 100); // Debounce for 100ms
  }, [setUser, setUserProfile, setIsLoading, fetchUserProfile]);

  const setupAuthListener = useCallback(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return subscription;
  }, [handleAuthStateChange]);

  return { setupAuthListener, authStateChangeTimeout };
};
