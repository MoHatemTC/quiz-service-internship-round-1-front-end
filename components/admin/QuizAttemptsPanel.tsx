'use client';

import { useEffect, useState } from 'react';
import QuizAttemptsTable from '@/components/admin/QuizAttemptsTable';
import { fetchQuizAttempts, fetchQuizzes } from '@/lib/api';
import { QuizAttemptsResponse } from '@/types/analytics';

type QuizListItem = { id: string; title: string };

export default function QuizAttemptsPanel() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [selectedQuizName, setSelectedQuizName] = useState('');
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      setIsLoadingQuizzes(true);
      try {
        const data = await fetchQuizzes();
        // Expect data as array of quizzes with `id` and `title` fields
        setQuizzes(data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingQuizzes(false);
      }
    };

    loadQuizzes();
  }, []);

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

  // Real-time updates via SSE: refetch when a relevant attempt is submitted
  useEffect(() => {
    const url = (process.env.NEXT_PUBLIC_API_URL || '') + '/analytics/events';
    // If NEXT_PUBLIC_API_URL not set, use relative path
    const source = new EventSource(url.startsWith('http') ? url : '/api/analytics/events');

    source.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg?.type === 'attempt_submitted') {
          const payload = msg.payload;
          // If the event relates to the currently selected quiz, refetch
          const selectedQuiz = quizzes.find((q) => q.title === selectedQuizName);
          if (selectedQuiz && payload?.quizId === selectedQuiz.id) {
            // re-use loader
            setIsLoading(true);
            fetchQuizAttempts(selectedQuizName)
              .then((data) => setQuizAttempts(data))
              .catch((err) => setError(err instanceof Error ? err.message : String(err)))
              .finally(() => setIsLoading(false));
          }
        }
      } catch (err) {
        // ignore parse errors
        console.error('SSE parse error', err);
      }
    };

    source.onerror = (err) => {
      console.error('SSE error', err);
      // do not close; EventSource will retry
    };

    return () => {
      source.close();
    };
  }, [quizzes, selectedQuizName]);

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
          {isLoadingQuizzes ? (
            <option value="">Loading...</option>
          ) : (
            quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.title}>
                {quiz.title}
              </option>
            ))
          )}
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
