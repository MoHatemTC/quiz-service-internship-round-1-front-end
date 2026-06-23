'use client';

import { useState } from 'react';

const TABS = ['Academic', 'In Progress', 'Completed'] as const;
type Tab = (typeof TABS)[number];

export default function CategoryTabs() {
  const [active, setActive] = useState<Tab>('Academic');

  return (
    <div
      role="tablist"
      aria-label="Quiz filters"
      className="flex items-center gap-6 border-b border-divider"
    >
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(tab)}
            className={`relative -mb-px py-3 text-small font-semibold transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500 ${
              isActive
                ? 'text-accent-600'
                : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            {tab}
            {isActive && (
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent-500"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
