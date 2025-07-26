import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { SparklesIcon, BookOpenIcon, StarIcon } from '../components/icons/Icons';

const HomePage: React.FC = () => {
  const { profile, stories, points } = useAppContext();

  const recentStories = stories.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Selamat datang, {profile.name || 'Teman'}! 👋
        </h1>
        <p className="text-cyan-100">
          Mari belajar dan bersenang-senang dengan cerita!
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">{points} Poin</span>
          </div>
          <div className="text-cyan-100">
            Level: {profile.level}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/generate-story"
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-cyan-200"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <SparklesIcon className="w-8 h-8 text-cyan-600" />
            <span className="font-bold text-slate-800">Buat Cerita</span>
            <span className="text-xs text-slate-600">Cerita baru untukmu</span>
          </div>
        </Link>

        <Link
          to="/ask"
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-cyan-200"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <BookOpenIcon className="w-8 h-8 text-green-600" />
            <span className="font-bold text-slate-800">Tanya Apa Saja</span>
            <span className="text-xs text-slate-600">Aku siap menjawab</span>
          </div>
        </Link>
      </div>

      {/* Recent Stories */}
      {recentStories.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Cerita Terbaru</h2>
          <div className="space-y-3">
            {recentStories.map((story) => (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="block p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 line-clamp-1">
                      {story.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {story.interest} • {story.level}
                    </p>
                  </div>
                  {story.isRead && (
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Getting Started */}
      {stories.length === 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <BookOpenIcon className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Mulai Petualangan Membaca!
          </h2>
          <p className="text-slate-600 mb-4">
            Belum ada cerita? Ayo buat cerita pertamamu sekarang!
          </p>
          <Link
            to="/generate-story"
            className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>Buat Cerita Sekarang</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;