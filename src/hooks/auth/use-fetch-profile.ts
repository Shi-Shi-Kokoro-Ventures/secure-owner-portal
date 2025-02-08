
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';
import type { UserProfile } from '@/types/user';

export const useFetchProfile = () => {
  return useCallback(async (userId: string): Promise<UserProfile | null> => {
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
      }
      
      logger.warn('No user profile found for ID:', userId);
      return null;
    } catch (error: any) {
      logger.error('Error in fetchUserProfile:', error);
      return null;
    }
  }, []);
};
