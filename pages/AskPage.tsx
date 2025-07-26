import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { QAndA } from '../types';
import { QuestionMarkCircleIcon, StarIcon } from '../components/icons/Icons';

const AskPage: React.FC = () => {
  const { qAndAs, addQAndA, points } = useAppContext();
  const [question, setQuestion] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert('Tulis pertanyaan dulu ya!');
      return;
    }

    setIsAsking(true);

    try {
      // Simulate AI response (replace with actual AI call)
      const newQAndA: QAndA = {
        id: Date.now().toString(),
        question: question.trim(),
        answer: `Terima kasih sudah bertanya tentang "${question.trim()}". Ini adalah jawaban yang disesuaikan dengan level pemahaman kamu. Pertanyaan yang bagus!`,
        imageUrl: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400',
        timestamp: Date.now()
      };

      addQAndA(newQAndA);
      setQuestion('');
    } catch (error) {
      console.error('Error asking question:', error);
      alert('Terjadi kesalahan. Coba lagi ya!');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Tanya Apa Saja! 🤔</h1>
        <p className="text-green-100">
          Aku siap menjawab pertanyaan kamu dengan cara yang mudah dipahami
        </p>
        <div className="flex items-center mt-4">
          <StarIcon className="w-5 h-5 text-yellow-300 mr-2" />
          <span className="font-semibold">{points} Poin</span>
          <span className="text-green-100 ml-2">• +25 poin setiap bertanya</span>
        </div>
      </div>

      {/* Ask Question Form */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Tulis Pertanyaan</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Contoh: Kenapa langit biru? Bagaimana cara kerja pesawat? Siapa penemu lampu?"
          className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
          rows={4}
        />
        <button
          onClick={handleAskQuestion}
          disabled={isAsking || !question.trim()}
          className={`w-full mt-4 py-3 rounded-lg font-bold text-white transition-all ${
            isAsking || !question.trim()
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <span>
              {isAsking ? 'Sedang Mencari Jawaban...' : 'Tanya Sekarang!'}
            </span>
          </div>
        </button>
      </div>

      {/* Previous Q&As */}
      {qAndAs.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pertanyaan Sebelumnya</h2>
          <div className="space-y-4">
            {qAndAs.map((qAndA) => (
              <div key={qAndA.id} className="border-l-4 border-green-500 pl-4 py-2">
                <div className="mb-2">
                  <h3 className="font-semibold text-slate-800 mb-1">
                    Q: {qAndA.question}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A: {qAndA.answer}
                  </p>
                </div>
                {qAndA.imageUrl && (
                  <img
                    src={qAndA.imageUrl}
                    alt="Ilustrasi jawaban"
                    className="w-full h-32 object-cover rounded-lg mt-2"
                  />
                )}
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(qAndA.timestamp).toLocaleDateString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Getting Started */}
      {qAndAs.length === 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <QuestionMarkCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Belum Ada Pertanyaan
          </h2>
          <p className="text-slate-600">
            Ayo mulai bertanya! Setiap pertanyaan akan memberi kamu 25 poin.
          </p>
        </div>
      )}
    </div>
  );
};

export default AskPage;