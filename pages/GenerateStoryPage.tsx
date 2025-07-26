import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { INTERESTS } from '../constants';
import { Story, ReadingLevel } from '../types';
import { SparklesIcon } from '../components/icons/Icons';

const GenerateStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, addStory } = useAppContext();
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateStory = async () => {
    if (!selectedInterest && !customTopic.trim()) {
      alert('Pilih minat atau masukkan topik cerita!');
      return;
    }

    setIsGenerating(true);

    try {
      const topic = customTopic.trim() || selectedInterest;
      
      // Simulate story generation (replace with actual AI call)
      const newStory: Story = {
        id: Date.now().toString(),
        title: `Petualangan ${topic}`,
        content: `Ini adalah cerita tentang ${topic}. Cerita ini dibuat khusus untuk level ${profile.level} dan disesuaikan dengan minat kamu. Mari kita mulai petualangan yang seru!`,
        imageUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
        level: profile.level,
        interest: topic,
        isRead: false,
        timestamp: Date.now()
      };

      addStory(newStory);
      navigate(`/story/${newStory.id}`);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Terjadi kesalahan saat membuat cerita. Coba lagi ya!');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Buat Cerita Baru ✨</h1>
        <p className="text-purple-100">
          Pilih minat atau tulis topik yang kamu suka!
        </p>
      </div>

      {/* Interest Selection */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Pilih Minat</h2>
        <div className="grid grid-cols-2 gap-3">
          {INTERESTS.map((interest) => {
            const IconComponent = interest.icon;
            return (
              <button
                key={interest.name}
                onClick={() => {
                  setSelectedInterest(interest.name);
                  setCustomTopic('');
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedInterest === interest.name
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-slate-200 hover:border-cyan-300'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className="w-6 h-6 text-cyan-600" />
                  <span className="text-sm font-medium text-slate-800">
                    {interest.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Topic */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Atau Tulis Topik Sendiri</h2>
        <textarea
          value={customTopic}
          onChange={(e) => {
            setCustomTopic(e.target.value);
            if (e.target.value.trim()) {
              setSelectedInterest('');
            }
          }}
          placeholder="Contoh: Petualangan di hutan ajaib, Robot yang baik hati..."
          className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-cyan-500 focus:outline-none resize-none"
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateStory}
        disabled={isGenerating || (!selectedInterest && !customTopic.trim())}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
          isGenerating || (!selectedInterest && !customTopic.trim())
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <SparklesIcon className="w-5 h-5" />
          <span>
            {isGenerating ? 'Sedang Membuat Cerita...' : 'Buat Cerita Sekarang!'}
          </span>
        </div>
      </button>

      {/* Story Level Info */}
      <div className="bg-slate-100 rounded-xl p-4">
        <p className="text-sm text-slate-600 text-center">
          Cerita akan dibuat sesuai level membaca kamu: <strong>{profile.level}</strong>
        </p>
      </div>
    </div>
  );
};

export default GenerateStoryPage;