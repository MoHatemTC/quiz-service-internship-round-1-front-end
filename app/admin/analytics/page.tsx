'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import MetricsGrid from '@/components/admin/MetricsGrid';
import QuizAttemptsTable from '@/components/admin/QuizAttemptsTable';
import { fetchAnalyticsDashboard, fetchQuizAttempts } from '@/lib/api';
import { DashboardSummary, QuizAttemptsResponse } from '@/types/analytics';

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptsResponse | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuizName, setSelectedQuizName] = useState<string>('');

  // Fetch dashboard summary on mount
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        console.log("hellllllllo");
        setIsLoadingSummary(true);
        const data = await fetchAnalyticsDashboard();
        console.log("helllo");
        console.log(data);
        setSummary(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
        console.error(err);
      } finally {
        setIsLoadingSummary(false);
      }
    };

    loadDashboard();
  }, []);

  // Fetch quiz attempts when selected quiz changes
  useEffect(() => {
    const loadQuizAttempts = async () => {
      if (!selectedQuizName) return;
      try {
        setIsLoadingAttempts(true);
        const data = await fetchQuizAttempts(selectedQuizName);
        console.log(data);
        setQuizAttempts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz attempts');
        console.error(err);
      } finally {
        setIsLoadingAttempts(false);
      }
    };

    loadQuizAttempts();
  }, [selectedQuizName]);

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Manage, analyze, and organize your academic library."
      />

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {summary && (
        <>
          <MetricsGrid data={summary} isLoading={isLoadingSummary} />

          <div className="bg-[#1F1F33] border border-[#2D2D42] rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-4">
              Filter by Quiz
            </h2>
            <div className="flex gap-2">
              <select
                value={selectedQuizName}
                onChange={(e) => setSelectedQuizName(e.target.value)}
                className="px-4 py-2 bg-[#0F0F17] border border-[#2D2D42] rounded text-[#F4F4F5] focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="">Select a quiz</option>
                <option value="JavaScript Basics">JavaScript Basics</option>
                <option value="React Fundamentals">React Fundamentals</option>
                <option value="TypeScript Advanced">TypeScript Advanced</option>
                <option value="Web Performance">Web Performance</option>
              </select>
            </div>
          </div>

          {quizAttempts && (
            <QuizAttemptsTable
              data={quizAttempts}
              isLoading={isLoadingAttempts}
            />
          )}
        </>
      )}
    </div>
  );
}


