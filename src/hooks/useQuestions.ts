import { useState, useEffect } from 'react';
import { supabase, Question } from '../lib/supabase';

export function useQuestions(sortBy: 'newest' | 'popular' | 'unanswered' = 'newest') {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [sortBy]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('questions')
        .select(`
          *,
          profiles!questions_user_id_fkey (
            id,
            username,
            avatar_url
          )
        `);

      // Add sorting
      switch (sortBy) {
        case 'popular':
          // We'll calculate vote count in a separate query for now
          query = query.order('created_at', { ascending: false });
          break;
        case 'unanswered':
          query = query.order('created_at', { ascending: false });
          break;
        default: // newest
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Get vote counts and answer counts for each question
      const questionsWithCounts = await Promise.all(
        (data || []).map(async (question) => {
          // Get vote count
          const { data: votes } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('target_id', question.id)
            .eq('target_type', 'question');

          const voteCount = votes?.reduce((acc, vote) => {
            return acc + (vote.vote_type === 'up' ? 1 : -1);
          }, 0) || 0;

          // Get answer count
          const { count: answerCount } = await supabase
            .from('answers')
            .select('*', { count: 'exact', head: true })
            .eq('question_id', question.id);

          return {
            ...question,
            vote_count: voteCount,
            answer_count: answerCount || 0,
          };
        })
      );

      // Sort by vote count if popular
      if (sortBy === 'popular') {
        questionsWithCounts.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));
      } else if (sortBy === 'unanswered') {
        questionsWithCounts.sort((a, b) => (a.answer_count || 0) - (b.answer_count || 0));
      }

      setQuestions(questionsWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async (title: string, content: string, tags: string[]) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .insert([
          {
            title,
            content,
            tags,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Refresh questions list
      await fetchQuestions();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    questions,
    loading,
    error,
    createQuestion,
    refetch: fetchQuestions,
  };
}