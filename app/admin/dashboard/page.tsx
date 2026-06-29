import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardFilter from '@/components/admin/dashboard/DashboardFilter';
import DashboardSearch from '@/components/admin/dashboard/DashboardSearch';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import DashboardQuizTable from '@/components/admin/dashboard/DashboardQuizTable';
import { DASHBOARD_STATS } from '@/constants';
import { searchParamsProps } from '@/types';
import { getAdminQuizzes } from '@/lib/api/admin/quizzes';

const VALID_FILTERS = ['all', 'PUBLISHED', 'DRAFT', 'CLOSED', 'ARCHIVED'] as const;
type QuizFilter = (typeof VALID_FILTERS)[number];

function parseFilter(value: unknown): QuizFilter {
  if (typeof value !== 'string') return 'all';

  if (VALID_FILTERS.includes(value as QuizFilter)) {
    return value as QuizFilter;
  }
  return 'all';
}

function parseSearch(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

async function Dashboard({ searchParams }: searchParamsProps) {
  const params = await searchParams;
  const statusFilter = parseFilter(params.status);
  const searchTerm = parseSearch(params.search);
  const quizzesData = await getAdminQuizzes({
    search: searchTerm || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end">
          <div className="flex w-full flex-col gap-3 items-center lg:items-start ">
            <DashboardHeader
              title={'Quiz Management'}
              description={'Manage, analyze, and organize your academic library.'}
            />
            <DashboardSearch />
          </div>
          <DashboardFilter />
        </div>
        <div className="grid-auto-fit place-items-center gap-4">
          {DASHBOARD_STATS.map((s) => (
            <StatsCard key={s.id} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
        <DashboardQuizTable data={quizzesData} />
      </section>
    </main>
  );
}

export default Dashboard;
