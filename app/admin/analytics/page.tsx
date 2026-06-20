import PageHeader from '@/components/common/PageHeader';
import MetricsGrid from '@/components/admin/MetricsGrid';
import QuizAttemptsPanel from '@/components/admin/QuizAttemptsPanel';
import { DashboardSummary } from '@/types/analytics';
import { fetchAnalyticsDashboard } from '@/lib/api';

export default async function AnalyticsPage() {
  const summary: DashboardSummary = await fetchAnalyticsDashboard();

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Manage, analyze, and organize your academic library."
      />

      <MetricsGrid data={summary} />

      <QuizAttemptsPanel />
    </div>
  );
}


