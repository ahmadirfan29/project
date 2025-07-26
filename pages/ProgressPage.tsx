import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { StarIcon, BookOpenIcon, QuestionMarkCircleIcon } from '../components/icons/Icons';

const ProgressPage: React.FC = () => {
  const { profile, stories, qAndAs, points, rewards } = useAppContext();

  const readStories = stories.filter(story => story.isRead);
  const unlockedRewards = rewards.filter(reward => reward.unlocked);

  const stats = [
    {
      label: 'Total Poin',
      value: points,
      icon: StarIcon,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Cerita Dibaca',
      value: readStories.length,
      icon: BookOpenIcon,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Pertanyaan Diajukan',
      value: qAndAs.length,
      icon: QuestionMarkCircleIcon,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Progres Belajar 📊</h1>
        <p className="text-indigo-100">
          Lihat pencapaian dan perkembangan belajar kamu!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-slate-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Profil Pembaca</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">Nama:</span>
            <span className="font-semibold text-slate-800">{profile.name || 'Belum diisi'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Umur:</span>
            <span className="font-semibold text-slate-800">{profile.age} tahun</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Kelas:</span>
            <span className="font-semibold text-slate-800">{profile.classLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Level Membaca:</span>
            <span className="font-semibold text-slate-800">{profile.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Minat:</span>
            <span className="font-semibold text-slate-800">
              {profile.interests.length > 0 ? profile.interests.join(', ') : 'Belum dipilih'}
            </span>
          </div>
        </div>
      </div>

      {/* Rewards */}
      {unlockedRewards.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Hadiah yang Diperoleh</h2>
          <div className="grid grid-cols-2 gap-3">
            {unlockedRewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              >
                <span className="text-2xl">{reward.emoji}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{reward.name}</p>
                  <p className="text-xs text-slate-600 capitalize">{reward.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {(readStories.length > 0 || qAndAs.length > 0) && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-3">
            {/* Recent Stories */}
            {readStories.slice(0, 3).map((story) => (
              <div key={story.id} className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                <BookOpenIcon className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm">{story.title}</p>
                  <p className="text-xs text-slate-600">Cerita dibaca</p>
                </div>
                <StarIcon className="w-4 h-4 text-yellow-500" />
              </div>
            ))}

            {/* Recent Questions */}
            {qAndAs.slice(0, 2).map((qAndA) => (
              <div key={qAndA.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <QuestionMarkCircleIcon className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm line-clamp-1">{qAndA.question}</p>
                  <p className="text-xs text-slate-600">Pertanyaan diajukan</p>
                </div>
                <StarIcon className="w-4 h-4 text-yellow-500" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200">
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Terus Semangat! 🌟</h3>
          <p className="text-slate-600 text-sm">
            Kamu sudah membaca {readStories.length} cerita dan mengajukan {qAndAs.length} pertanyaan. 
            Terus belajar untuk mengumpulkan lebih banyak poin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;