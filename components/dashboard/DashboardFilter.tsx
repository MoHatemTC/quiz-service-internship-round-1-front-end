'use client';

import { QuizFilterOptions } from '@/types/quiz/admin';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const FILTERS: QuizFilterOptions[] = [
  { key: 'all', label: 'All' },
  { key: 'PUBLISHED', label: 'Published' },
  { key: 'DRAFT', label: 'Drafts' },
];

function DashboardFilter() {
  const [activeFilter, setActiveFilter] = useState<QuizFilterOptions['key']>('all');
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (value: QuizFilterOptions['key']) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('status');
    } else {
      params.set('status', value);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full lg:self-end max-w-125">
      <div
        className="inline-flex w-full max-w-full gap-1 rounded-2xl border border-border bg-surface/90 p-1"
        role="tablist"
        aria-label="Quiz status filters"
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;

          return (
            <button
              key={filter.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                'flex-1 rounded-xl px-4 py-3 text-small font-medium transition-all duration-150 capitalize',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60 focus-visible:ring-offset-0',
                isActive
                  ? 'bg-primary-800 text-white'
                  : 'text-foreground-secondary hover:bg-primary-50 hover:text-primary-800',
              ].join(' ')}
              onClick={() => {
                setActiveFilter(filter.key);
                setFilter(filter.key);
              }}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardFilter;
