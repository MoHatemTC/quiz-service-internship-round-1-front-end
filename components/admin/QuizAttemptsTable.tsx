'use client';

import { QuizAttemptsResponse } from '@/types/analytics';

interface QuizAttemptsTableProps {
  data: QuizAttemptsResponse;
  isLoading?: boolean;
}

export default function QuizAttemptsTable({ data, isLoading }: QuizAttemptsTableProps) {
  if (isLoading) {
    return (
      <div className="bg-[#1F1F33] border border-[#2D2D42] rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-[#2D2D42] rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1F1F33] border border-[#2D2D42] rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2D2D42]">
        <h3 className="text-lg font-semibold text-[#F4F4F5]">{data.quizTitle}</h3>
        <div className="mt-2 flex flex-wrap gap-3 text-sm text-[#A1A1AA]">
          <span>{data.attemptCount} submitted attempts</span>
          
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0F0F17] border-b border-[#2D2D42]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {data.attempts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-[#A1A1AA]">
                  No attempts yet
                </td>
              </tr>
            ) : (
              data.attempts.map((attempt) => (
                <tr
                  key={attempt.attemptId}
                  className="border-b border-[#2D2D42] hover:bg-[#171725] transition-colors"
                >
                  <td className="px-6 py-4 text-[#F4F4F5]">{attempt.studentName}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#8B5CF6] text-white text-sm font-medium">
                      {attempt.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]">
                    {new Date(attempt.submittedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
