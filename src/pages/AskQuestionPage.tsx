import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuestions } from '../hooks/useQuestions';
import { useAuth } from '../hooks/useAuth';
import RichTextEditor from '../components/Common/RichTextEditor';
import TagInput from '../components/Common/TagInput';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const AskQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createQuestion } = useQuestions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[]
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || formData.tags.length === 0) {
      setError('Please fill in all fields and add at least one tag');
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error } = await createQuestion(
      formData.title.trim(),
      formData.content.trim(),
      formData.tags
    );

    if (error) {
      setError(error);
    } else if (data) {
      navigate(`/question/${data.id}`);
    }

    setLoading(false);
  };

  const isValid = formData.title.trim() && formData.content.trim() && formData.tags.length > 0;

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to questions</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ask a Question</h1>
              <p className="text-gray-600">Share your question with the community</p>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-3">Tips for a great question:</h2>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Be specific and clear in your title</li>
            <li>• Provide context and details in the description</li>
            <li>• Include relevant code examples if applicable</li>
            <li>• Add appropriate tags to help others find your question</li>
            <li>• Search for similar questions before posting</li>
          </ul>
        </div>

        {/* Question Form */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Question Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What's your programming question? Be specific."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              maxLength={200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Details *
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Provide all the details needed to understand and answer your question. Include any relevant code, error messages, or context.
            </p>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Describe your problem in detail..."
              height="400px"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags *
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Add up to 5 tags to help categorize your question. Use relevant technologies, frameworks, or topics.
            </p>
            <TagInput
              tags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="e.g., react, javascript, css"
              maxTags={5}
            />
          </div>

          {/* Submit */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>By posting your question, you agree to our community guidelines.</p>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Posting...</span>
                    </>
                  ) : (
                    <span>Post Question</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionPage;