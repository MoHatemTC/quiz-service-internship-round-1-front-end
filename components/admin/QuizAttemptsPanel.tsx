'use client';

import { useEffect, useState } from 'react';
import QuizAttemptsTable from '@/components/admin/QuizAttemptsTable';
import { fetchQuizAttempts } from '@/lib/api';
import { QuizAttemptsResponse } from '@/types/analytics';

const quizOptions = [
  'JavaScript Basics',
  'React Fundamentals',
  'TypeScript Advanced',
  'Web Performance',
];

export default function QuizAttemptsPanel() {
  const [selectedQuizName, setSelectedQuizName] = useState('');
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedQuizName) {
      setQuizAttempts(null);
      setError(null);
      return;
    }

    const loadQuizAttempts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuizAttempts(selectedQuizName);
        setQuizAttempts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz attempts');
        setQuizAttempts(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizAttempts();
  }, [selectedQuizName]);

  return (
    <div className="bg-[#1F1F33] border border-[#2D2D42] rounded-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-[#F4F4F5] mb-4">Filter by Quiz</h2>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={selectedQuizName}
          onChange={(e) => setSelectedQuizName(e.target.value)}
          className="px-4 py-2 bg-[#0F0F17] border border-[#2D2D42] rounded text-[#F4F4F5] focus:outline-none focus:border-[#8B5CF6]"
        >
          <option value="">Select a quiz</option>
          {quizOptions.map((quiz) => (
            <option key={quiz} value={quiz}>
              {quiz}
            </option>
          ))}
        </select>

        {selectedQuizName && (
          <div className="text-sm text-[#A1A1AA]">
            Showing attempts for <strong>{selectedQuizName}</strong>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {quizAttempts ? (
        <QuizAttemptsTable data={quizAttempts} isLoading={isLoading} />
      ) : selectedQuizName ? (
        <div className="text-[#A1A1AA]">Loading quiz attempts...</div>
      ) : (
        <div className="text-[#A1A1AA]">Select a quiz to view completion stats and attempt details.</div>
      )}
    </div>
  );
}
