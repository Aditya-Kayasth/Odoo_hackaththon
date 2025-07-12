import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuestion } from '../hooks/useQuestion';
import { useAuth } from '../hooks/useAuth';
import { formatDistanceToNow } from '../utils/dateUtils';
import VotingWidget from '../components/Common/VotingWidget';
import AnswerCard from '../components/Answer/AnswerCard';
import RichTextEditor from '../components/Common/RichTextEditor';
import { Clock, MessageSquare, ArrowLeft } from 'lucide-react';

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { question, answers, loading, error, createAnswer, acceptAnswer } = useQuestion(id!);
  const [answerContent, setAnswerContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Question not found'}
          </h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to questions
          </Link>
        </div>
      </div>
    );
  }
  
  const isQuestionOwner = user?.id === question.user_id;

  const handleSubmitAnswer = async () => {
    if (!answerContent.trim() || !user) return;

    setSubmitting(true);
    setSubmitError(null);

    const { error } = await createAnswer(answerContent.trim());
    
    if (error) {
      setSubmitError(error);
    } else {
      setAnswerContent('');
    }
    
    setSubmitting(false);
  };

  const handleAcceptAnswer = async (answerId: string) => {
    const { error } = await acceptAnswer(answerId);
    if (error) {
      console.error('Error accepting answer:', error);
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Question not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to questions
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to questions</span>
          </Link>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            {/* Voting Widget */}
            <div className="flex-shrink-0">
              <VotingWidget 
                initialVotes={question.vote_count || 0}
                targetId={question.id}
                targetType="question"
                size="lg"
              />
            </div>

            {/* Question Content */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>

              {/* Question Meta */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {formatDistanceToNow(question.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{answers.length} answers</span>
                </div>
              </div>

              {/* Question Body */}
              <div 
                className="prose prose-gray max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: question.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Author */}
              {question.profiles && (
                <div className="flex items-center space-x-3">
                  <img
                    src={question.profiles.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                    alt={question.profiles.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{question.profiles.username}</p>
                    <p className="text-sm text-gray-500">Asked {formatDistanceToNow(question.created_at)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
          </h2>

          {answers.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
              <p className="text-gray-600">Be the first to answer this question!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {answers
                .sort((a, b) => {
                  // Sort accepted answer first, then by votes
                  if (a.isAccepted && !b.isAccepted) return -1;
                  if (!a.isAccepted && b.isAccepted) return 1;
                  return (b.vote_count || 0) - (a.vote_count || 0);
                })
                .map((answer) => (
                  <AnswerCard
                    key={answer.id}
                    answer={answer}
                    isQuestionOwner={isQuestionOwner}
                    onAccept={() => handleAcceptAnswer(answer.id)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Answer Form */}
        {user ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}
            
            <div className="mb-4">
              <RichTextEditor
                value={answerContent}
                onChange={setAnswerContent}
                placeholder="Share your knowledge and help others..."
                height="300px"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={!answerContent.trim() || submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <span>Post Answer</span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Want to answer?</h3>
            <p className="text-gray-600 mb-4">You need to be logged in to post an answer.</p>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Log in to Answer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetailPage;