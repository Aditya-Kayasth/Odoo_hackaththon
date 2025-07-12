import React from 'react';
import { Answer } from '../../lib/supabase';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Check, Clock } from 'lucide-react';
import VotingWidget from '../Common/VotingWidget';

interface AnswerCardProps {
  answer: Answer;
  isQuestionOwner?: boolean;
  onAccept?: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ 
  answer, 
  isQuestionOwner = false,
  onAccept 
}) => {
  return (
    <div className={`border rounded-lg p-6 ${
      answer.isAccepted 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200 bg-white'
    }`}>
      <div className="flex gap-4">
        {/* Voting Widget */}
        <div className="flex-shrink-0">
          <VotingWidget 
            initialVotes={answer.vote_count || 0}
            targetId={answer.id}
            targetType="answer"
          />
        </div>

        {/* Answer Content */}
        <div className="flex-1 min-w-0">
          {/* Accepted Badge */}
          {answer.isAccepted && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Accepted Answer</span>
              </div>
            </div>
          )}

          {/* Answer Body */}
          <div 
            className="prose prose-sm max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: answer.content }}
          />

          {/* Answer Actions and Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Accept Button (visible to question owner) */}
              {isQuestionOwner && !answer.isAccepted && (
                <button
                  onClick={onAccept}
                  className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Answer</span>
                </button>
              )}
            </div>

            {/* Author and Timestamp */}
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(answer.created_at)}</span>
              </div>
              {answer.profiles && (
                <div className="flex items-center space-x-2">
                  <img
                    src={answer.profiles.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                    alt={answer.profiles.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium text-gray-700">{answer.profiles.username}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;