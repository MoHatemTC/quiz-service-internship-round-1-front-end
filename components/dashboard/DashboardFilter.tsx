'use client';

import { FilterOption } from '@/types';
import { useState } from 'react';

const FILTERS: FilterOption[] = [
  { key: 'all', label: 'All' },
  { key: 'PUBLISHED', label: 'Published' },
  { key: 'DRAFT', label: 'Drafts' },
];

function DashboardFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterOption['key']>('all');

  return (
    <div className="w-full lg:self-end max-w-125">
      <div
        className="inline-flex gap-1 w-full max-w-full rounded-2xl border border-border bg-surface/90 p-1"
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
                  ? 'bg-primary-800 text-primary-100'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border',
              ].join(' ')}
              onClick={() => setActiveFilter(filter.key)}
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
