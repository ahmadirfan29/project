import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { INTERESTS, READING_LEVELS } from '../constants';
import { Profile, ReadingLevel } from '../types';
import { UserCircleIcon, StarIcon } from '../components/icons/Icons';

const ProfilePage: React.FC = () => {
  const { profile, setProfile, points, rewards } = useAppContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  const unlockedRewards = rewards.filter(reward => reward.unlocked);
  const availableRewards = rewards.filter(reward => !reward.unlocked);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const toggleInterest = (interestName: string) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interestName)
        ? prev.interests.filter(i => i !== interestName)
        : [...prev.interests, interestName]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <UserCircleIcon className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold">
              {profile.name || 'Profil Saya'}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <StarIcon className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">{points} Poin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Informasi Profil</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Simpan
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-slate-400 text-white rounded-lg font-semibold hover:bg-slate-500 transition-colors"
              >
                Batal
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none"
                placeholder="Masukkan nama kamu"
              />
            ) : (
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800">
                {profile.name || 'Belum diisi'}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Umur
            </label>
            {isEditing ? (
              <input
                type="number"
                min="6"
                max="13"
                value={editedProfile.age}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 6 }))}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none"
              />
            ) : (
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800">
                {profile.age} tahun
              </p>
            )}
          </div>

          {/* Class Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Kelas
            </label>
            {isEditing ? (
              <input
                type="number"
                min="1"
                max="6"
                value={editedProfile.classLevel}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, classLevel: parseInt(e.target.value) || 1 }))}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none"
              />
            ) : (
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800">
                Kelas {profile.classLevel}
              </p>
            )}
          </div>

          {/* Reading Level */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Level Membaca
            </label>
            {isEditing ? (
              <select
                value={editedProfile.level}
                onChange={(e) => setEditedProfile(prev => ({ ...prev, level: e.target.value as ReadingLevel }))}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none"
              >
                {READING_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            ) : (
              <p className="p-3 bg-slate-50 rounded-lg text-slate-800">
                {profile.level}
              </p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Minat
            </label>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS.map((interest) => {
                  const IconComponent = interest.icon;
                  const isSelected = editedProfile.interests.includes(interest.name);
                  return (
                    <button
                      key={interest.name}
                      onClick={() => toggleInterest(interest.name)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-slate-200 hover:border-cyan-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4 text-cyan-600" />
                        <span className="text-sm font-medium text-slate-800">
                          {interest.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-lg">
                {profile.interests.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600">Belum dipilih</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Koleksi Hadiah</h2>
        
        {unlockedRewards.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-2">Hadiah yang Dimiliki</h3>
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

        {availableRewards.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-2">Hadiah Tersedia</h3>
            <div className="grid grid-cols-1 gap-3">
              {availableRewards.slice(0, 3).map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl opacity-50">{reward.emoji}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{reward.name}</p>
                      <p className="text-xs text-slate-600 capitalize">{reward.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">{reward.cost} poin</p>
                    <p className="text-xs text-slate-600">
                      {points >= reward.cost ? 'Bisa dibeli!' : `Kurang ${reward.cost - points}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;