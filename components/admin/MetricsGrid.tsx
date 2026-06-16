'use client';

import { DashboardSummary } from '@/types/analytics';
import MetricCard from '@/components/common/MetricCard';

interface MetricsGridProps {
  data: DashboardSummary;
  isLoading?: boolean;
}

export default function MetricsGrid({ data, isLoading }: MetricsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#1F1F33] rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-[#2D2D42] rounded w-1/2 mb-4" />
            <div className="h-8 bg-[#2D2D42] rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <MetricCard
        label="Total Quizzes"
        value={data.totalQuizzes}
        icon="📋"
      />
      <MetricCard
        label="Total Students"
        value={data.totalStudents}
        icon="👥"
      />
      <MetricCard
        label="Total Attempts"
        value={data.totalAttempts}
        icon="📊"
      />
      <MetricCard
        label="Average Score"
        value={`${data.averageScore}%`}
        icon="⭐"
      />
    </div>
  );
}
