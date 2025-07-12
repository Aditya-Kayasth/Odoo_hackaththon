import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useVoting() {
  const [loading, setLoading] = useState(false);

  const vote = async (
    targetId: string,
    targetType: 'question' | 'answer',
    voteType: 'up' | 'down'
  ) => {
    try {
      setLoading(true);

      // Check if user already voted
      const { data: existingVote } = await supabase
        .from('votes')
        .select('*')
        .eq('target_id', targetId)
        .eq('target_type', targetType)
        .single();

      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Remove vote if clicking the same vote type
          const { error } = await supabase
            .from('votes')
            .delete()
            .eq('id', existingVote.id);

          if (error) throw error;
        } else {
          // Update vote if clicking different vote type
          const { error } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('id', existingVote.id);

          if (error) throw error;
        }
      } else {
        // Create new vote
        const { error } = await supabase
          .from('votes')
          .insert([
            {
              target_id: targetId,
              target_type: targetType,
              vote_type: voteType,
            },
          ]);

        if (error) throw error;
      }

      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const getUserVote = async (targetId: string, targetType: 'question' | 'answer') => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('target_id', targetId)
        .eq('target_type', targetType)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data?.vote_type as 'up' | 'down' | null;
    } catch (err) {
      console.error('Error getting user vote:', err);
      return null;
    }
  };

  return {
    vote,
    getUserVote,
    loading,
  };
}