import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../../lib/supabase';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { MessageSquare, Clock, User } from 'lucide-react';
import VotingWidget from '../Common/VotingWidget';

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const excerpt = question.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 200) + (question.content.length > 200 ? '...' : '');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Voting Widget */}
        <div className="flex-shrink-0">
          <VotingWidget 
            initialVotes={question.vote_count || 0}
            targetId={question.id}
            targetType="question"
            size="sm"
          />
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0">
          <Link 
            to={`/question/${question.id}`}
            className="block group"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {question.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            {excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <Link
                key={tag}
                to={`/tag/${tag}`}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{question.answer_count || 0} answers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(question.created_at)}</span>
              </div>
            </div>

            {/* Author */}
            {question.profiles && (
              <div className="flex items-center space-x-2">
                <img
                  src={question.profiles.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                  alt={question.profiles.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium text-gray-700">{question.profiles.username}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;