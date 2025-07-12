import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Profile {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  vote_count?: number;
  answer_count?: number;
  user_vote?: 'up' | 'down' | null;
}

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  is_accepted: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  vote_count?: number;
  user_vote?: 'up' | 'down' | null;
}

export interface Vote {
  id: string;
  user_id: string;
  target_id: string;
  target_type: 'question' | 'answer';
  vote_type: 'up' | 'down';
  created_at: string;
}