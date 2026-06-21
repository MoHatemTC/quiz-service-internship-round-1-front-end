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
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm text-[#A1A1AA]">
          <div className="rounded-lg bg-[#0F0F17] p-4">
            <div className="font-medium text-[#F4F4F5]">Total Attempts</div>
            <div className="mt-2 text-xl">{data.attemptCount}</div>
          </div>
          <div className="rounded-lg bg-[#0F0F17] p-4">
            <div className="font-medium text-[#F4F4F5]">Completions</div>
            <div className="mt-2 text-xl">{data.completionCount}</div>
          </div>
          <div className="rounded-lg bg-[#0F0F17] p-4">
            <div className="font-medium text-[#F4F4F5]">Average Score</div>
            <div className="mt-2 text-xl">{data.averageScore.toFixed(1)}%</div>
          </div>
          <div className="rounded-lg bg-[#0F0F17] p-4">
            <div className="font-medium text-[#F4F4F5]">Status Breakdown</div>
            <div className="mt-2">
              <div>Not started: {data.statusBreakdown.notStarted}</div>
              <div>In progress: {data.statusBreakdown.inProgress}</div>
              <div>Submitted: {data.statusBreakdown.submitted}</div>
            </div>
          </div>
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
                Status
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
            {data.studentScores.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#A1A1AA]">
                  No student score data available.
                </td>
              </tr>
            ) : (
              data.studentScores.map((student) => (
                <tr
                  key={student.studentId}
                  className="border-b border-[#2D2D42] hover:bg-[#171725] transition-colors"
                >
                  <td className="px-6 py-4 text-[#F4F4F5]">{student.studentName}</td>
                  <td className="px-6 py-4 text-[#A1A1AA]">
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-[#27293f] text-[#E5E7EB]">
                      {student.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {student.score === null ? (
                      <span className="text-[#A1A1AA]">—</span>
                    ) : (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#8B5CF6] text-white text-sm font-medium">
                        {student.score}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA]">
                    {student.submittedAt
                      ? new Date(student.submittedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
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
