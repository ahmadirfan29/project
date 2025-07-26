import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { BookOpenIcon, StarIcon } from '../components/icons/Icons';

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { stories, markStoryAsRead } = useAppContext();
  const [story, setStory] = useState(stories.find(s => s.id === id));

  useEffect(() => {
    const foundStory = stories.find(s => s.id === id);
    if (!foundStory) {
      navigate('/');
      return;
    }
    setStory(foundStory);
  }, [id, stories, navigate]);

  const handleMarkAsRead = () => {
    if (story && !story.isRead) {
      markStoryAsRead(story.id);
    }
  };

  if (!story) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <BookOpenIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Cerita tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Story Header */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {story.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>{story.interest}</span>
              <span>•</span>
              <span>{story.level}</span>
              {story.isRead && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>Sudah dibaca</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Story Image */}
        {story.imageUrl && (
          <div className="mb-6">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Story Content */}
        <div className="prose prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
            {story.content}
          </div>
        </div>

        {/* Mark as Read Button */}
        {!story.isRead && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={handleMarkAsRead}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <StarIcon className="w-5 h-5" />
                <span>Tandai Sudah Dibaca (+50 Poin)</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
        >
          Kembali ke Beranda
        </button>
        <button
          onClick={() => navigate('/generate-story')}
          className="flex-1 bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
        >
          Buat Cerita Lain
        </button>
      </div>
    </div>
  );
};

export default StoryPage;