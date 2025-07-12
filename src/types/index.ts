export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  reputation: number;
  isAdmin?: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  votes: number;
  answerCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: User;
  votes: number;
  isAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'answer' | 'comment' | 'mention' | 'vote';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link: string;
}