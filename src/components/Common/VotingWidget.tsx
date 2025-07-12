import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useVoting } from '../../hooks/useVoting';
import { useAuth } from '../../hooks/useAuth';

interface VotingWidgetProps {
  initialVotes: number;
  targetId: string;
  targetType: 'question' | 'answer';
  size?: 'sm' | 'md' | 'lg';
}

const VotingWidget: React.FC<VotingWidgetProps> = ({
  initialVotes,
  targetId,
  targetType,
  size = 'md',
}) => {
  const { user } = useAuth();
  const { vote, getUserVote } = useVoting();
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) loadUserVote();
  }, [user, targetId]);

  const loadUserVote = async () => {
    const userVote = await getUserVote(targetId, targetType);
    setCurrentVote(userVote);
  };

  const handleVote = async (type: 'up' | 'down') => {
    if (!user || loading) return;

    setLoading(true);
    const oldVotes = votes;
    const oldCurrent = currentVote;
    let newVotes = votes;
    let newCurrent = currentVote;

    if (currentVote === type) {
      newVotes += type === 'up' ? -1 : 1;
      newCurrent = null;
    } else if (currentVote === null) {
      newVotes += type === 'up' ? 1 : -1;
      newCurrent = type;
    } else {
      newVotes += type === 'up' ? 2 : -2;
      newCurrent = type;
    }

    setVotes(newVotes);
    setCurrentVote(newCurrent);

    const { error } = await vote(targetId, targetType, type);
    if (error) {
      setVotes(oldVotes);
      setCurrentVote(oldCurrent);
      console.error('Error voting:', error);
    }

    setLoading(false);
  };

  const sizeClasses = (() => {
    switch (size) {
      case 'sm': return { button: 'w-6 h-6', icon: 'w-3 h-3', text: 'text-xs' };
      case 'lg': return { button: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-lg' };
      default: return { button: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' };
    }
  })();

  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        onClick={() => handleVote('up')}
        disabled={!user || loading}
        className={`${sizeClasses.button} rounded-lg border border-gray-300 flex items-center justify-center transition-all hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
          currentVote === 'up' ? 'bg-green-100 border-green-300 text-green-600' : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <ChevronUp className={sizeClasses.icon} />
      </button>
      <span className={`font-medium ${sizeClasses.text} ${
        votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-gray-600'
      }`}>
        {votes}
      </span>
      <button
        onClick={() => handleVote('down')}
        disabled={!user || loading}
        className={`${sizeClasses.button} rounded-lg border border-gray-300 flex items-center justify-center transition-all hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
          currentVote === 'down' ? 'bg-red-100 border-red-300 text-red-600' : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        <ChevronDown className={sizeClasses.icon} />
      </button>
    </div>
  );
};

export default VotingWidget;
