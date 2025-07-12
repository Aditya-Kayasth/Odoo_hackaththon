import { useState, useEffect } from 'react';
import { supabase, Question, Answer } from '../lib/supabase';

export function useQuestion(questionId: string) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (questionId) {
      fetchQuestion();
      fetchAnswers();
    }
  }, [questionId]);

  const fetchQuestion = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          *,
          profiles!questions_user_id_fkey (
            id,
            username,
            avatar_url
          )
        `)
        .eq('id', questionId)
        .single();

      if (error) {
        throw error;
      }

      // Get vote count
      const { data: votes } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('target_id', questionId)
        .eq('target_type', 'question');

      const voteCount = votes?.reduce((acc, vote) => {
        return acc + (vote.vote_type === 'up' ? 1 : -1);
      }, 0) || 0;

      setQuestion({
        ...data,
        vote_count: voteCount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fetchAnswers = async () => {
    try {
      const { data, error } = await supabase
        .from('answers')
        .select(`
          *,
          profiles!answers_user_id_fkey (
            id,
            username,
            avatar_url
          )
        `)
        .eq('question_id', questionId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      // Get vote counts for each answer
      const answersWithCounts = await Promise.all(
        (data || []).map(async (answer) => {
          const { data: votes } = await supabase
            .from('votes')
            .select('vote_type')
            .eq('target_id', answer.id)
            .eq('target_type', 'answer');

          const voteCount = votes?.reduce((acc, vote) => {
            return acc + (vote.vote_type === 'up' ? 1 : -1);
          }, 0) || 0;

          return {
            ...answer,
            vote_count: voteCount,
          };
        })
      );

      setAnswers(answersWithCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createAnswer = async (content: string) => {
    try {
      const { data, error } = await supabase
        .from('answers')
        .insert([
          {
            question_id: questionId,
            content,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Refresh answers
      await fetchAnswers();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  const acceptAnswer = async (answerId: string) => {
    try {
      // First, unaccept all other answers for this question
      await supabase
        .from('answers')
        .update({ is_accepted: false })
        .eq('question_id', questionId);

      // Then accept the selected answer
      const { error } = await supabase
        .from('answers')
        .update({ is_accepted: true })
        .eq('id', answerId);

      if (error) {
        throw error;
      }

      // Refresh answers
      await fetchAnswers();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return {
    question,
    answers,
    loading,
    error,
    createAnswer,
    acceptAnswer,
    refetch: () => {
      fetchQuestion();
      fetchAnswers();
    },
  };
}