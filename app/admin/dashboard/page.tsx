import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFilter from '@/components/dashboard/DashboardFilter';
import StatsCard from '@/components/dashboard/StatsCard';
import DashboardQuizTable from '@/components/dashboard/DashboardQuizTable';
import { DASHBOARD_STATS } from '@/constants';
import { searchParamsProps } from '@/types';

const VALID_FILTERS = ['all', 'PUBLISHED', 'DRAFT'] as const;
type QuizFilter = (typeof VALID_FILTERS)[number];

function parseFilter(value: unknown): QuizFilter {
  if (typeof value !== 'string') return 'all';

  if (VALID_FILTERS.includes(value as QuizFilter)) {
    return value as QuizFilter;
  }
  return 'all';
}

async function Dashboard({ searchParams }: searchParamsProps) {
  const statusFilter = parseFilter((await searchParams).status);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <div className="flex flex-col gap-4 items-center lg:flex-row lg:items-center">
          <DashboardHeader
            title={'Quiz Management'}
            description={'Manage, analyze, and organize your academic library.'}
          />
          <DashboardFilter />
        </div>
        <div className="grid-auto-fit place-items-center gap-4">
          {DASHBOARD_STATS.map((s) => (
            <StatsCard key={s.id} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
        <DashboardQuizTable filter={statusFilter} />
      </section>
    </main>
  );
}

export default Dashboard;
